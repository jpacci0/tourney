import {
  fetchTournamentUserById,
  getUserLevel,
  fetchNumberTeams,
} from "@/lib/data";
import { LinkButton } from "@/components/ui/linkButton";
import { notFound, redirect } from "next/navigation";

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
  const numberTeams = await fetchNumberTeams(id!);

  if (!tournament) {
    return notFound();
  }
  if (tournament.status === "done") {
    redirect(`/fine-torneo?id=${id}`);
  }

  let numberGameMode = 0;
  if (tournament.game_mode === "Squads") {
    numberGameMode = 4;
  } else if (tournament.game_mode === "Trios") {
    numberGameMode = 3;
  } else if (tournament.game_mode === "Duos") {
    numberGameMode = 2;
  } else if (tournament.game_mode === "Solos") {
    numberGameMode = 1;
  }

  return (
    <section className="flex flex-col gap-5">
      {tournament.status === "done" && (
        <p className="text-gray-950 bg-destructive w-auto text-center rounded-md p-2 text-xl font-bold">
          FINISHED
        </p>
      )}
      {("admin" === user?.level || user?.id === tournament?.created_by) &&
        tournament?.status !== "done" && (
          <LinkButton href={`/edit-torneo?id=${id}`}>
            Edit tournament
          </LinkButton>
        )}
      <Prop>
        <p>Tournament ID</p>
        <p className="text-gray-200">{tournament.idclient}</p>
      </Prop>
      <Prop>
        <p>Created by</p>
        <p className="text-gray-200">{tournament.profiles.username}</p>
      </Prop>
      <Prop>
        <p>Title</p>
        <p className="text-gray-200">{tournament.name}</p>
      </Prop>
      <Prop>
        <p>Description</p>
        <p className="text-gray-200">{tournament.description}</p>
      </Prop>
      <Prop>
        <p>Start time</p>
        <p className="text-gray-200">{tournament.start_time}</p>
      </Prop>
      <Prop>
        <p>Rounds</p>
        <p className="text-gray-200">{tournament.rounds}</p>
      </Prop>
      <Prop>
        <p>Teams #</p>
        <p className="text-gray-200">
          {numberTeams}/{tournament.max_players / numberGameMode}
        </p>
      </Prop>
      <Prop>
        <p>Map</p>
        <p className="text-gray-200">{tournament.map}</p>
      </Prop>
      <Prop>
        <p>Platform</p>
        <p className="text-gray-200">{tournament.platform}</p>
      </Prop>
      <Prop>
        <p>Game mode</p>
        <p className="text-gray-200">{tournament.game_mode}</p>
      </Prop>
    </section>
  );
}
