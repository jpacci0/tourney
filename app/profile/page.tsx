import { verifySession } from "@/lib/actions";
import Profile from "@/components/profile";

export default async function ProfilePage() {
  await verifySession();

  return <Profile />;
}
