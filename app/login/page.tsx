"use client";

import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Header from "@/components/header";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import SubHeader from "@/components/subHeader";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const [alreadySignup, setAlreadySignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main>
      <Header>{alreadySignup ? "Login" : "Sign-up"}</Header>
      <SubHeader subTitle="Login/Sign-up">
        <div className="flex gap-2">
          <p></p>
          {/* <LinkButton href={`/tournament?id=${searchParams.id}&tab=join`}>
            Join team
          </LinkButton>
          <LinkButton href={`/tournament?id=${searchParams.id}&tab=create`}>
            Create team
          </LinkButton> */}
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-10">
        <form className="flex flex-col w-96">
          <Label htmlFor="email">
            Email:
          </Label>
          <Input id="email" name="email" type="email" required />
          <Label htmlFor="password">
            Password:
          </Label>
          <div className="relative">
            <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="text-white" /> : <Eye className="text-white"/>}
            </button>
          </div>
          {searchParams?.message && (
            <p className="mt-4 text-red-300">{searchParams.message}</p>
          )}
          {alreadySignup ? (
            <div className="flex flex-col">
              <Button
                className="my-5 w-20"
                variant="bottone"
                formAction={login}
              >
                Log in
              </Button>
              <div className="flex justify-between">
                <Button
                  variant="link"
                  type="button"
                  className="text-gray-200 justify-start ps-0"
                  onClick={() => setAlreadySignup(!alreadySignup)}
                >
                  Don&apos;t have an account?
                </Button>
                <Button
                  variant="link"
                  type="button"
                  className="text-gray-200 justify-start pe-0"
                >
                  <Link href="/reset">Forgot password?</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {!alreadySignup && (
                <Button
                  className="my-5 w-20"
                  variant="bottone"
                  formAction={signup}
                >
                  Sign up
                </Button>
              )}
              <Button
                variant="link"
                type="button"
                className="text-gray-200 justify-start ps-0"
                onClick={() => setAlreadySignup(!alreadySignup)}
              >
                Already have an account?
              </Button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
