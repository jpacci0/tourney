import {
  fetchNumberTeams,
  fetchLeaderboard,
  fetchTournamentById,
  fetchTournamentDetails,
} from "@/lib/data";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

//? Overview component
const Prop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-none xl:flex justify-between bg-primary p-2 rounded-md text-orange-500 text-md">
      {children}
    </div>
  );
};
export async function EndOverview({ idtorneo }: { idtorneo?: string }) {
  const tournamentDetails = await fetchTournamentDetails(idtorneo!);
  if (!tournamentDetails)
    return (
      <p className="text-gray-500">
        There is no viewable data yet. Please try later.
      </p>
    );

  const tournament = tournamentDetails.tournament_data;

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
      <Prop>
        <p>Tournament ID</p>
        <p className="text-gray-200">{tournament.idclient}</p>
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
          {tournament.numberTeams}/{tournament.max_players / numberGameMode}
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

//? Leaderboard component
export async function EndLeaderboard({ idtorneo }: { idtorneo?: string }) {
  const tournamentDetails = await fetchTournamentDetails(idtorneo!);
  if (!tournamentDetails)
    return (
      <p className="text-gray-500">
        There is no viewable data yet. Please try later.
      </p>
    );

  if (tournamentDetails.leaderboard_data.length === 0) {
    return <p className="text-gray-500">No scores yet.</p>;
  }

  const scoreData = tournamentDetails.leaderboard_data;
  return (
    <section>
      {scoreData.map((score: any, index: number) => (
        <Accordion
          type="single"
          collapsible
          key={index}
          className="text-gray-200"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p>
                {index + 1}. {score.team_name} -{" "}
                <span className="text-orange-500">
                  {score.total_score} points
                </span>
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-3 my-3">
                <p className="text-gray-400">Members: </p>
                {score.profiles.map((profile: any) => (
                  <div key={profile.nick_in_game}>- {profile.nick_in_game}</div>
                ))}
              </div>
              <p className="text-gray-400">Scores:</p>
              <div className="mt-3 text-gray-200 overflow-x-auto">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <p>Rounds</p>
                  <p className="sm:hidden">Elimin.</p>
                  <p className="hidden sm:block">Eliminations</p>
                  <p className="sm:hidden">Placem.</p>
                  <p className="hidden sm:block">Placement</p>
                  <p>Total</p>
                  <p>Proof</p>
                </div>
                {score.score.map((s: any, index: number) => (
                  <div key={index} className="text-gray-200 mb-4 bg-primary">
                    <div className="grid grid-cols-5 gap-2">
                      <p className="text-orange-500">Game {index + 1}</p>
                      <p>{s.eliminations}</p>
                      <p>{s.placement}</p>
                      <p>{s.total}</p>
                      {s.proof === "" && <p>N.A.</p>}
                      {s.proof && <Link href={s.proof}>Watch</Link>}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </section>
  );
}

//? Rosters component
export async function EndRosters({ idtorneo }: { idtorneo?: string }) {
  const tournamentDetails = await fetchTournamentDetails(idtorneo!);
  if (!tournamentDetails)
    return (
      <p className="text-gray-500">
        There is no viewable data yet. Please try later.
      </p>
    );
  const rostersData = tournamentDetails.rosters_data;
  if (rostersData.length === 0) {
    return <p className="text-gray-500">No teams registered yet.</p>;
  }

  return (
    <section>
      <div className="grid gap-2 text-center grid-cols-1 md:text-left md:grid-cols-2 xl:grid-cols-3 ">
        {rostersData.map((roster: any, index: number) => (
          <div key={index} className="mb-8">
            <p className="text-lg font-bold text-orange-500">
              {index + 1}. {roster.teamName}
            </p>
            <div className="text-gray-200 flex flex-col">
              {roster.profiles.map((profile: any) => (
                <Link href={`/${profile.username}`} key={profile.username}>
                  {profile.nick_in_game}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
