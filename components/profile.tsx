"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SubHeader from "@/components/subHeader";
import Header from "@/components/header";
import { updateUserById, updateEmail, deleteUser } from "@/lib/actions";
import { signout } from "@/app/login/actions";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function Profile({ user }: { user: any }) {
  const [edit, setEdit] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [loading, setLoading] = useState(true);
  const [countryNames, setCountryNames] = useState([]);
  const [userData, setUserData] = useState(null || {});
  const [state, formAction] = useFormState(updateUserById, null);
  const [stateEmail, formActionEmail] = useFormState(updateEmail, null);
  const deleteUserWithId = deleteUser.bind(null, (userData as any).id);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data
          .map((country: any) => country.name.common)
          .sort();
        setCountryNames(countryNames);
      });

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
    <main className="mt-auto">
      <Header>Profile</Header>
      <SubHeader subTitle="Profile">
        <div className="flex gap-2">
          <form action={signout}>
            <div className="flex gap-2">
              <Button variant="bottoneSecondary">Logout</Button>
            </div>
          </form>
          <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 rounded-md text-sm font-bold px-4 py-2">
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {/* <AlertDialogAction>   */}
                <form action={deleteUserWithId}>
                  <Button variant="default" className="w-full" type="submit">Continue</Button>
                </form>
                {/* </AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      {!loading ? (
        <section className="flex flex-col items-center justify-center mt-10">
          <form action={formActionEmail} className="w-full lg:w-1/2 mb-3">
            <p className="text-gray-200 mb-5">
              Please enter a valid username and ign to ensure you join
              tournaments correctly.
            </p>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={(userData as any).email || ""}
              onChange={hanleInputChange}
              disabled={editEmail}
            />
            {stateEmail?.success && (
              <p className="text-green-300 mt-3 text-sm">
                {stateEmail?.message}
              </p>
            )}
            {!stateEmail?.success && (
              <p className="text-red-300 mt-3 text-sm">{stateEmail?.message}</p>
            )}
            <div className="flex space-x-5">
              <Button
                variant="bottone"
                type="button"
                onClick={() => setEditEmail(!editEmail)}
              >
                Edit email
              </Button>
              <Button variant="bottone" disabled={editEmail}>
                Change email
              </Button>
            </div>
          </form>
          <form onSubmit={handleSubmit} className="space-y-3 w-full lg:w-1/2">
            <div>
              <Label htmlFor="fullname">Full name</Label>
              <Input
                id="fullname"
                name="full_name"
                type="text"
                value={(userData as any).full_name || ""}
                onChange={hanleInputChange}
                disabled={edit}
              />
              {state?.full_name && (
                <p className="text-red-300 mt-3 text-sm">{state.full_name}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={(userData as any).username || ""}
                  onChange={hanleInputChange}
                  disabled={edit}
                />
                {state?.username && (
                  <p className="text-red-300 my-3 text-sm">{state.username}</p>
                )}
              </div>
              <div>
                <Label htmlFor="ign">In game name</Label>
                <Input
                  id="ign"
                  name="nick_in_game"
                  type="text"
                  value={(userData as any).nick_in_game || ""}
                  onChange={hanleInputChange}
                  disabled={edit}
                />
                {state?.nick_in_game && (
                  <p className="text-red-300 mt-3 text-sm">
                    {state.nick_in_game}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                name="country"
                defaultValue={(userData as any).country || "Italy"}
                disabled={edit}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder={(userData as any).country || "Italy"} />
                </SelectTrigger>
                <SelectContent>
                  {countryNames.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Accordion type="single" collapsible className="text-gray-200">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-orange-500">
                  Social media links
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <Label htmlFor="x">X link</Label>
                    <Input
                      id="x"
                      name="x_link"
                      type="text"
                      value={(userData as any).x_link || ""}
                      onChange={hanleInputChange}
                      placeholder="e.g. https://www.twitter.com/life"
                      disabled={edit}
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="twitch">Twitch link</Label>
                    <Input
                      id="twitch"
                      name="twitch_link"
                      type="text"
                      value={(userData as any).twitch_link || ""}
                      onChange={hanleInputChange}
                      placeholder="e.g. https://www.twitch.tv/life"
                      disabled={edit}
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="facebook">Facebook link</Label>
                    <Input
                      id="facebook"
                      name="facebook_link"
                      type="text"
                      value={(userData as any).facebook_link || ""}
                      onChange={hanleInputChange}
                      placeholder="e.g. https://www.facebook.com/life"
                      disabled={edit}
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="instagram">Instagram link</Label>
                    <Input
                      id="instagram"
                      name="instagram_link"
                      type="text"
                      value={(userData as any).instagram_link || ""}
                      onChange={hanleInputChange}
                      placeholder="e.g. https://www.instagram.com/life"
                      disabled={edit}
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="youtube">Youtube link</Label>
                    <Input
                      id="youtube"
                      name="youtube_link"
                      type="text"
                      value={(userData as any).youtube_link || ""}
                      onChange={hanleInputChange}
                      placeholder="e.g. https://www.youtube.com/life"
                      disabled={edit}
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="kick">Kick link</Label>
                    <Input
                      id="kick"
                      name="kick_link"
                      type="text"
                      value={(userData as any).kick_link || ""}
                      onChange={hanleInputChange}
                      placeholder="e.g. https://www.kick.com/life"
                      disabled={edit}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {state?.success && (
              <p className="text-green-300 mt-3 text-sm">{state.success}</p>
            )}
            {state?.fail && (
              <p className="text-red-300 mt-3 text-sm">{state.fail}</p>
            )}
            <div className="flex justify-between items-end my-5">
              <div className="space-x-5">
                <Button
                  className="w-20"
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
