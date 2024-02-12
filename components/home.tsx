import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchTournaments } from "@/lib/data";
import CardTorneo from "@/components/cardTorneo";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import { LinkButton2 } from "@/components/ui/linkButton";

export default async function Home() {
  const tournaments: any = await fetchTournaments();
  const inProgress: any = tournaments
    .filter((tournament: any) => tournament.status === "in_progress")
    .map((tournament: any) => (
      <CardTorneo key={tournament.id} tournament={tournament} />
    ));
  const upcoming: any = tournaments
    .filter((tournament: any) => tournament.status === "upcoming")
    .map((tournament: any) => (
      <CardTorneo key={tournament.id} tournament={tournament} />
    ));
  const done: any = tournaments
    .filter((tournament: any) => tournament.status === "done")
    .map((tournament: any) => (
      <CardTorneo key={tournament.id} tournament={tournament} />
    ));

  return (
    <section>
      {inProgress.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-orange-500 uppercase mt-10">
            in progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
            {inProgress}
          </div>
          <Separator className="my-4" />
        </>
      )}
      {upcoming.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-orange-500 uppercase mt-10">
            upcoming
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-full">
            {upcoming}
          </div>
          {/* <Separator className="my-4" /> */}
        </>
      )}
      {/* {done.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-gray-200">done</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-full mt-14">
              {done}
            </div>
          </>
        )} */}
    </section>
  );
}
