"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { updateUserById, updateEmail } from "@/lib/actions";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { signout } from "@/app/login/actions";
import { Label } from "./ui/label";
import SubHeader from "@/components/subHeader";
import { LinkButton } from "@/components/ui/linkButton";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function Profile({ user }: { user: any }) {
  const [edit, setEdit] = useState(true);
  const [userData, setUserData] = useState(null || {});
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useFormState(updateUserById, null);
  const [stateEmail, formActionEmail] = useFormState(updateEmail, null);

  useEffect(() => {
    if (user) {
      setUserData(user);

      setLoading(false);
    } else {
      console.error("Errore durante il recupero dei dati utente:");
    }
  }, [user]);

  const hanleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("user_id", (userData as any).id);

    formAction(formData);
  };

  return (
    <main>
      <Header>Profile page</Header>
      <SubHeader subTitle="Profile">
        <div className="flex gap-2">
          <form action={signout}>
            <div className="flex gap-2">
              <Button variant="bottoneSecondary">Logout</Button>
            </div>
          </form>
          {/* //TODO implementare la cancellazione dell'account */}
          {/* <form action={deleteAccount}>
            <div className="flex gap-2">
              <Button variant="destructive">Delete</Button>
            </div>
          </form> */}
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      {!loading ? (
        <section className="flex flex-col items-center justify-center md:mt-20 mt-10">
          <form action={formActionEmail} className="w-full lg:w-1/2 mb-3">
            <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={(userData as any).email}
                onChange={hanleInputChange}
                disabled={edit}
              />
              {stateEmail?.success && (
                <p className="text-green-300 mt-3 text-sm">
                  {stateEmail?.message}
                </p>
              )}
              {!stateEmail?.success && (
                <p className="text-red-300 mt-3 text-sm">
                  {stateEmail?.message}
                </p>
              )}
              <Button variant="bottone" disabled={edit}>
                Change email
              </Button>
          </form>
          <form onSubmit={handleSubmit} className="space-y-3 w-full lg:w-1/2">
            <div>
              <Label htmlFor="fullname">Full name:</Label>
              <Input
                id="fullname"
                name="full_name"
                type="text"
                value={(userData as any).full_name}
                onChange={hanleInputChange}
                disabled={edit}
              />
              {state?.full_name && (
                <p className="text-red-300 mt-3 text-sm">{state.full_name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={(userData as any).username}
                onChange={hanleInputChange}
                disabled={edit}
              />
              {state?.username && (
                <p className="text-red-300 my-3 text-sm">{state.username}</p>
              )}
            </div>
            <div>
              <Label htmlFor="nig">Nick in game:</Label>
              <Input
                id="nig"
                name="nick_in_game"
                type="text"
                value={(userData as any).nick_in_game}
                onChange={hanleInputChange}
                disabled={edit}
              />
              {state?.nick_in_game && (
                <p className="text-red-300 mt-3 text-sm">
                  {state.nick_in_game}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="twitch">Twitch link:</Label>
              <Input
                id="twitch"
                name="twitch_link"
                type="text"
                value={(userData as any).twitch_link}
                onChange={hanleInputChange}
                placeholder="e.g. https://www.twitch.tv/life"
                disabled={edit}
              />
            </div>
            <div>
              <Label htmlFor="x">X link:</Label>
              <Input
                id="x"
                name="x_link"
                type="text"
                value={(userData as any).x_link}
                onChange={hanleInputChange}
                placeholder="e.g. https://www.twitter.com/life"
                disabled={edit}
              />
            </div>
            {state?.success && (
              <p className="text-green-300 mt-3 text-sm">{state.success}</p>
            )}
            {state?.fail && (
              <p className="text-red-300 mt-3 text-sm">{state.fail}</p>
            )}
            <div className="flex justify-between items-end my-5">
              <div className="space-x-5">
                <Button
                  className=" w-20"
                  variant="bottone"
                  type="button"
                  onClick={() => setEdit(!edit)}
                >
                  Edit
                </Button>
                <Button
                  className="w-20"
                  variant="bottone"
                  disabled={edit}
                  // formAction={updateUserById}
                >
                  Submit
                </Button>
              </div>
              <Link
                href="/reset/update-password"
                className="text-gray-200 underline text-sm"
              >
                Change password?
              </Link>
            </div>
          </form>
        </section>
      ) : (
        <p className="text-gray-200">Loading profile page</p>
      )}
    </main>
  );
}
