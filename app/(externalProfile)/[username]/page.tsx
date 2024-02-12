"use client";

import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function UserPage({ params }: { params: { username: string } }) {
  const router = useRouter();

  return (
    <main className="my-36 md:my-40">
      <Header>{params.username}</Header>
      <SubHeader subTitle={`${params.username}'s profile`}>
        <div className="flex gap-2">
          <Button variant="bottoneSecondary" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <section>
        <div className="text-gray-200 mt-20">
          under construction
        </div>
      </section>
    </main>
  );
}
