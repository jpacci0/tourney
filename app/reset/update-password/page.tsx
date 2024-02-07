"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updatePassword } from "@/app/login/actions";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  const [showPassword, setShowPassword] = useState(false);
  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)

  // const { data, error } = await supabase.auth.getUser()
  // console.log(data);

  // const updatePassword = async (formData: FormData) => {
  //   "use server";
  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);

  //   console.log(formData.get("password"));

  //   const new_password = formData.get("password") as string;

  //   const { data, error } = await supabase.auth.updateUser({
  //     password: new_password,
  //   });
  //   if (data) console.log(data);

  //   if (error) {
  //     console.log(error);
  //     redirect("/error");
  //   }
  // };
  return (
    <main>
      <Header>
        Reset
      </Header>

      <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Update password</h3>
        <div className="flex gap-2">
          {/* <Button variant="bottoneSecondary" onClick={() => handleView("join team")}>Join team</Button> */}
        </div>
      </div>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-20">
        <form className="flex flex-col w-96">

          <Label htmlFor="password">
            Password:
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="text-white" /> : <Eye className="text-white" />}
            </button>
          </div>

          <Label htmlFor="passwordConfirmation">
            Password confirmation:
          </Label>
          <div className="relative">
            <Input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="text-white" /> : <Eye className="text-white" />}
            </button>
          </div>

          {searchParams?.message && (
            <p className="mt-4 text-red-300">{searchParams.message}</p>
          )}
          <Button
            className="my-5 w-20"
            variant="bottone"
            formAction={updatePassword}
          >
            Submit
          </Button>
        </form>
      </section>
    </main>
  );
}
