"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { forgotPassword } from "../login/actions";

export default function ResetPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <main className="mt-20 mx-20 w-full">
      <Header>Reset</Header>
      <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Update password</h3>
        <div className="flex gap-2">
          <Button variant={"bottoneSecondary"} className="p-0">
            <Link
              href="/login"
              className="p-3"
              // className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Back to login
            </Link>
          </Button>
          {/* <Button variant="bottoneSecondary" onClick={() => handleView("join team")}>Join team</Button> */}
        </div>
      </div>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-20">
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
