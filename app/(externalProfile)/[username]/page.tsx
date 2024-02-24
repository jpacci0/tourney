// "use client";

import Header from "@/components/header";
import SearchUser from "@/components/searchUser";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile",
};

export default function UserPage({ params }: { params: { username: string } }) {
  const username = params.username;

  return (
    <main>
      <Header>{params.username}</Header>
      <SubHeader subTitle={`${params.username}'s profile`}>
        <div className="flex gap-2">
          {/* <Button variant="bottoneSecondary" onClick={() => router.back()}>
            Back
          </Button> */}
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <section>
        <div className="text-gray-200 mt-20">
          under construction
        </div>
        <SearchUser username={params.username} />
      </section>
    </main>
  );
}
