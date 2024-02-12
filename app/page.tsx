import { fetchTournaments } from "@/lib/data";
import CardTorneo from "@/components/cardTorneo";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import { LinkButton2 } from "@/components/ui/linkButton";
import Home from "@/components/home";

export default function HomePage() {
  return (
    <main>
      <Header>
        LIFE
        <p className="text-lg mt-3">Learn. Improve. Fail. Excel.</p>
        {/* JWC
        <p className="text-">Join. Compete. Win.</p> */}
      </Header>
      {/* <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Prossimi tornei</h3>
        <Button variant="bottone"><Link href="/crea-torneo">Create tournament</Link></Button>
      </div> */}
      <SubHeader subTitle="Tournaments">
        <div className="flex gap-2">
          <LinkButton2
            href="/crea-torneo"
            className="text-gray-900 bg-orange-500 hover:bg-orange-400"
          >
            Create tournament
          </LinkButton2>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <Home />
    </main>
  );
}
