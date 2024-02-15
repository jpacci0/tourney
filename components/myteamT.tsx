import { fetchMyteams } from "@/lib/data";
import MyteamTeam from "@/components/myteamTeam";

export default async function MyteamT({ id }: { id?: string }) {
  //!portare la fetch user dentro la funzione sotto. se ritorna errore la funzione sotto vuol dire che non c'è nessuno associato al torneo o ad un team
  const teammate: any = await fetchMyteams(id!);
  if (teammate.message) {
    return <p className="text-gray-500">{teammate.message}</p>;
  }
  return <MyteamTeam teammate={teammate} />;
}
