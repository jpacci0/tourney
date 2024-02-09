import { getSession, fetchAllowTeams } from "@/lib/data";
import Link from "next/link";
import CreateTeam from "@/components/createTeam";

export default async function CreateT({ id }: { id?: string }) {
  const sessionData = await getSession();
  const allowTeams = await fetchAllowTeams(id!);

  if (!sessionData.session) {
    return (
      <p className="text-gray-500">
        You need to be logged in to create a team.
        <Link href={"/login"} className="underline">
          To login click here
        </Link>
        .
      </p>
    );
  }
  if (!allowTeams) {
    return (
      <p className="text-gray-500">
        The maximum number of teams for this tournament has been reached.
      </p>
    );
  }
  return <CreateTeam id={id} />;
}
