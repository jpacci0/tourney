// "use client";
import { Button } from "@/components/ui/button";
import { deleteTeamUser, deleteTeam } from "@/lib/actions";

export default function MyteamTeam({ teammate }: { teammate: any }) {
  const leaveTeam = deleteTeamUser.bind(null, {
    teamid: teammate.team.id,
    userid: teammate.useridLogged,
    tournamentid: teammate.tournament_id,
  });
  const removeTeam = deleteTeam.bind(null, {
    teamid: teammate.team.id,
    userid: teammate.useridLogged,
    tournamentid: teammate.tournament_id,
  });

  return (
    <section>
      {/* <p className="text-orange-500">My team</p> */}
      <div className="text-orange-500 text-xl mb-5 flex justify-between">
        <p>{teammate.team.nome}</p>
        {teammate.creator ? (
          <form action={removeTeam}>
            <Button
              variant="destructive"
              className="text-gray-950 font-bold px-2 py-1 rounded-full"
            >
              Delete team
            </Button>
          </form>
        ) : (
          ""
        )}
      </div>
      {teammate.teammembers.map((member: any, index: number) => (
        <div
          key={member.username}
          className="text-gray-200 flex items-center justify-between mb-5"
        >
          <p>
            {index + 1}
            {". "}
            {member.nick_in_game}{" "}
          </p>
          {member.utenteloggato ? (
            <form action={leaveTeam}>
              <Button
                variant="destructive"
                className="text-gray-950 font-bold px-2 py-1 rounded-full"
              >
                Leave team
              </Button>
            </form>
          ) : (
            ""
          )}
        </div>
      ))}
    </section>
  );
}
