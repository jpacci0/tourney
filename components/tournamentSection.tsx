import Overview from "@/components/overview";
import CreateTeam from "@/components/createTeam";
import CreateT from "@/components/createT";
import JoinT from "@/components/joinT";
import ScoreT from "@/components/scoreT";
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
    <section className="w-full">
      {tab === "overview" && (
        <Suspense fallback={<p>Loading...</p>}>
          <Overview id={id} />
        </Suspense>
      )}
      {tab === "score" && (
        <Suspense fallback={<p>Loading Suspense...</p>}>
          <ScoreT id={id} />
        </Suspense>
      )}
      {tab === "leaderboard" && <p>leaderboard</p>}
      {tab === "join" && (
        <Suspense fallback={<p>Loading Suspense...</p>}>
          <JoinT id={id} />
        </Suspense>
      )}
      {tab === "create" && (
        <Suspense fallback={<p>Loading Suspense...</p>}>
          <CreateT id={id} />
        </Suspense>
      )}
    </section>
  );
}
