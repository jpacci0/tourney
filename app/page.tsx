// import { createClient } from "@/utils/supabase/server";
// import { cookies } from "next/headers";
// import Image from "next/image";

// export default async function Home() {
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   const { data, error } = await supabase.auth.getUser()
//   console.log(data);
  
//   // if (error || !data?.user) {
//   //   redirect('/')
//   // }

//   // return <p>Hello {data.user.email}</p>
//   return (
//     <>
//     <div>homepage</div>
//     </>
//   );
// }

import CardTorneo from "@/components/cardTorneo";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { fetchTournaments } from "@/lib/data";
import SubHeader from "@/components/subHeader";
import { LinkButton2 } from "@/components/ui/linkButton";

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  // console.log(data);
  
  const tournaments: any = await fetchTournaments();
  // console.log(tournaments);
  
  // console.log(data);
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
      <SubHeader subTitle="Next tournaments">
        <div className="flex gap-2">
          <LinkButton2 href="/crea-torneo" className="text-gray-900 bg-orange-500 hover:bg-orange-400">
            Create tournament
          </LinkButton2>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-full mt-14">
        {tournaments.map((tournament: any) => (
          <CardTorneo key={tournament.id} tournament={tournament} />
        ))}
      </section>
    </main>
  );
}
