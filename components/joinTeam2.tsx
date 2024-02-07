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
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

export default async function JoinTeam2({ id }: { id?: string }) {
  const [state, formAction] = useFormState(createTeamUser, null);

  const { pending } = useFormStatus();

  // const sessionData = await getSession();
  const teams: any = await fetchTeamsById(id!);
  console.log("teams", teams);
  // console.log("sessionData", sessionData.session);
  // if (sessionData.session) {
  //   setSession(true);
  // }

  // if (!session) {
  //   return (
  //     <p className="text-gray-500">
  //       You need to be logged in to join a team.
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

