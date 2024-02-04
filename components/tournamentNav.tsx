import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TournamentNav({
  id,
  tab,
}: {
  id?: string;
  tab?: string;
}) {
  return (
    <nav className="flex flex-col gap-y-3">
        <Button variant={tab === "overview" ? "bottone" : "default"}>
      <Link href={`/tournament?id=${id}&tab=overview`}>
          Overview
      </Link>
        </Button>

      <Link href={`/tournament?id=${id}&tab=score`}>
        <Button variant={tab === "score" ? "bottone" : "default"}>Score</Button>
      </Link>

      <Link href={`/tournament?id=${id}&tab=leaderboard`}>
        <Button variant={tab === "leaderboard" ? "bottone" : "default"}>
          Leaderboard
        </Button>
      </Link>
    </nav>
  );
}
