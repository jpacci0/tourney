import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import lifelogo from "@/public/lifelogo.png";
import AuthButton from "@/components/ui/authButton";

export default function Navbar() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // const signOut = async () => {
  //   "use server";

  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);
  //   await supabase.auth.signOut();
  //   //return redirect("/login");
  // };

  return (
    <nav className="flex justify-between items-center border-b-2 mx-2 md:mx-4 xl:mx-10 2xl:mx-48 fixed top-0 left-0 right-0 bg-gray-950">
      <div className="">
        <Link href="/" className="mx-auto">
          <Image src={lifelogo} width={80} height={80} alt="Logo Life" />
        </Link>
      </div>
      <div className="">
        <AuthButton />
      </div>
    </nav>
  );
}
