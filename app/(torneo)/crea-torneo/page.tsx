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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow2.css";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createTournament } from "@/lib/actions";

export default function CreaTorneoPage() {
  const [quillValue, setQuillValue] = useState("");

  const [state, formAction] = useFormState(createTournament, null);
  // console.log(quillValue);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    // Costruisci il payload del form con il valore di Quill
    const formData = new FormData(event.target);
    formData.append("rules", quillValue);

    // Chiamare la funzione createTournament con il nuovo payload
    formAction(formData);
  };

  return (
    <main>
      <Header>
        Create tournament
      </Header>
      <SubHeader subTitle="Create">
      <p></p>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="flex justify-center mt-20">
        <form className="flex flex-col w-full xl:w-1/2" onSubmit={handleSubmit}>
          <Label htmlFor="name">Tournament name</Label>
          <Input id="name" name="name" type="text" required />
          {state?.errors?.name && (
            <p className="text-red-300 mt-3 text-sm">{state.errors.name}</p>
          )}
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
          {state?.errors?.description && (
            <p className="text-red-300 mt-3 text-sm">{state.errors.name}</p>
          )}
          <Label htmlFor="rules">Rules</Label>
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
              <Input type="datetime-local" id="datetime" name="start_time" />
              {state?.errors?.start_time && (
                <p className="text-red-300 mt-3 text-sm">
                  {state.errors.start_time}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select name="platform" defaultValue="crossplay">
                <SelectTrigger>
                  <SelectValue placeholder="Crossplay" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crossplay">Crossplay</SelectItem>
                  <SelectItem value="playstation">Playstation</SelectItem>
                  <SelectItem value="xbox">Xbox</SelectItem>
                  <SelectItem value="pc">Pc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <Label htmlFor="map">Map</Label>
              <Select name="map" defaultValue="warzone">
                <SelectTrigger>
                  <SelectValue placeholder="Warzone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warzone">Warzone</SelectItem>
                  <SelectItem value="vondel">Vondel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="game_mode">Game mode</Label>
              <Select name="game_mode" defaultValue="trios">
                <SelectTrigger>
                  <SelectValue placeholder="Trios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solos">Solos</SelectItem>
                  <SelectItem value="duos">Duos</SelectItem>
                  <SelectItem value="trios">Trios</SelectItem>
                  <SelectItem value="squads">Squads</SelectItem>
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
                required
              />
              {state?.errors?.max_players && (
                <p className="text-red-300 mt-3 text-sm">
                  {state.errors.max_players}
                </p>
              )}
            </div>
          </div>

          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue="upcoming">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Upcoming" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="in_progress">In progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
          {state?.message && (
            <p className="text-red-300 mt-3 text-sm">{state.message}</p>
          )}
          <Button className="my-5" variant="bottone">
            Create
          </Button>
        </form>
      </section>
    </main>
  );
}
