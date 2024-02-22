import { LinkButton } from "@/components/ui/linkButton";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { notFound } from 'next/navigation';

export default function EndTournamentPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  if (!searchParams.id) {
    return notFound();
  }
  return (
    <main>
      <Header>Tournament</Header>
      <SubHeader subTitle="Finished">
        <div className="flex gap-2">
          <p></p>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <div className="mt-10 md:flex">
       il torneo {searchParams.id} è finito
      </div>
    </main>
  );
}
