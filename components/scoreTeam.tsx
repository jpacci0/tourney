"use client";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
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
      if (key.startsWith("eliminations_") || key.startsWith("placement_")) {
        formDataValues.append(key, value as string);
      }
    }

    formDataValues.append("user_id", user?.id as string);
    formDataValues.append("tournament_id", id as string);
    formDataValues.append("rounds", numRounds);

    formAction(formDataValues);
  };

  console.log("score", score);
  if (score.error) {
    return <p className="text-red-300 mt-1 text-sm">{score?.error}</p>;
  }

  return (
    <section>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-200 underline pt-0">
            Show scores
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-3">
              {score.map((s: any, index: number) => (
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
              {/* {!state?.success && (
          <p className="text-red-300 mt-1 text-sm">{state?.message}</p>
        )}
        {state?.success && (
          <p className="text-green-300 mt-1 text-sm">{state?.message}</p>
        )} */}
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
