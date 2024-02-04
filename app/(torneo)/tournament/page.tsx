import { LinkButton } from "@/components/ui/linkButton";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import TournamentSection from "@/components/tournamentSection";
import TournamentNav from "@/components/tournamentNav";
import SubHeader from "@/components/subHeader";
import { fetchTeamsById, fetchTournamentById } from "@/lib/data";

export default async function TournamentPage({
  searchParams,
}: {
  searchParams: { id?: string; tab?: string };
}) {
  // const tournament = await fetchTournamentById(searchParams.id!);
  // console.log("tournament", tournament);
  
  // const teams = await fetchTeamsById(searchParams.id!);

  return (
    <main className="mt-20 mx-20 w-full">
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
      <div className="flex mt-20">
        <TournamentNav id={searchParams.id} tab={searchParams.tab} />
        <Separator orientation="vertical" className="h-100 mx-20" />
        <TournamentSection id={searchParams.id} tab={searchParams.tab} />
      </div>
    </main>
  );
}
