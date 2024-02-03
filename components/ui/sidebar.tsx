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
    <aside className="w-40 bg-gray-900 text-gray-200 shrink-0 relative">
      <div className="fixed top-20 left-10">
        <Link href="/" className="mx-auto">
          Home
        </Link>
      </div>
      <div className="fixed bottom-20 left-10">
        <AuthButton />
      </div>
    </aside>
  );
}
