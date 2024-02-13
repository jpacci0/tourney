import { fetchTournamentById } from "@/lib/data";
import EditTorneo from "@/components/editTorneo";

export default async function EditTournamentPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const tournament = await fetchTournamentById(searchParams.id!);  

  return <EditTorneo tournamentData={tournament} />;
}
