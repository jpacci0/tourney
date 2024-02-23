import { fetchLeaderboard } from "@/lib/data";
import LeaderboardTeam from "@/components/leaderboardTeam";

export default async function LeaderboardT({ id }: { id?: string }) {
  const scoreData = await fetchLeaderboard(id!);

  return <LeaderboardTeam scoreData={scoreData} />;
}
