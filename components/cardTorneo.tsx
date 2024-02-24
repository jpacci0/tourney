import { Clock9, Gamepad2, Euro } from "lucide-react";
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
    registration_price: number;
  };
};
export default function CardTorneo({ tournament }: cardTorneoProps) {
  return (
    <>
      {tournament.status === "done" ? (
        <Link href={`/fine-torneo?id=${tournament.idclient}&tab=leaderboard`}>
          <div
            className="relative overflow-hidden rounded-md shadow-xl hover:shadow-xl hover:shadow-orange-500/10
          p-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-800 p-4 animate-pulse"></div>
            <div className="relative z-10 h-[324px] bg-primary px-4 py-8 rounded-md text-gray-200">
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
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-gray-500">Price per team</p>
                  {tournament.registration_price === 0 ? (
                    <div className="flex gap-1">
                      <Euro className="text-green-500" />
                      <p>Free entry</p>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <Euro className="text-green-500" />
                      <p>{tournament.registration_price}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/tournament?id=${tournament.idclient}&tab=overview`}>
          <div
            className="relative overflow-hidden rounded-md shadow-2xl hover:shadow-2xl hover:shadow-gray-500/20
          p-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-800 p-4 animate-pulse"></div>
            <div className="relative z-10 h-[324px] bg-primary px-4 py-8 rounded-md text-gray-200">
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
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-gray-500">Price per team</p>
                  {tournament.registration_price === 0 ? (
                    <div className="flex gap-1">
                      <Euro className="text-green-500" />
                      <p>Free entry</p>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <Euro className="text-green-500" />
                      <p>{tournament.registration_price}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
