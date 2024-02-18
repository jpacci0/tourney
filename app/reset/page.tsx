"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { forgotPassword } from "../login/actions";
import SubHeader from "@/components/subHeader";
import { LinkButton } from "@/components/ui/linkButton";

export default function ResetPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <main>
      <Header>Reset</Header>
      <SubHeader subTitle="Update password">
        <div className="flex gap-2">
          <LinkButton href="/login">
            Back to login
          </LinkButton>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-10">
        <form className="flex flex-col w-96">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
          {searchParams?.message && (
            <p className="mt-4 text-red-300">{searchParams.message}</p>
          )}
          <Button
            className="my-5 w-20"
            variant="bottone"
            formAction={forgotPassword}
          >
            Submit
          </Button>
        </form>
      </section>
    </main>
  );
}
