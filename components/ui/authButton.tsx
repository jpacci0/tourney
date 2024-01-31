import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    // <div className="flex items-center gap-4">
    //   {/* Hey, {user.email}! */}
    //   Profile
    //   <form action={signout}>
    //     <Button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
    //       Logout
    //     </Button>
    //   </form>
    // </div>
    <Button
    variant="bottoneSecondary"
    >
      <Link
        href="/profile"
        // className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Profile
      </Link>
    </Button>
  ) : (
    <Button
    variant={"bottoneSecondary"}
    >
      <Link
        href="/login"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    </Button>
  );
}
