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

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  // console.log(data);
  
  const tournaments: any = await fetchTournaments();
  // console.log(tournaments);
  
  // console.log(data);
  return (
    <main className="mt-20 mx-20 w-full">
      <Header>
        Tornei
      </Header>
      <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Prossimi tornei</h3>
        <Button variant="bottone"><Link href="/crea-torneo">Create tournament</Link></Button>
      </div>
      <Separator className="mt-4" />
      <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 w-full mt-14">
        {tournaments.map((tournament: any) => (
          <CardTorneo key={tournament.id} tournament={tournament} />
        ))}
      </section>
    </main>
  );
}
