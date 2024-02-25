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
import { createTeamUser } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

export default function JoinTeam({ id, teams, userid }: { id?: string; teams?: any, userid: any }) {
  const [dataTeams, setDataTeams] = useState([]);
  const [state, formAction] = useFormState(createTeamUser, null);
  const { pending } = useFormStatus();

  // console.log("teams", teams);
  let numGameMode = teams.game_mode[0].game_mode;
  let numMaxTeam = 0;
  switch (numGameMode) {
    case "Squads":
      numMaxTeam = 4;
      break;
    case "Trios":
      numMaxTeam = 3;
      break;
    case "Duos":
      numMaxTeam = 2;
      break;
    case "Solos":
      numMaxTeam = 1;
      break;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("user_id", userid!);

    formAction(formData);
  };

  useEffect(() => {
    setDataTeams(teams.teams);
  }, []);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="team">Select team</Label>
        <Input type="hidden" name="tournament_id" value={id} />
        <Select name="team_id">
          <SelectTrigger>
            <SelectValue placeholder="Team name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Teams</SelectLabel>
              {dataTeams.map(
                (team: { id: number; name: string; team_user: [] }) => (
                  <SelectItem key={team.id} value={String(team.id)} disabled={team.team_user.length === numMaxTeam ? true : false}>
                    {team.name} - {team.team_user.length}/{numMaxTeam}
                  </SelectItem>
                )
              )}
              {/* <SelectItem value="1">Team 1</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        {!state?.success && (
          <p className="text-red-300 mt-3 text-sm">{state?.message}</p>
        )}
        {state?.success && (
          <p className="text-green-300 mt-3 text-sm">{state?.message}</p>
        )}
        <Button variant="bottone" disabled={pending} className="my-5">
          Join
        </Button>
      </form>
    </section>
  );
}
