import {
  Clock9,
  Pin,
  UsersRound,
  Gamepad2,
  Tally3,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { Black_Ops_One } from "next/font/google";

const BlackOpsOne = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
    <>
      {tournament.status === "done" ? (
        <Link href={`/fine-torneo?id=${tournament.idclient}`}>
          <div className="rounded-md shadow-xl hover:shadow-xl hover:shadow-orange-500/10 text-gray-200 h-72 bg-primary px-4 py-8">
            {/* <Image
          src={wz}
          width={1000}
          height={100}
          alt="wz"
          className="rounded-lg"
        /> */}
            <h2
              className={`w-full mb-5 text-xl text-orange-500 font-bold, ${BlackOpsOne.className}`}
            >
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
          </div>
        </Link>
      ) : (
        <Link href={`/tournament?id=${tournament.idclient}&tab=overview`}>
          <div className="rounded-md shadow-xl hover:shadow-xl hover:shadow-orange-500/10 text-gray-200 h-72 bg-primary px-4 py-8">
            {/* <Image
          src={wz}
          width={1000}
          height={100}
          alt="wz"
          className="rounded-lg"
        /> */}
            <h2
              className={`w-full mb-5 text-xl text-orange-500 font-bold, ${BlackOpsOne.className}`}
            >
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
          </div>
        </Link>
      )}
    </>
  );
}
