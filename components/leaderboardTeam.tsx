import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function LeaderboardTeam({ scoreData }: { scoreData: any }) {
  if (scoreData.length === 0) {
    return <p className="text-gray-500">No scores yet.</p>;
  }

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
