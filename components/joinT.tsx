import { fetchTeamsById, getSession } from "@/lib/data";
import Link from "next/link";
import JoinTeam from "@/components/joinTeam";

export default async function JoinT({ id }: { id?: string }) {
  const sessionData = await getSession();
  
  const teams: any = await fetchTeamsById(id!);

  if (!sessionData.session) {
    return (
      <p className="text-gray-500">
        You need to be logged in to join a team.
        <Link href={"/login"} className="underline">
          To login click here
        </Link>
        .
      </p>
    );
  }
  return <JoinTeam id={id} teams={teams} />;
}
