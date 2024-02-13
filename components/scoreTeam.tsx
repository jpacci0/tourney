"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { createScore } from "@/lib/actions";

export default function ScoreTeam({
  id,
  tournament,
  user,
  score,
}: {
  id?: string;
  tournament?: any;
  user?: any;
  score?: any;
}) {
  const [state, formAction] = useFormState(createScore, null);
  const { pending } = useFormStatus();

  const numRounds = tournament?.rounds;
  const arrRounds = Array.from({ length: numRounds }, (value, index) => index);

  const handleSubmit = (formData: any) => {
    const formDataValues = new FormData();

    for (const [key, value] of formData.entries()) {
      if (
        key.startsWith("eliminations_") ||
        key.startsWith("placement_") ||
        key.startsWith("proof_")
      ) {
        formDataValues.append(key, value as string);
      }
    }

    formDataValues.append("user_id", user?.id as string);
    formDataValues.append("tournament_id", id as string);
    formDataValues.append("rounds", numRounds);

    formAction(formDataValues);
  };

  if (score.error_team_user) {
    return (
      <p className="text-red-300 mt-3 text-sm">{score?.error_team_user}</p>
    );
  }
  // if (!score.error_score_null) {
  //   const totalScore = score.reduce((acc: number, s: any) => acc + s.total, 0);
  //   setTotalScore(totalScore);
  // }

  return (
    <section>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-200 underline pt-0">
            Show scores
          </AccordionTrigger>
          <AccordionContent>
            {score.error_score_null && (
              <p className="text-red-300 mt-3 text-sm">
                {score?.error_score_null}
              </p>
            )}
            {!score.error_score_null && (
              <div className="mt-3 text-orange-500 overflow-x-auto">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <p>Rounds</p>
                  <p className="sm:hidden">Elimin.</p>
                  <p className="hidden sm:block">Eliminations</p>
                  <p className="sm:hidden">Placem.</p>
                  <p className="hidden sm:block">Placement</p>
                  <p>Total</p>
                  <p>Proof</p>
                </div>
                {score.map((s: any, index: number) => (
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
            )}
            {!score.error_score_null && (
              <div>
                <p className="bg-orange-500 text-dark-950 p-1 rounded font-bold">
                  Total:{" "}
                  {score.reduce((acc: number, s: any) => acc + s.total, 0)}{" "}
                  points
                </p>
                {/* <p className="text-gray-200">
                  {score.reduce((acc: number, s: any) => acc + s.total, 0)}{" "}
                  points
                </p> */}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-gray-200 underline">
            Enter score
          </AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.target as HTMLFormElement));
              }}
            >
              {arrRounds.map((round, index) => (
                <div
                  key={round}
                  className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-4"
                >
                  <div className="mt-3">
                    <Label htmlFor={`eliminations_${round + 1}`}>
                      Eliminations game {round + 1}
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      id={`eliminations_${round + 1}`}
                      name={`eliminations_${round}`}
                      // value={score !== null ? score[index].eliminations : ""}
                    />
                  </div>
                  <div className="mt-3">
                    <Label htmlFor={`placement_${round + 1}`}>
                      Placement game {round + 1}
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      id={`placement_${round + 1}`}
                      name={`placement_${round}`}
                      // value={score !== null ? score[index].placement : ""}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 md:mt-3">
                    <Label htmlFor={`proof_${round + 1}`}>
                      Proof game {round + 1}
                    </Label>
                    <Input
                      type="text"
                      id={`proof_${round + 1}`}
                      name={`proof_${round}`}
                      placeholder="Clip URL"
                      // value={score !== null ? score[index].placement : ""}
                    />
                  </div>
                  <Separator className="col-span-2 md:col-span-3" />
                </div>
              ))}
              {!state?.success && (
                <p className="text-red-300 mt-3 text-sm">{state?.message}</p>
              )}
              {state?.success && (
                <p className="text-green-300 mt-3 text-sm">{state?.message}</p>
              )}
              <Button variant="bottone" disabled={pending} className="my-5">
                Submit
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
