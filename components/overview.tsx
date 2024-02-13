import { fetchTournamentUserById, getUserLevel } from "@/lib/data";
import { LinkButton } from "@/components/ui/linkButton";

const Prop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-none xl:flex justify-between bg-primary p-2 rounded-md text-orange-500 text-md">
      {children}
    </div>
  );
};

export default async function Overview({ id }: { id?: string }) {
  const tournament = await fetchTournamentUserById(id!);
  const user = await getUserLevel();

  // if (user?.id === tournament?.created_by) {
  //   console.log("tu hai creato il torneo");
  // } else {
  //   console.log("tu non hai creato il torneo");
  // }

  return (
    <section className="flex flex-col gap-5">
      {tournament.status === "done" && (
        <p className="text-gray-950 bg-destructive w-auto text-center p-2 text-2xl font-bold">
          FINISHED
        </p>
      )}
      {("admin" === user?.level || user?.id === tournament?.created_by) && (
        <LinkButton href={`/edit-torneo?id=${id}`}>Edit tournament</LinkButton>
      )}
      <Prop>
        <p>Tournament ID</p>
        <p className="text-gray-400">{tournament.idclient}</p>
      </Prop>
      <Prop>
        <p>Created by</p>
        <p className="text-gray-400">{tournament.profiles.username}</p>
      </Prop>
      <Prop>
        <p>Title</p>
        <p className="text-gray-400">{tournament.name}</p>
      </Prop>
      <Prop>
        <p>Description</p>
        <p className="text-gray-400">{tournament.description}</p>
      </Prop>
      <Prop>
        <p>Start time</p>
        <p className="text-gray-400">{tournament.start_time}</p>
      </Prop>
      <Prop>
        <p>Rounds</p>
        <p className="text-gray-400">{tournament.rounds}</p>
      </Prop>
      <Prop>
        <p>Players #</p>
        <p className="text-gray-400">15/{tournament.max_players}</p>
      </Prop>
      <Prop>
        <p>Map</p>
        <p className="text-gray-400">{tournament.map}</p>
      </Prop>
      <Prop>
        <p>Platform</p>
        <p className="text-gray-400">{tournament.platform}</p>
      </Prop>
      <Prop>
        <p>Game mode</p>
        <p className="text-gray-400">{tournament.game_mode}</p>
      </Prop>
    </section>
  );
}

// export default function Overview({ data }: { data?: any }) {
//   // if (!data) {
//   //   return <p className="text-gray-500">Error during retrieve tournament</p>;
//   // }
//     // console.log("data", data);

//   return (
//     <section className="flex flex-col gap-5">
//       <Prop>
//         <p>Tournament ID</p>
//         <p className="text-gray-400">{data.idclient}</p>
//       </Prop>
//       <Prop>
//         <p>Title</p>
//         <p className="text-gray-400">{data.name}</p>
//       </Prop>
//       <Prop>
//         <p>Description</p>
//         <p className="text-gray-400">{data.description}</p>
//       </Prop>
//       <Prop>
//         <p>Start time</p>
//         <p className="text-gray-400">{data.start_time}</p>
//       </Prop>
//       <Prop>
//         <p>Rounds</p>
//         <p className="text-gray-400">{data.rounds}</p>
//       </Prop>
//       <Prop>
//         <p>Players #</p>
//         <p className="text-gray-400">15/{data.max_players}</p>
//       </Prop>
//       <Prop>
//         <p>Map</p>
//         <p className="text-gray-400">{data.map}</p>
//       </Prop>
//       <Prop>
//         <p>Platform</p>
//         <p className="text-gray-400">{data.platform}</p>
//       </Prop>
//       <Prop>
//         <p>Game mode</p>
//         <p className="text-gray-400">{data.game_mode}</p>
//       </Prop>
//     </section>
//   );
// }
