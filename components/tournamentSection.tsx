import Overview from "@/components/overview";
import CreateT from "@/components/createT";
import JoinT from "@/components/joinT";
import ScoreT from "@/components/scoreT";
import LeaderboardT from "@/components/leaderboardT";
import RulesT from "@/components/rulesT";
import RostersT from "@/components/rostersT";
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
        <Suspense fallback={<p className="text-gray-200">Loading overview...</p>}>
          <Overview id={id} />
        </Suspense>
      )}
      {tab === "score" && (
        <Suspense fallback={<p className="text-gray-200">Loading score...</p>}>
          <ScoreT id={id} />
        </Suspense>
      )}
      {tab === "leaderboard" && (
        <Suspense fallback={<p className="text-gray-200">Loading leaderboard...</p>}>
          <LeaderboardT id={id} />
        </Suspense>
      )}
      {tab === "join" && (
        <Suspense fallback={<p className="text-gray-200">Loading join...</p>}>
          <JoinT id={id} />
        </Suspense>
      )}
      {tab === "create" && (
        <Suspense fallback={<p className="text-gray-200">Loading create...</p>}>
          <CreateT id={id} />
        </Suspense>
      )}
      {tab === "rosters" && (
        <Suspense fallback={<p className="text-gray-200">Loading rosters...</p>}>
          <RostersT id={id} />
        </Suspense>
      )}
      {tab === "rules" && (
        <Suspense fallback={<p className="text-gray-200">Loading rules...</p>}>
          <RulesT id={id} />
        </Suspense>
      )}
    </section>
  );
}