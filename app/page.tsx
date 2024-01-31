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
import H1 from "@/components/ui/h1";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  console.log(data);
  return (
    <main className="mt-20 mx-20 w-full">
      <header>
        <H1>Tornei</H1>
      </header>
      <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Prossimi tornei</h3>
        <Button variant="bottone"><Link href="/crea-torneo">Create tournament</Link></Button>
      </div>
      <Separator className="mt-4" />
      <section className="grid grid-cols-2 gap-5 w-full mt-14">
        <CardTorneo />
        <CardTorneo />
        <CardTorneo />
      </section>
    </main>
  );
}
