import Overview from "@/components/overview";
import CreateT from "@/components/createT";
import JoinT from "@/components/joinT";
import ScoreT from "@/components/scoreT";
import LeaderboardT from "@/components/leaderboardT";
import RulesT from "@/components/rulesT";
import RostersT from "@/components/rostersT";
import MyteamT from "@/components/myteamT";
import { Suspense } from "react";
import { LoadingSpinner } from "./loadingSpinner";


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
        <Suspense fallback={<LoadingSpinner />}>
          <Overview id={id} />
        </Suspense>
      )}
      {tab === "score" && (
        <Suspense fallback={<LoadingSpinner />}>
          <ScoreT id={id} />
        </Suspense>
      )}
      {tab === "leaderboard" && (
        <Suspense fallback={<LoadingSpinner />}>
          <LeaderboardT id={id} />
        </Suspense>
      )}
      {tab === "join" && (
        <Suspense fallback={<LoadingSpinner />}>
          <JoinT id={id} />
        </Suspense>
      )}
      {tab === "create" && (
        <Suspense fallback={<LoadingSpinner />}>
          <CreateT id={id} />
        </Suspense>
      )}
      {tab === "rosters" && (
        <Suspense fallback={<LoadingSpinner />}>
          <RostersT id={id} />
        </Suspense>
      )}
      {tab === "rules" && (
        <Suspense fallback={<LoadingSpinner />}>
          <RulesT id={id} />
        </Suspense>
      )}
      {tab === "my-team" && (
        <Suspense fallback={<LoadingSpinner />}>
          <MyteamT id={id} />
        </Suspense>
      )}
    </section>
  );
}
