import { LinkButton } from "@/components/ui/linkButton";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import TournamentSection from "@/components/tournamentSection";
import TournamentNav from "@/components/tournamentNav";

export default function TournamentPage({
  searchParams,
}: {
  searchParams: { id?: string; tab?: string };
}) {
  return (
    <main>
      <Header>Tournament</Header>
      <SubHeader subTitle={searchParams.tab}>
        <div className="flex gap-2">
          <LinkButton href={`/tournament?id=${searchParams.id}&tab=join`}>
            Join team
          </LinkButton>
          <LinkButton href={`/tournament?id=${searchParams.id}&tab=create`}>
            Create team
          </LinkButton>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <div className="mt-10 md:flex">
        <TournamentNav id={searchParams.id} tab={searchParams.tab} />
        <Separator
          orientation="vertical"
          className="h-100 hidden md:block mx-10 lg:mx-20"
        />
        <TournamentSection id={searchParams.id} tab={searchParams.tab} />
      </div>
    </main>
  );
}
