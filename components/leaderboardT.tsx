import { fetchLeaderboard } from "@/lib/data";
import Link from "next/link";
import ScoreTeam from "@/components/scoreTeam";

export default async function ScoreT({ id }: { id?: string }) {

  const scoreData = await fetchLeaderboard(id!);


//   if (!userData) {
//     return (
//       <p className="text-gray-500">
//         You must be a tournament participant to enter the score.{" "}
//         <Link href={"/login"} className="underline">
//           To login click here
//         </Link>
//         .
//       </p>
//     );
//   }
//   return <ScoreTeam id={id} tournament={tournamentData} user={userData} score={scoreData} />;
return <><p className="text-indigo-500">leaderboard</p></>
}
