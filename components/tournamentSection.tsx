import Overview from "@/components/overview";
import CreateTeam from "@/components/createTeam";
import CreateT from "@/components/createT";
import JoinT from "@/components/joinT";
import ScoreT from "@/components/scoreT";
import LeaderboardT from "@/components/leaderboardT";
import { Suspense } from "react";

export default function TournamentSection({
  id,
  tab,
}: {
  id?: string;
  tab?: string;
}) {
  //   const tab = searchParams.tab;
  return (
    <section className="w-full mt-5 md:mt-0">
      {tab === "overview" && (
        <Suspense fallback={<p>Loading overview...</p>}>
          <Overview id={id} />
        </Suspense>
      )}
      {tab === "score" && (
        <Suspense fallback={<p>Loading score...</p>}>
          <ScoreT id={id} />
        </Suspense>
      )}
      {tab === "leaderboard" && (
        <Suspense fallback={<p>Loading leaderboard...</p>}>
          <LeaderboardT id={id} />
        </Suspense>
      )}
      {tab === "join" && (
        <Suspense fallback={<p>Loading join...</p>}>
          <JoinT id={id} />
        </Suspense>
      )}
      {tab === "create" && (
        <Suspense fallback={<p>Loading create...</p>}>
          <CreateT id={id} />
        </Suspense>
      )}
    </section>
  );
}
