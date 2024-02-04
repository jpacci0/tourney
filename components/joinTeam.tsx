"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { fetchTeamsById, getSession } from "@/lib/data";
import { createTeamUser } from "@/lib/actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

export default function JoinTeam({ id }: { id?: string }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useFormState(createTeamUser, null);
  const [session, setSession] = useState(false);

  const { pending } = useFormStatus();

  //   console.log("teams", teams);

  useEffect(() => {
    const fetchTeamsData = async () => {
      setLoading(true);
      const sessionData = await getSession();
      if (sessionData.session) {
        setSession(true);
      }
      console.log("sessionData", sessionData.session);
      try {
        const data: any = await fetchTeamsById(id!);

        setTeams(data);
      } catch (error) {
        console.error("Errore generico:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamsData();
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }
  if (!session) {
    return (
      <p className="text-gray-500">
        You need to be logged in to join a team.
        <Link href={"/login"} className="underline">
          To login click here
        </Link>
        .
      </p>
    );
  }
  return (
    <section>
      <form action={formAction}>
        <Label htmlFor="team">Select team</Label>
        <Input type="hidden" name="tournament_id" value={id} />
        <Select name="team_id">
          <SelectTrigger>
            <SelectValue placeholder="Team name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Teams</SelectLabel>
              {teams.map((team: { id: number; name: string }) => (
                <SelectItem key={team.id} value={String(team.id)}>
                  {team.name}
                </SelectItem>
              ))}
              {/* <SelectItem value="1">Team 1</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        {!state?.success && (
          <p className="text-red-300 mt-1 text-sm">{state?.message}</p>
        )}
        {state?.success && (
          <p className="text-green-300 mt-1 text-sm">{state?.message}</p>
        )}
        <Button variant="bottone" disabled={pending} className="my-5">
          Join
        </Button>
      </form>
    </section>
  );
}

