export default function TournamentSection({ tab }: { tab?: string }) {
  //   const tab = searchParams.tab;
  return (
    <section className="w-full">
      {tab === "overview" && <p>overview</p>}
      {tab === "score" && <p>score</p>}
      {tab === "leaderboard" && <p>leaderboard</p>}
      {tab === "join" && <p>join</p>}
      {tab === "create" && <p>create</p>}
    </section>
  );
}
