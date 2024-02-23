import { LinkButton } from "@/components/ui/linkButton";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { notFound } from 'next/navigation';
import {EndTournamentNav} from "@/components/tournamentNav";
import {EndTournamentSection} from "@/components/tournamentSection";

export default function EndTournamentPage({
  searchParams,
}: {
  searchParams: { id?: string, tab?: string};
}) {
  if (!searchParams.id) {
    return notFound();
  }
  if (!searchParams.tab) {
    return notFound();
  }
  return (
    <main>
      <Header>Tournament</Header>
      <SubHeader subTitle="Details">
        <div className="flex gap-2">
          <p></p>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <div className="mt-10 md:flex">
        <EndTournamentNav id={searchParams.id} tab={searchParams.tab} />
        <Separator
          orientation="vertical"
          className="h-100 hidden md:block mx-10 lg:mx-20"
        />
        <EndTournamentSection id={searchParams.id} tab={searchParams.tab} />
      </div>
    </main>
  );
}
