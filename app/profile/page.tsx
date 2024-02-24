import { fetchUserById } from "@/lib/data";
import Profile from "@/components/profile";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const user = await fetchUserById();

  return <Profile user={user} />;
}
