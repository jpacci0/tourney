const rosters: any = [
  // {
  //   team_id: 5,
  //   team_name: 'Team name 2',
  //   profiles: [ {nick_in_game: "jackkopo"} , {nick_in_game: "jacffopo"}, {nick_in_game: "jacopoxx"} ]
  // },
  // {
  //   team_id: 6,
  //   team_name: 'Team name 2',
  //   profiles: [ {nick_in_game: "veloxey"} , {nick_in_game: "qqjacopo"}, {nick_in_game: "vvjacopo"} ]
  // },
  // {
  //   team_id: 7,
  //   team_name: 'Team name 2',
  //   profiles: [ {nick_in_game: "ventisette"} , {nick_in_game: "sedidic"}, {nick_in_game: "quindici"} ]
  // },
  // {
  //   team_id: 8,
  //   team_name: 'Team name 2',
  //   profiles: [ {nick_in_game: "nonloso"} , {nick_in_game: "domani"}, {nick_in_game: "dopodonanbi"} ]
  // },
  // {
  //   team_id: 9,
  //   team_name: 'MirreyTv x Bgod x Mextinq',
  //   profiles: [ {nick_in_game: "felinesprint"} , {nick_in_game: "rive fede"}, {nick_in_game: "cong"} ]
  // },
  // {
  //   team_id: 10,
  //   team_name: 'Team name 2',
  //   profiles: [ {nick_in_game: "velox"} , {nick_in_game: "dariomartiz"}, {nick_in_game: "berritv"} ]
  // },
  // { team_id: 11, team_name: 'Team name 3 Team name 3', profiles: [{nick_in_game: "jacopo"}] },
  // { team_id: 12, team_name: 'Team name 3 Team name 3', profiles: [] },
  // { team_id: 13, team_name: 'Team name 3 Team name 3', profiles: [{nick_in_game: "jaccopo"}] },
  // { team_id: 14, team_name: 'Team name 3 Team name 3', profiles: [] },
];
import Link from "next/link";
import { Check } from "lucide-react";

export default function RostersTeam({ rostersData }: { rostersData: any }) {
  if (rostersData.length === 0) {
    return <p className="text-gray-500">No teams registered yet.</p>;
  }

  return (
    <section>
      <div className="grid gap-2 text-center grid-cols-1 md:text-left md:grid-cols-2 xl:grid-cols-3 ">
        {rostersData.map((roster: any, index: number) => (
          <div key={index} className="mb-8">
            <div className="flex items-center justify-center md:justify-normal space-x-2">
              <p className="text-lg font-bold text-orange-500">
                {index + 1}. {roster.team_name}
              </p>
              {roster.paid && <Check className="text-green-500" />}
            </div>
            <div className="text-gray-200 flex flex-col">
              {roster.profiles.map((profile: any) => (
                <Link href={`/${profile.username}`} key={profile.username}>
                  {profile.nick_in_game}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
