"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

function supabaseClient() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}

export async function verifySession() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
}

const emailSchema = z.string().email();
export async function updateEmail(prevState: any, formData: FormData) {
  const supabase = supabaseClient();

  const result = emailSchema.safeParse(formData.get("email") as string);
  if (!result.success) {
    return {
      success: false,
      message: "Please insert a valid email",
    };
  } else {
    console.log(result.data);

    const { data, error } = await supabase.auth.updateUser({
      email: result.data,
    });
    if (error) {
      console.log(error);
      return {
        success: false,
        message: "This email address already exists",
      };
    }
    if (data) {
      console.log(data);
    }

    return {
      success: true,
      message: "Email updated successfully",
    };
  }
}

const profileSchema = z.object({
  // email: z.string().email(),
  username: z.string().min(3, {
    message: "Please insert a valid username, at least 3 character(s)",
  }),
  full_name: z.string().min(3, {
    message: "Please insert a valid full name, at least 3 character(s)",
  }),
  nick_in_game: z.string().min(3, {
    message: "Please insert a valid nick in game, at least 3 character(s)",
  }),
  twitch_link: z.string().nullable(),
  x_link: z.string().nullable(),
});
export const updateUserById = async (prevState: any, formData: FormData) => {
  const supabase = supabaseClient();

  const result = profileSchema.safeParse({
    // email: formData.get("email") as string,
    username: formData.get("username") as string,
    full_name: formData.get("full_name") as string,
    nick_in_game: formData.get("nick_in_game") as string,
    twitch_link: formData.get("twitch_link") as string,
    x_link: formData.get("x_link") as string,
  });

  if (!result.success) {
    const zodError = result.error as z.ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return errorMap;
  } else {
    const { username, full_name, nick_in_game, twitch_link, x_link } =
      result.data;
    const updated_at = new Date().toISOString();

    const id = formData.get("user_id");

    try {
      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({
          updated_at,
          username,
          full_name,
          nick_in_game,
          twitch_link,
          x_link,
        })
        .eq("id", id)
        .select();
      if (data) return { success: ["Profile updated successfully"] };
      if (updateError) {
        if (updateError.code === "23505") {
          return {
            fail: ["Username already taken, please choose another one"],
          };
        }
        // console.log(updateError.code);
        return {
          fail: [
            "Something went wrong. Please try again or contact support if the problem persists.",
          ],
        };
      }
    } catch (error) {
      return {
        fail: [
          "Something went wrong. Please try again or contact support if the problem persists.",
        ],
      };
    }
  }
};

// Sezione per la gestione dei tornei
const statusEnum = z.enum(["upcoming", "in_progress", "done"]);
const tournamentSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  rules: z.string().min(3),
  platform: z.string(),
  start_time: z.string().min(3, { message: "Please insert a valid date" }),
  map: z.string(),
  max_players: z.coerce.number().min(1),
  status: statusEnum,
  rounds: z.coerce.number().min(1),
  game_mode: z.string(),
});
export async function createTournament(prevState: any, formData: FormData) {
  const supabase = supabaseClient();

  const result = tournamentSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    rules: formData.get("rules") as string,
    platform: formData.get("platform") as string,
    start_time: formData.get("start_time") as string,
    map: formData.get("map") as string,
    max_players: formData.get("max_players") as unknown as number,
    status: formData.get("status") as string,
    rounds: formData.get("rounds") as unknown as number,
    game_mode: formData.get("game_mode") as string,
  });

  if (!result.success) {
    const zodError = result.error as z.ZodError;
    const errorMap = zodError.flatten().fieldErrors;
    return {
      message: "Please check if all fields are filled correctly",
      errors: {
        name: errorMap["name"],
        description: errorMap["description"],
        rules: errorMap["rules"],
        start_time: errorMap["start_time"],
        max_players: errorMap["max_players"],
        rounds: errorMap["rounds"],
      },
    };
  } else {
    const {
      name,
      description,
      rules,
      platform,
      start_time,
      map,
      max_players,
      status,
      rounds,
      game_mode,
    } = result.data;

    const { data: tournament, error: tournamentError } = await supabase
      .from("tournament")
      .insert([
        {
          name,
          description,
          rules,
          platform,
          start_time,
          map,
          max_players,
          status,
          rounds,
          game_mode,
        },
      ])
      .select();
    // console.log(tournamentError);
    // console.log(tournament);

    revalidatePath("/");
    redirect("/");
  }
}

// Creazione team
const teamSchema = z.string().min(1);
export async function createTeam(prevState: any, formData: FormData) {
  const supabase = supabaseClient();
  const name = formData.get("team_name") as string;
  const tournament_id = formData.get("tournament_id");
  const result = teamSchema.safeParse(name);
  // console.log(result);

  if (!result.success) {
    return {
      success: false,
      message:
        "Please enter a valid team name, at least it must contain 1 character(s)",
    };
  } else {
    const { data, error } = await supabase
      .from("team")
      .insert([{ name, tournament_id }])
      .select();

    return {
      success: true,
      message:
        "Team created successfully. Now you can join the newly created team by pressing the join team button.",
    };
  }
}

// creazione team user
export async function createTeamUser(prevState: any, formData: FormData) {
  const supabase = supabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  const team_id = Number(formData.get("team_id"));
  const tournament_id = formData.get("tournament_id") as string;

  if (team_id === 0) {
    return {
      success: false,
      message: "Please select a team",
    };
  }

  let { data: team_user, error: notAllow } = await supabase
    .from("team_user")
    .select("user_id, tournament_id")
    .eq("user_id", user_id)
    .eq("tournament_id", tournament_id)
    .single();

  if (!notAllow) {
    return {
      success: false,
      message: "You are already a member of a team in this tournament",
    };
  } else {
    const { data, error } = await supabase
      .from("team_user")
      .insert([{ team_id, user_id, tournament_id }])
      .select();
    if (!error) {
      revalidatePath(`/tournament?id=${tournament_id}&tab=score`);
      return {
        success: true,
        message: "You have successfully joined the team",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong, please try again later",
      };
    }
  }

  // const { data, error } = await supabase
  //   .from("team_user")
  //   .insert([{ team_id, user_id, tournament_id }])
  //   .select();
  // if (!error) {
  //   return {
  //     success: true,
  //     message: "You have successfully joined the team",
  //   };
  // } else {
  //   return {
  //     success: false,
  //     message: "Something went wrong, please try again later",
  //   };
  // }
}

// creazione score team
// const scoreSchema = z.string().min(3);
export async function createScore(prevState: any, formData: FormData) {
  const supabase = supabaseClient();

  function calculateScore(eliminations: number, placement: number) {
    if (placement <= 0) {
      return 0;
    }
    const placementMultiplier = 2.0; // Puoi regolare questo valore per bilanciare il peso tra posizionamento e eliminazioni. Più alto è il valore, più le eliminazioni contano di meno
    const placementScore = 100 - placement * 10 * placementMultiplier;
    const eliminationsScore = eliminations * 10;

    return placementScore + eliminationsScore;
  }

  const user_id = formData.get("user_id");
  const tournament_id = formData.get("tournament_id");

  let { data: team_user, error } = await supabase
    .from("team_user")
    .select("team_id")
    .eq("user_id", user_id)
    .eq("tournament_id", tournament_id)
    .single();

  const { data: existingData, error: existingError } = await supabase
    .from("team")
    .select("score")
    .eq("id", team_user?.team_id);
  // Estrai l'array esistente o inizializza un nuovo array se non esiste

  const numRounds = Number(formData.get("rounds"));

  let existingArray =
    existingData && existingData.length ? existingData[0].score : [];

  //controlla se l'array esistente è vuoto, se lo è, lo popola
  if (!existingArray || existingArray.length === 0) {
    existingArray = [];
    for (let i = 0; i < numRounds; i++) {
      existingArray.push({ eliminations: 0, placement: 0, total: 0 });
    }
  }

  // Aggiungi il nuovo oggetto all'array
  let newArray: {}[] = [];
  let eliminations = 0,
    placement = 0,
    total = 0;
  let scoreObject = { eliminations, placement, total };
  for (let i = 0; i < numRounds; i++) {
    if (
      Number(formData.get(`placement_${i}`)) > 0 &&
      Number(formData.get(`eliminations_${i}`)) > 0
    ) {
      eliminations = Number(formData.get(`eliminations_${i}`));
      placement = Number(formData.get(`placement_${i}`));
      total = calculateScore(eliminations, placement);
    }
    if (
      Number(formData.get(`placement_${i}`)) === 0 &&
      Number(formData.get(`eliminations_${i}`)) === 0
    ) {
      eliminations = existingArray[i].eliminations;
      placement = existingArray[i].placement;
      total = existingArray[i].total;
    }
    if (
      Number(formData.get(`placement_${i}`)) > 0 &&
      Number(formData.get(`eliminations_${i}`)) === 0
    ) {
      eliminations = existingArray[i].eliminations;
      placement = Number(formData.get(`placement_${i}`));
      total = calculateScore(eliminations, placement);
    }
    if (
      Number(formData.get(`placement_${i}`)) === 0 &&
      Number(formData.get(`eliminations_${i}`)) > 0
    ) {
      eliminations = Number(formData.get(`eliminations_${i}`));
      placement = existingArray[i].placement;
      total = calculateScore(eliminations, placement);
    }
    scoreObject = { eliminations, placement, total };
    newArray.push(scoreObject);

    // questo controlla solo se entrambi i campi sono maggiore o uguale a 0
    // if (Number(formData.get(`placement_${i}`)) > 0) {
    //   eliminations = Number(formData.get(`eliminations_${i}`));
    //   placement = Number(formData.get(`placement_${i}`));
    //   total = calculateScore(eliminations, placement);
    // } else if (Number(formData.get(`placement_${i}`)) === 0) {
    //   eliminations = existingArray[i].eliminations;
    //   placement = existingArray[i].placement;
    //   total = existingArray[i].total;
    // }
    // const newArray = [...existingArray, scoreObject];
  }
  // const newNewArray = [...existingArray, newArray];
  try {
    const { data, error: errorUpdate } = await supabase
      .from("team")
      .update({ score: newArray })
      .eq("id", team_user?.team_id)
      .select();

    if (data) {
      revalidatePath(`/tournament/id=${tournament_id}&tab=score`);
      return { success: true, message: "Score updated successfully." };
    }
    if (errorUpdate) {
      console.log(errorUpdate);
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, please try again later.",
    };
  }
  // redirect(`/tournament?id=${tournament_id}&tab=score`);
}

export async function fetchRules(tournament_id: string) {
  const supabase = supabaseClient();

  let { data: rules, error: noRules } = await supabase
    .from("tournament")
    .select("rules")
    .eq("idclient", tournament_id)
    .single();

  return rules;
}
