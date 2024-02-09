"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function supabaseClient() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}

export async function getSession() {
  const supabase = supabaseClient();
  const { data } = await supabase.auth.getSession();
  return data;
}
export async function getUser() {
  const supabase = supabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
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

export async function fetchTournaments() {
  noStore();
  const supabase = supabaseClient();

  let { data: tournament, error } = await supabase
    .from("tournament")
    .select("*");

  //   if (tournament) console.log(tournament);
  //   if (error) console.log(error);

  return tournament;
}

export async function fetchTournamentById(id: string) {
  noStore();
  const supabase = supabaseClient();

  try {
    let { data: tournament, error } = await supabase
      .from("tournament")
      .select("*")
      .eq("idclient", id)
      .single();
    // console.log(tournament);

    return tournament;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTeamsById(tournament_id: string) {
  noStore();
  const supabase = supabaseClient();

  try {
    let { data: teams, error } = await supabase
      .from("team")
      .select(`name, id, team_user(team_id, user_id)`)
      .eq("tournament_id", tournament_id);

    let { data: game_mode, error: game_mode_error } = await supabase
      .from("tournament")
      .select("game_mode")
      .eq("idclient", tournament_id);

    // let numPlayersInTeam = ;

    // console.log(teams![2].team_user);

    return {teams, game_mode};
  } catch (error) {
    console.log(error);
  }
}

export async function fetchScoresById(tournament_id: string, user_id: string) {
  noStore();
  const supabase = supabaseClient();

  let { data: team_user, error } = await supabase
    .from("team_user")
    .select("team_id")
    .eq("user_id", user_id)
    .eq("tournament_id", tournament_id)
    .single();

  if (team_user === null || error) {
    return {
      error_team_user:
        "You cannot see this section because you are not participating in the tournament.",
    };
  }

  try {
    let { data: scores, error } = await supabase
      .from("team")
      .select("score")
      .eq("tournament_id", tournament_id)
      .eq("id", team_user?.team_id)
      .single();

    if (!scores?.score) {
      return { error_score_null: "There are no scores entered yet." };
    } else {
      const scoreArray = scores!.score;
      return scoreArray;
    }
    // console.log("scores", scores.score);

    // Verifica che scores contenga dati
    // if (scores && scores.length > 0) {
    //   // Estrai l'array di score dall'oggetto

    //   // Verifica che scoreArray sia un array valido
    //   if (Array.isArray(scoreArray)) {
    //     // Ora puoi iterare su scoreArray per recuperare i valori di ciascun oggetto
    //     scoreArray.forEach((scoreObject) => {
    //       // Recupera le proprietà dell'oggetto JSON e fai ciò che desideri con esse
    //       // const elimination = scoreObject.elimination;
    //       // const placement = scoreObject.placement;
    //       // console.log(scoreObject.eliminations, scoreObject.placement, scoreObject.total);

    //       // Fai qualcosa con elimination e placement...
    //     });
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLeaderboard(id: string) {
  // noStore();
  const supabase = supabaseClient();

  let { data: leaderboard, error } = await supabase
    .from("team_user")
    .select(
      `
      user_id,
      team_id,
      profiles (full_name),
      team (name, score)
    `
    )
    .eq("tournament_id", id);

  if (error) {
    console.log(error);
  }

  //? gestire l'eccezione nel caso in cui non ci siano dati, quindi team inseriti, partecipanti e score. in teoria fatto. fare ulteriori check.

  // Raggruppa i dati per team
  const groupedData = leaderboard!.reduce((acc: any, curr: any) => {
    const { team_id, profiles, team } = curr;
    if (!acc[team_id]) {
      acc[team_id] = {
        team_id,
        team_name: team.name,
        profiles: [],
        score: team.score,
        total_score: team.score.reduce(
          (acc: number, s: any) => acc + s.total,
          0
        ),
      };
    }
    acc[team_id].profiles.push(profiles);
    return acc;
  }, {});

  // Converti i dati raggruppati in un array
  const groupedArray = Object.values(groupedData) as any[];
  // Ordina l'array in base al total_score in ordine decrescente
  groupedArray.sort((a, b) => b.total_score - a.total_score);

  return groupedArray;
}

export async function fetchAllowTeams(tournament_id: string) {
  noStore();
  const supabase = supabaseClient();

  //! si può pensare nella select di selezionare solo i dati relativi ai partecipanti non *
  let { data: count, error: e } = await supabase
    .from("team")
    .select(`*, tournament(game_mode, max_players)`)
    .eq("tournament_id", tournament_id);

  // numero di player per team, in base al game mode
  let teamPlayer = 0;
  // team già registrati
  let teamEntered = 0;

  if (count) {
    teamEntered = count.length;
  }
  if (count?.[0]?.tournament?.game_mode === "solos") {
    teamPlayer = 1;
  } else if (count?.[0]?.tournament?.game_mode === "duos") {
    teamPlayer = 2;
  } else if (count?.[0]?.tournament?.game_mode === "trios") {
    teamPlayer = 3;
  } else if (count?.[0]?.tournament?.game_mode === "squads") {
    teamPlayer = 4;
  }

  let maxTeams = count?.[0]?.tournament?.max_players / teamPlayer;
  if (Number.isNaN(maxTeams)) {
    maxTeams = 1;
  }

  if (teamEntered >= maxTeams || maxTeams < 1) {
    return false;
  } else {
    return true;
  }
}
