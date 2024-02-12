import { LinkButton2 } from "@/components/ui/linkButton";

export default function TournamentNav({
  id,
  tab,
}: {
  id?: string;
  tab?: string;
}) {
  return (
    <nav className="grid grid-rows-3 grid-cols-2 md:grid-rows-5 md:grid-cols-1 gap-y-4 gap-x-2 md:h-max">
      <LinkButton2
        href={`/tournament?id=${id}&tab=overview`}
        className={
          tab === "overview"
            ? "text-gray-900 bg-orange-500 hover:bg-orange-400 col-span-2 md:col-auto"
            : "col-span-2 md:col-auto"
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
      <LinkButton2
        href={`/tournament?id=${id}&tab=rules`}
        className={
          tab === "rules"
            ? "text-gray-900 bg-orange-500 hover:bg-orange-400"
            : ""
        }
      >
        Rules
      </LinkButton2>
      <LinkButton2
        href={`/tournament?id=${id}&tab=rosters`}
        className={
          tab === "rosters"
            ? "text-gray-900 bg-orange-500 hover:bg-orange-400"
            : ""
        }
      >
        Rosters
      </LinkButton2>
    </nav>
  );
}
