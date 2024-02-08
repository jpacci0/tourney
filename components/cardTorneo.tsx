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
      <div className="rounded-lg shadow-xl hover:shadow-xl hover:shadow-orange-500/50 text-gray-200 hover:scale-[1.01] mt-10 h-96 bg-[url('../public/30.png')] bg-cover px-4 py-5">
        {/* <Image
          src={wz}
          width={1000}
          height={100}
          alt="wz"
          className="rounded-lg"
        /> */}
        <h2 className="w-full text-xl py-4 text-orange-500 font-bold">
          {tournament.name}
        </h2>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <p>Datetime</p>
          <div className="flex gap-2 col-span-2">
          <Clock9 />
             {tournament.start_time.replace("T", " ")}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <p>Users</p>
          <div className="flex gap-2 col-span-2">
          <UsersRound />
            <p>15/{tournament.max_players}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <p>Map</p>
          <div className="flex gap-2 col-span-2">
          <Pin />
          <p>{tournament.map}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <p>Platform</p>
          <div className="flex gap-2 col-span-2">
          <Gamepad2/>
          <p>{tournament.platform}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <p>Game mode</p>
          <div className="flex gap-2 col-span-2">
          <Tally3 />
            <p>{tournament.game_mode}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <p>Rounds</p>
          <div className="flex gap-2 col-span-2">
          <RotateCcw />
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
