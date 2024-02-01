"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { fetchUserById, updateUserById, verifySession } from "@/lib/actions";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { signout } from "@/app/login/actions";
import { Label } from "./ui/label";

export default function Profile() {
  const [edit, setEdit] = useState(true);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log(userData, "userdata");

  // verifySession();
  
  const hanleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  
  useEffect(() => {
    // console.log("entra");
    
    const fetchData = async () => {
      try {
        const user = await fetchUserById();
        console.log(user);
        setUserData(user);
      } catch (error) {
        console.error("Errore durante il recupero dei dati utente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []); // La dipendenza vuota assicura che useEffect venga eseguito solo al montaggio del componente

  return (
    <main className="mt-20 mx-20 w-full">
      <Header>
        Profile page
      </Header>
      <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">Login/sign-up</h3>
        <form action={signout}>
          <Button variant="bottoneSecondary">
            Logout
          </Button>
        </form>
      </div>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-20">
        {!loading ? (
          <form className="flex flex-col w-full xl:w-1/2">
            <Label htmlFor="email">
              Email:
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={(userData as any).email}
              disabled={edit}
            />

            <Label htmlFor="fullname">
              Full name:
            </Label>
            <Input
              id="fullname"
              name="full_name"
              type="text"
              value={(userData as any).full_name}
              disabled={edit}
            />

            <Label htmlFor="username">
              Username:
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={(userData as any).username}
              onChange={hanleInputChange}
              disabled={edit}
            />

            <Label htmlFor="nig">
              Nick in game:
            </Label>
            <Input
              id="nig"
              name="nick_in_game"
              type="text"
              value={(userData as any).nick_in_game}
              disabled={edit}
            />

            <Label htmlFor="twitch">
              Twitch link:
            </Label>
            <Input
              id="twitch"
              name="twitch_link"
              type="text"
              value={(userData as any).twitch_link}
              disabled={edit}
            />

            <Label htmlFor="x">
              X link:
            </Label>
            <Input
              id="x"
              name="x_link"
              type="text"
              value={(userData as any).x_link}
              disabled={edit}
            />

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
                formAction={updateUserById}
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
