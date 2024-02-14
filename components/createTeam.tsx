"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { createTeam } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function CreateTeam({ id, userid }: { id?: string, userid?: string}) {
  const [state, formAction] = useFormState(createTeam, null);
  const { pending } = useFormStatus();
  const [timerId, setTimerId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      const idTimer: any = setTimeout(() => {
        router.push(`/tournament?id=${id}&tab=join`);
      }, 4000);
      setTimerId(idTimer);

      // Clean up the timer when the component unmounts
      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    }
  }, [state?.success]); // Execute the effect only when state.success changes

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("user_id", userid!);

    formAction(formData);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input type="hidden" name="tournament_id" value={id} />
        <Label htmlFor="team_name">Team name</Label>
        <Input
          type="text"
          id="team_name"
          name="team_name"
          placeholder="Team name"
        />
        {!state?.success && (
          <p className="text-red-300 mt-3 text-sm">{state?.message}</p>
        )}
        {state?.success && (
          <p className="text-green-300 mt-3 text-sm">{state?.message}</p>
        )}
        <Button
          variant="bottone"
          disabled={state?.success ? true : false}
          className="my-5"
        >
          Create
        </Button>
      </form>
    </section>
  );
}
