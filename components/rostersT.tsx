import { fetchRosters } from "@/lib/data";
import RostersTeam from "@/components/rostersTeam";

export default async function RostersT({ id }: { id?: string }) {
  const rosters = await fetchRosters(id!);
  return <RostersTeam rostersData={rosters} />;
}
