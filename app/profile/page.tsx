

import { fetchUserById, updateUserById, verifySession } from "@/lib/actions";
import Profile from "@/components/profile";
import CardTorneo from "@/components/cardTorneo";

export default async function ProfilePage() {
 

  await verifySession();
  

  return (
    <Profile />
  );
}
