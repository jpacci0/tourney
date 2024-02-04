import Overview from "@/components/overview";
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
      {tab === "score" && <p>score</p>}
      {tab === "leaderboard" && <p>leaderboard</p>}
      {tab === "join" && <p>join</p>}
      {tab === "create" && <p>create</p>}
    </section>
  );
}
