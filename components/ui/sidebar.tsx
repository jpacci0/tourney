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
    <aside className="w-40 bg-gray-900 h-screen text-gray-200 shrink-0 flex flex-col justify-between">
      <div className="mt-20 mx-auto">
        <Link href="/" className="mx-auto">
          Home
        </Link>
      </div>
      <div className="mb-20 mx-auto">
        <AuthButton />
      </div>
    </aside>
  );
}
