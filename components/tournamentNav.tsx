import { LinkButton2 } from "@/components/ui/linkButton";

export default function TournamentNav({
  id,
  tab,
}: {
  id?: string;
  tab?: string;
}) {
  return (
    <nav className="flex flex-col gap-y-3">
      <LinkButton2
        href={`/tournament?id=${id}&tab=overview`}
        className={
          tab === "overview"
            ? "text-gray-900 bg-orange-500 hover:bg-orange-400"
            : ""
        }
      >
        Overview
      </LinkButton2>
      <LinkButton2
        href={`/tournament?id=${id}&tab=score`}
        className={
          tab === "score"
            ? "text-gray-900 bg-orange-500 hover:bg-orange-400"
            : ""
        }
      >
        Score
      </LinkButton2>
      <LinkButton2
        href={`/tournament?id=${id}&tab=leaderboard`}
        className={
          tab === "leaderboard"
            ? "text-gray-900 bg-orange-500 hover:bg-orange-400"
            : ""
        }
      >
        Leaderboard
      </LinkButton2>
    </nav>
  );
}
