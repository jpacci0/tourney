import { fetchTeamsById, getSession } from "@/lib/data";
import Link from "next/link";
import MyteamTeam from "@/components/myteamTeam";

export default async function MyteamT({ id }: { id?: string }) {
  const sessionData = await getSession();
  
//   const teams: any = await fetchTeamsById(id!);

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
  return <MyteamTeam />;
}
