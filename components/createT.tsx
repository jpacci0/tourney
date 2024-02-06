import { getSession } from "@/lib/data";
import Link from "next/link";
import CreateTeam from "@/components/createTeam";

export default async function CreateT({ id }: { id?: string }) {
  const sessionData = await getSession();

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
  return <CreateTeam id={id} />;
}
