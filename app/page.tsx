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
      </Header>
      <SubHeader subTitle="Tournaments">
        <div className="flex gap-2">
          <LinkButton2
            href="/crea-torneo"
            className="text-gray-900 bg-orange-500 hover:bg-orange-400 px-2"
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
