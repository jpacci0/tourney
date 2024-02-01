"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

function supabaseClient() {
  const cookieStore = cookies();
  return createClient(cookieStore);
}

export async function fetchTournaments() {
  // noStore();
  const supabase = supabaseClient();

  let { data: tournament, error } = await supabase
    .from("tournament")
    .select("*");

  //   if (tournament) console.log(tournament);
  //   if (error) console.log(error);

  return tournament;
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
    // console.log(tournament);
    
    return tournament;
  } catch (error) {
    console.log(error);
  }
}
