import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import AuthButton from "./authButton";

export default async function Sidebar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const signOut = async () => {
  //   "use server";

  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);
  //   await supabase.auth.signOut();
  //   //return redirect("/login");
  // };

  return (
    <nav className="bg-gray-900 flex justify-between p-2 items-center">
      <div className="">
        <Link href="/" className="mx-auto">
          Home
        </Link>
      </div>
      <div className="">
        <AuthButton />
      </div>
    </nav>
  );
}
