"use client";

import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useFormState } from "react-dom";
import { updateTournament, deleteTournament } from "@/lib/actions";
import { saveTourney } from "@/lib/data";

export default function EditTorneo({
  tournamentData,
}: {
  tournamentData: any;
}) {
  const [tData, setTData] = useState(tournamentData);
  const [quillValue, setQuillValue] = useState(tData.rules);
  const [state, formAction] = useFormState(updateTournament, null);
  const deleteTournamentWithId = deleteTournament.bind(
    null,
    (tData as any).idclient
  );

  const hanleInputChange = (event: any) => {
    const { name, value } = event.target;
    setTData({ ...tData, [name]: value });
  };

  // console.log(quillValue);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Costruisci il payload del form con il valore di Quill
    const formData = new FormData(event.target);
    formData.append("rules", quillValue);

    // Chiamare la funzione createTournament con il nuovo payload
    formAction(formData);
  };

  const handleSaveTourney = (event: any) => {
    event.preventDefault();
    saveTourney((tData as any).idclient);
  }

  return (
    <main className="mt-auto">
      <Header>Edit tournament</Header>
      <SubHeader subTitle="Edit">
        <AlertDialog>
          <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 rounded-md text-sm font-bold py-2 px-4">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                tournament and all data related to it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction>   */}
              <form action={deleteTournamentWithId}>
                <Button variant="default" className="w-full" type="submit">
                  Continue
                </Button>
              </form>
              {/* </AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-10">
        <form className="flex flex-col w-full xl:w-1/2" onSubmit={handleSubmit}>
          <Input
            type="hidden"
            name="idclient"
            id="idclient"
            value={(tData as any).idclient}
          />
          <Label className="mt-0" htmlFor="name">
            Tournament name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={(tData as any).name}
            onChange={hanleInputChange}
          />
          {state?.errors?.name && (
            <p className="text-red-300 mt-3 text-sm">{state.errors.name}</p>
          )}
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            value={(tData as any).description}
            onChange={hanleInputChange}
          />
          {state?.errors?.description && (
            <p className="text-red-300 mt-3 text-sm">{state.errors.name}</p>
          )}
          <Label>Rules</Label>
          {/* <Textarea id="rules" name="rules" required /> */}
          <ReactQuill
            theme="snow"
            className="text-gray-200 pb-[42px]"
            value={quillValue}
            onChange={setQuillValue}
          />
          {state?.errors?.rules && (
            <p className="text-red-300 mt-3 text-sm">{state.errors.rules}</p>
          )}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <Label htmlFor="datetime">Start date time</Label>
              <Input
                type="datetime-local"
                id="datetime"
                name="start_time"
                value={(tData as any).start_time}
                onChange={hanleInputChange}
              />
              {state?.errors?.start_time && (
                <p className="text-red-300 mt-3 text-sm">
                  {state.errors.start_time}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select name="platform" defaultValue={(tData as any).platform}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder={(tData as any).platform} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Crossplay">Crossplay</SelectItem>
                  <SelectItem value="Playstation">Playstation</SelectItem>
                  <SelectItem value="Xbox">Xbox</SelectItem>
                  <SelectItem value="Pc">Pc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <Label htmlFor="map">Map</Label>
              <Select name="map" defaultValue={(tData as any).map}>
                <SelectTrigger id="map">
                  <SelectValue placeholder={(tData as any).map} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Urzikstan">Urzikstan</SelectItem>
                  <SelectItem value="Vondel">Vondel</SelectItem>
                  <SelectItem value="Fortune’s Keep">Fortune’s Keep</SelectItem>
                  <SelectItem value="Ashika Island">Ashika Island</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="game_mode">Game mode</Label>
              <Select name="game_mode" defaultValue={(tData as any).game_mode}>
                <SelectTrigger id="game_mode">
                  <SelectValue placeholder={(tData as any).game_mode} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solos">Solos</SelectItem>
                  <SelectItem value="Duos">Duos</SelectItem>
                  <SelectItem value="Trios">Trios</SelectItem>
                  <SelectItem value="Squads">Squads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <Label htmlFor="rounds">Rounds</Label>
              <Input
                id="rounds"
                type="number"
                name="rounds"
                min="1"
                max="10"
                value={(tData as any).rounds}
                onChange={hanleInputChange}
                required
              />
              {state?.errors?.rounds && (
                <p className="text-red-300 mt-3 text-sm">
                  {state.errors.rounds}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="max_players">Max n° players</Label>
              <Input
                id="max_players"
                type="number"
                name="max_players"
                min="1"
                max="200"
                value={(tData as any).max_players}
                onChange={hanleInputChange}
                required
              />
              {state?.errors?.max_players && (
                <p className="text-red-300 mt-3 text-sm">
                  {state.errors.max_players}
                </p>
              )}
            </div>
          </div>
          <p className="text-gray-500">Before setting the status to done please save the data by pressing the button below.</p>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="w-full flex flex-col">
              <Label htmlFor="save">Save data</Label>
              <Button id="save" type="button" onClick={handleSaveTourney}>Submit</Button>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={(tData as any).status}>
                <SelectTrigger id="status">
                  <SelectValue placeholder={(tData as any).status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {state?.message && (
            <p className="text-red-300 mt-3 text-sm">{state.message}</p>
          )}
          <Button className="my-5" variant="bottone">
            Edit
          </Button>
        </form>
      </section>
    </main>
  );
}
