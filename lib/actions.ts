"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import internal from "stream";

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

export async function fetchUserById() {
  const supabase = supabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }
  //return user;
  // console.log(user?.id);

  let { data: profiles, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (profileError) {
    console.error(
      "Errore durante il recupero dei dati del profilo:",
      profileError
    );
    // Puoi gestire l'errore in modo appropriato
    return null; // O qualsiasi altro valore di default
  }

  const combined = { email: user.email, ...profiles };

  return combined;
}

export const updateUserById = async (formData: FormData) => {
  const supabase = supabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }
  // console.log(formData);

  const dataToUpdate = {
    id: user?.id,
    username: formData.get("username") as string,
    full_name: formData.get("full_name") as string,
    nick_in_game: formData.get("nick_in_game") as string,
    twitch_link: formData.get("twitch_link") as string,
    x_link: formData.get("x_link") as string,
  };

  //   console.log(dataToUpdate);

  const { id, username, full_name, nick_in_game, twitch_link, x_link } =
    dataToUpdate;
  const updated_at = new Date().toISOString();
  console.log(updated_at);

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
    .eq("id", user?.id)
    .select();

  if (data) console.log(data);
  if (updateError) console.log(updateError);
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

  console.log(formData);

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
    console.log(errorMap);
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
    console.log(tournamentError);
    console.log(tournament);

    revalidatePath("/home");
    redirect("/home");
  }
}

// Creazione team
const teamSchema = z.string().min(3);
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
        "Please enter a valid team name, at least it must contain 3 character(s)",
    };
  } else {
    console.log(tournament_id);

    const { data, error } = await supabase
      .from("team")
      .insert([{ name, tournament_id }])
      .select();

    // if (error) {
    //   console.log(error);
    // }
    // if (data) {
    //   console.log(data);
    // }
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
  // console.log(user_id);
  // console.log(Number(team_id));
  // console.log(tournament_id);
  if (team_id === 0) {
    return {
      success: false,
      message: "Please select a team",
    };
  }

  const { data, error } = await supabase
    .from("team_user")
    .insert([{ team_id, user_id, tournament_id }])
    .select();
  console.log(error);
  if (!error) {
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
