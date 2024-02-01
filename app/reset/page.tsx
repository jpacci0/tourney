"use client";

import { Button } from "@/components/ui/button";
import { forgotPassword } from "../login/actions";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { Label } from "@/components/ui/label";

export default function ResetPage({searchParams}: {searchParams: {message?: string}}) {
  return (
    <main className="mt-20 mx-20 w-full">
      <Header>
        Reset
      </Header>
      <section className="flex justify-center mt-20">
        <form className="flex flex-col w-96">
          <Label htmlFor="email" className="text-gray-200 mt-5">
            Email:
          </Label>
          <Input id="email" name="email" type="email" required />
          {searchParams?.message && (
          <p className="mt-4 text-red-300">
            {searchParams.message}
          </p>
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
