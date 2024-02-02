import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { createTeam } from "@/lib/actions";
import { useFormStatus } from 'react-dom';

export default function CreateTeam({id}: {id?: string}) {
  const [state, formData] = useFormState(createTeam, null);
  const { pending } = useFormStatus();
  
  return (
    <section>
    <form action={formData}>
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
