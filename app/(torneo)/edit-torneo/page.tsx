import {
  fetchTournamentById,
  fetchTournamentUserById,
  getUserLevel,
} from "@/lib/data";
import EditTorneo from "@/components/editTorneo";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Tournament',
};

export default async function EditTournamentPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // const tournament = await fetchTournamentById(searchParams.id!);
  const tournament = await fetchTournamentUserById(searchParams.id!);
  const user = await getUserLevel();

  return (
    <>
      {("admin" === user?.level || user?.id === tournament?.created_by) &&
      tournament?.status !== "done" ? (
        <EditTorneo tournamentData={tournament} />
      ) : (
        <main>
          <Header>Edit tournament</Header>
          <SubHeader subTitle="Edit">
            <div></div>
          </SubHeader>
          <Separator className="mt-4" />
          <p className="text-gray-500 mt-10">
            Sorry but you don&apos;t have permission to modify the tournament or the tournament is finished.
            If not so, contact{" "}
            <Link className="underline" href="/support">
              support
            </Link>
            .
          </p>
        </main>
      )}
    </>
  );
}
