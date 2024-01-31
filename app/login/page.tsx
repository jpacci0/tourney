"use client";

import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import H1 from "@/components/ui/h1";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const [alreadySignup, setAlreadySignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="mt-20 mx-20 w-full">
      <header>{alreadySignup ? <H1>Login</H1> : <H1>Sign-up</H1>}</header>
      <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Login/sign-up</h3>
        {/* <Button variant="bottone">Crea torneo</Button> */}
      </div>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-20">
        <form className="flex flex-col w-96">
          <Label htmlFor="email" className="text-gray-200 mt-5">
            Email:
          </Label>
          <Input id="email" name="email" type="email" required />
          <Label htmlFor="password" className="text-gray-200 mt-5">
            Password:
          </Label>
          <div className="relative">
            <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
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
