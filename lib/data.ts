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

export async function fetchTeamsById(id: string) {
  // noStore();
  const supabase = supabaseClient();

  try {
    let { data: teams, error } = await supabase
      .from("team")
      .select("name, id")
      .eq("tournament_id", id);

    // console.log(teams);

    return teams;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchScoresById(tournament_id: string, user_id: string) {
  // noStore();
  const supabase = supabaseClient();
  // console.log(tournament_id, user_id);

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
    .from("team")
    .select("name, score")
    .eq("tournament_id", id)
    .order("score", { ascending: false });

  // console.log(leaderboard);

  return leaderboard;
}
