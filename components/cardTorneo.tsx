import Image from "next/image";
import wz from "../public/warzone.jpg";
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
    <Link href={`/tournament?id=${tournament.idclient}`}>
      <div className="rounded-lg shadow-xl shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 text-gray-200 hover:scale-[1.01] mt-10">
        <Image
          src={wz}
          width={1000}
          height={100}
          alt="wz"
          className="rounded-lg"
        />
        <h2 className="w-full ps-3 text-xl my-5 text-orange-500">
          {tournament.name}
        </h2>
        <div className="grid grid-cols-2 ps-3 pb-3">
          <div className="flex mt-5">
            <Clock9 />
            <p className="text-gray-200 ms-3">
              {tournament.start_time.replace("T", " ")}
            </p>
          </div>
          <div className="flex mt-5">
            <UsersRound />
            <p className="text-gray-200 ms-3">{tournament.max_players}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 ps-3 pb-3">
          <div className="flex mt-5">
            <Pin />
            <p className="text-gray-200 ms-3">{tournament.map}</p>
          </div>

          <div className="flex mt-5">
            <Gamepad2 />
            <p className="text-gray-200 ms-3">{tournament.platform}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 ps-3 pb-3">
          <div className="flex mt-5">
            <Tally3 />
            <p className="text-gray-200 ms-3">{tournament.game_mode}</p>
          </div>

          <div className="flex mt-5">
            <RotateCcw />
            <p className="text-gray-200 ms-3">{tournament.rounds}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
