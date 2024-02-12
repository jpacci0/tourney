import Image from "next/image";
import wz from "../public/warzone.jpg";
import wz3 from "../public/30.png";
import wz5 from "../public/50.png";
import {
  Clock9,
  Pin,
  UsersRound,
  Gamepad2,
  Tally3,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

type cardTorneoProps = {
  tournament: {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    rules: string;
    platform: string;
    start_time: string;
    map: string;
    max_players: number;
    rounds: number;
    game_mode: string;
    status: string;
    idclient: string;
  };
};
export default function CardTorneo({ tournament }: cardTorneoProps) {
  return (
    <Link href={`/tournament?id=${tournament.idclient}&tab=overview`}>
      <div className="rounded-md shadow-xl hover:shadow-xl hover:shadow-orange-500/10 text-gray-200 h-72 bg-primary px-4 py-8">
        {/* <Image
          src={wz}
          width={1000}
          height={100}
          alt="wz"
          className="rounded-lg"
        /> */}
        <h2 className="w-full text-xl text-orange-500 font-bold mb-3">
          {tournament.name}
        </h2>

        <div className="flex gap-2 col-span-2">
          <Clock9 className="text-gray-500" />
          {tournament.start_time.replace("T", " ")}
        </div>
        <div className="flex gap-2 col-span-2 mt-3">
          <Gamepad2 className="text-gray-500" />
          <p>{tournament.platform}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div>
            <p className="text-gray-500">Map</p>
            <p>{tournament.map}</p>
          </div>
          <div>
            <p className="text-gray-500">Game mode</p>
            <p>{tournament.game_mode}</p>
          </div>
          <div>
            <p className="text-gray-500">Rounds</p>
            <p>{tournament.rounds}</p>
          </div>
        </div>

  

        {/* <div className="flex mt-5">
          <p>Datetime</p>
          <div className="flex ms-3 gap-3 text-gray-200">
          <Clock9 />
             {tournament.start_time.replace("T", " ")}
          </div>
        </div> */}
        {/* <div className="grid grid-cols-2 gap-3">
          <div className="flex mt-5">
            <Clock9 />
            <p className="text-gray-200">
              {tournament.start_time.replace("T", " ")}
            </p>
          </div>
          <div className="flex mt-5">
            <UsersRound />
            <p className="text-gray-200">{tournament.max_players}</p>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-2 gap-3">
          <div className="flex mt-5">
            <Pin />
            <p className="text-gray-200">{tournament.map}</p>
          </div>

          <div className="flex mt-5">
            <Gamepad2 />
            <p className="text-gray-200">{tournament.platform}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex mt-5">
            <Tally3 />
            <p className="text-gray-200">{tournament.game_mode}</p>
          </div>

          <div className="flex mt-5">
            <RotateCcw />
            <p className="text-gray-200">{tournament.rounds}</p>
          </div>
        </div> */}
      </div>
    </Link>
  );
}
