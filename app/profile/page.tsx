import { fetchUserById } from "@/lib/data";
import Profile from "@/components/profile";

export default async function ProfilePage() {
  const user = await fetchUserById();

  return <Profile user={user} />;
}
