"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createTeam } from "@/lib/actions";
import { getSession } from "@/lib/data";

export default function CreateTeam({ id }: { id?: string }) {
  const [session, setSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useFormState(createTeam, null);
  const { pending } = useFormStatus();

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     setLoading(true);
  //     const sessionData = await getSession();
  //     if (sessionData.session) {
  //       setSession(true);
  //     }
  //     console.log("sessionData", sessionData.session);
  //     setLoading(false);
  //   };

  //   fetchSession();
  // }, [id]);

  // if (loading) {
  //   return <p className="text-gray-500">Loading...</p>;
  // }

  // if (!session) {
  //   return (
  //     <p className="text-gray-500">
  //       You need to be logged in to create a team.{" "}
  //       <Link href={"/login"} className="underline">
  //         To login click here
  //       </Link>
  //       .
  //     </p>
  //   );
  // }

  return (
    <section>
      <form action={formAction}>
        <Input type="hidden" name="tournament_id" value={id} />
        <Label htmlFor="team_name">Team name</Label>
        <Input
          type="text"
          id="team_name"
          name="team_name"
          placeholder="Team name"
        />
        {!state?.success && (
          <p className="text-red-300 mt-1 text-sm">{state?.message}</p>
        )}
        {state?.success && (
          <p className="text-green-300 mt-1 text-sm">{state?.message}</p>
        )}
        <Button variant="bottone" disabled={pending} className="my-5">
          Create
        </Button>
      </form>
    </section>
  );
}
