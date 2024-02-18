import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { LinkButton } from "@/components/ui/linkButton";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <LinkButton
      href="/profile"
      // className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Profile
    </LinkButton>
  ) : (
    <LinkButton
      href="/login"
      // className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </LinkButton>
  );
}
