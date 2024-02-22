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
export async function getUserLevel() {
  const supabase = supabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: profile, error } = await supabase
    .from("profiles")
    .select("id, level")
    .eq("id", user?.id)
    .single();

  return profile;
}

export async function fetchUserById() {
  noStore();
  const supabase = supabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

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
export async function fetchUserByUsername(username: string) {
  noStore();
  const supabase = supabaseClient();

  let { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profileError || !userProfile) {
    return null;
  }

  // if (profileError) {
  //   console.error(
  //     "Errore durante il recupero dei dati del profilo:",
  //     profileError
  //   );
  //   // Puoi gestire l'errore in modo appropriato
  //   return null; // O qualsiasi altro valore di default
  // }

  return userProfile;
}

export async function fetchTournaments() {
  // noStore();
  const supabase = supabaseClient();
  // let { data: u, error: e } = await supabase.auth.admin.listUsers();

  // console.log(e);
  // console.log(u);

  let { data: tournament, error } = await supabase
    .from("tournament")
    .select("*");

  return tournament;
}

export async function fetchRules(tournament_id: string) {
  noStore();
  const supabase = supabaseClient();

  let { data: rules, error: noRules } = await supabase
    .from("tournament")
    .select("rules")
    .eq("idclient", tournament_id)
    .single();

  return rules;
}

export async function fetchTournamentById(id: string) {
  // noStore();
  const supabase = supabaseClient();

  try {
    let { data: tournament, error } = await supabase
      .from("tournament")
      .select("*")
      .eq("idclient", id)
      .single();

    return tournament;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTournamentUserById(id: string) {
  // noStore();
  const supabase = supabaseClient();

  try {
    let { data: tournament, error } = await supabase
      .from("tournament")
      .select(`*, profiles (username, level)`)
      .eq("idclient", id)
      .single();

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

    return { teams, game_mode };
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
      profiles (username, nick_in_game),
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
        score: !team.score ? [] : team.score,
        total_score: !team.score
          ? 0 // Se team.score è null o undefined, impostiamo total_score su 0
          : team.score.reduce((acc: number, s: any) => acc + s.total, 0),
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
  if (count?.[0]?.tournament?.game_mode === "Solos") {
    teamPlayer = 1;
  } else if (count?.[0]?.tournament?.game_mode === "Duos") {
    teamPlayer = 2;
  } else if (count?.[0]?.tournament?.game_mode === "Trios") {
    teamPlayer = 3;
  } else if (count?.[0]?.tournament?.game_mode === "Squads") {
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

export async function fetchRosters(id: string) {
  // noStore();
  const supabase = supabaseClient();

  let { data: rosters, error } = await supabase
    .from("team_user")
    .select(
      `
      user_id,
      team_id,
      profiles (username, nick_in_game),
      team (name)
    `
    )
    .eq("tournament_id", id);

  if (error) {
    console.log(error);
  }

  //? gestire l'eccezione nel caso in cui non ci siano dati, quindi team inseriti, partecipanti e score. in teoria fatto. fare ulteriori check.

  // Raggruppa i dati per team
  const groupedData = rosters!.reduce((acc: any, curr: any) => {
    const { team_id, profiles, team } = curr;
    if (!acc[team_id]) {
      acc[team_id] = {
        team_id,
        team_name: team.name,
        profiles: [],
      };
    }
    acc[team_id].profiles.push(profiles);
    return acc;
  }, {});

  // Converti i dati raggruppati in un array
  const groupedArray = Object.values(groupedData) as any[];

  return groupedArray;
}

export async function fetchMyteams(tournament_id: string) {
  // noStore();
  const supabase = supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id: string | undefined = user?.id;
  if (!user_id) {
    return { message: "Please log in to view your team." };
  }

  //query per trovare il team id dell'utente loggato
  let { data: team_id, error: teamiderror } = await supabase
    .from("team_user")
    .select("team_id")
    .eq("tournament_id", tournament_id)
    .eq("user_id", user_id)
    .single();

  //query per capire se l'utente loggato è il creatore di un team del torneo e del team in cui fa parte. se è il creatore di un altro team ma senza farne parte non ritorna il risultato
  let { data: creator, error: creatorerror } = await supabase
    .from("team")
    .select("name, id, paid")
    .eq("tournament_id", tournament_id)
    .eq("created_by", user_id)
    .eq("id", team_id?.team_id)
    .single();
    
  //query per trovare i membri del team, se non restituisce nulla vuol dire che l'utente non è in nessun team
  let { data: members, error: membererror } = await supabase
    .from("team_user")
    .select(
      `
      profiles (username, nick_in_game, id),
      team (name)
      `
    )
    .eq("team_id", team_id?.team_id);

  if (!members) {
    return { message: "You are not part of any team." };
  }

  function creaOggettoTeam(members: any, userid: string) {
    const team = { nome: members[0].team.name, id: team_id?.team_id };
    const teamMembers = members.map((obj: any) => {
      return {
        username: obj.profiles.username,
        nick_in_game: obj.profiles.nick_in_game,
        utenteloggato: obj.profiles.id === userid,
      };
    });
    return {
      team,
      teammembers: teamMembers,
      useridLogged: userid,
      tournament_id,
      creatorEmail: user?.email,
      paid: creator ? creator.paid : false,
      creator: creator ? true : false,
    };
  }
  const nuovoOggettoTeam = creaOggettoTeam(members, user_id);

  return nuovoOggettoTeam;
}

export async function fetchNumberTeams(tournament_id: string) {
  // noStore();
  const supabase = supabaseClient();

  const { data, count } = await supabase
    .from("team")
    .select("*", { count: "exact", head: true })
    .eq("tournament_id", tournament_id);
  return count;

  // //! si può pensare nella select di selezionare solo i dati relativi ai partecipanti non *
  // let { data: count, error: e } = await supabase
  //   .from("team")
  //   .select(`*, tournament(game_mode, max_players)`)
  //   .eq("tournament_id", tournament_id);

  // // numero di player per team, in base al game mode
  // let teamPlayer = 0;
  // // team già registrati
  // let teamEntered = 0;

  // if (count) {
  //   teamEntered = count.length;
  // }
  // if (count?.[0]?.tournament?.game_mode === "Solos") {
  //   teamPlayer = 1;
  // } else if (count?.[0]?.tournament?.game_mode === "Duos") {
  //   teamPlayer = 2;
  // } else if (count?.[0]?.tournament?.game_mode === "Trios") {
  //   teamPlayer = 3;
  // } else if (count?.[0]?.tournament?.game_mode === "Squads") {
  //   teamPlayer = 4;
  // }

  // let maxTeams = count?.[0]?.tournament?.max_players / teamPlayer;
  // if (Number.isNaN(maxTeams)) {
  //   maxTeams = 1;
  // }

  // if (teamEntered >= maxTeams || maxTeams < 1) {
  //   return false;
  // } else {
  //   return true;
  // }
}
