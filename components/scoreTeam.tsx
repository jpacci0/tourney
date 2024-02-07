"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createScore } from "@/lib/actions";
import { set } from "zod";

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
  const [totalScore, setTotalScore] = useState(0);

  const numRounds = tournament?.rounds;
  const arrRounds = Array.from({ length: numRounds }, (value, index) => index);

  const handleSubmit = (formData: any) => {
    const formDataValues = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("eliminations_") || key.startsWith("placement_")) {
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
            <div className="mt-3">
              {!score.error_score_null &&
                score.map((s: any, index: number) => (
                  <div key={index} className="text-gray-200 mb-4">
                    <p className="text-orange-500">Game {index + 1}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <p>Eliminations: {s.eliminations}</p>
                      <p>Placement: {s.placement}</p>
                      <p>Total: {s.total}</p>
                    </div>
                  </div>
                ))}
            </div>
            {!score.error_score_null && (
              <div>
                <p className="text-orange-500">Total</p>
                <p className="text-gray-200">{score.reduce((acc: number, s: any) => acc + s.total, 0)} points</p>
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
                <div key={round} className="grid grid-cols-2 gap-4">
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
