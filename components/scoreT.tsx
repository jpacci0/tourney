import { fetchScoresById, getSession, getUser, fetchTournamentById } from "@/lib/data";
import Link from "next/link";
import ScoreTeam from "@/components/scoreTeam";

export default async function ScoreT({ id }: { id?: string }) {
  // const sessionData = await getSession();
  const userData = await getUser();
  // console.log("sessionData", userData);
  const scoreData = await fetchScoresById(id!, userData?.id!);
  // console.log("scoreData", scoreData);
  
  //TODO tournamentData mi serve per i rounds. la fetch la faccio anche prima per recuperare i dati del torneo quindi si deve passare come props ed eiminare la fetch qui
  const tournamentData = await fetchTournamentById(id!);
// console.log("tournamentData", tournamentData);

  if (!userData) {
    return (
      <p className="text-gray-500">
        You must be a tournament participant to enter the score.{" "}
        <Link href={"/login"} className="underline">
          To login click here
        </Link>
        .
      </p>
    );
  }
  return <ScoreTeam id={id} tournament={tournamentData} user={userData} score={scoreData} />;
}
