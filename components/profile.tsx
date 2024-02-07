"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { updateUserById, verifySession } from "@/lib/actions";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { signout } from "@/app/login/actions";
import { Label } from "./ui/label";
import SubHeader from "@/components/subHeader";
import { LinkButton } from "@/components/ui/linkButton";
import { useFormState } from "react-dom";

export default function Profile({ user }: { user: any }) {
  const [edit, setEdit] = useState(true);
  const [userData, setUserData] = useState(null || {});
  const [loading, setLoading] = useState(true);
  const [state, formAction] = useFormState(updateUserById, null);
console.log(
  state
);

  useEffect(() => {
    if (user) {
      setUserData(user);
      console.log((userData as any)?.id);

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
      <SubHeader subTitle="Login/Sign-up">
        <div className="flex gap-2">
          <form action={signout}>
            <Button variant="bottoneSecondary">Logout</Button>
          </form>
          {/* <LinkButton href={`/tournament?id=${searchParams.id}&tab=create`}>
            Create team
          </LinkButton> */}
        </div>
      </SubHeader>
      {/* <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Login/sign-up</h3>
        <form action={signout}>
          <Button variant="bottoneSecondary">
            Logout
          </Button>
        </form>
      </div> */}
      <Separator className="mt-4" />
      <section className="flex justify-center mt-20">
        {!loading ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full xl:w-1/2"
          >
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={(userData as any).email}
              onChange={hanleInputChange}
              disabled={edit}
            />
            {state?.email && (
              <p className="text-red-300 mt-3 text-sm">{state.email}</p>
            )}
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
              <p className="text-red-300 mt-3 text-sm">{state.username}</p>
            )}
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
              <p className="text-red-300 mt-3 text-sm">{state.nick_in_game}</p>
            )}
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
            {state?.success && (
              <p className="text-green-300 mt-3 text-sm">{state.success}</p>
            )}
            {state?.fail && (
              <p className="text-red-300 mt-3 text-sm">{state.fail}</p>
            )}
            <div className="space-x-5">
              <Button
                className="my-5 w-20"
                variant="bottone"
                type="button"
                onClick={() => setEdit(!edit)}
              >
                Edit
              </Button>
              <Button
                className="my-5 w-20"
                variant="bottone"
                disabled={edit}
                // formAction={updateUserById}
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-gray-200">Loading profile page</p>
        )}
      </section>
    </main>
  );
}
