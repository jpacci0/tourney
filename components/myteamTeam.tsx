"use client";

import { Button } from "@/components/ui/button";
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchGetProducts();
  //     setUserEmail(teammate.creatorEmail || "");
  //     setLoading(true);
  //   };

  //   fetchData();
  // }, []);

  // const fetchGetProducts = async () => {
  //   const res = await fetch("/api/stripe/getProducts");
  //   const data = await res.json();
  //   setPrice(data[0].unit_amount / 100);
  //   setPriceId(data[0].id);

  //   // console.log(
  //   //   (data[0].unit_amount / 100).toLocaleString("it-IT", {
  //   //     style: "currency",
  //   //     currency: "EUR",
  //   //   })
  //   // );
  // };

  const handlePayment = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/stripe/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: teammate.price,
        userEmail: teammate.creatorEmail,
        tournamentId: teammate.tournament_id,
        teamId: teammate.team.id,
      }),
    });
    if (!response.ok) {
      throw new Error("Si è verificato un errore durante la richiesta.");
    }
    const data = await response.json();
    window.location.assign(data);
  };

  return (
    <section>
      {/* <p className="text-orange-500">My team</p> */}
      <div className="text-orange-500 text-xl mb-5 flex justify-between items-center">
        <p>{teammate.team.nome}</p>
        {teammate.creator ? (
          <AlertDialog>
            <AlertDialogTrigger className="text-red-500 bg-gray-950 hover:bg-gray-950 hover:underline font-bold text-sm">
              Delete team
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this team and its participants from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {/* <AlertDialogAction>   */}
                <form action={removeTeam}>
                  <Button variant="default" className="w-full" type="submit">
                    Continue
                  </Button>
                </form>
                {/* </AlertDialogAction> */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          // <form action={removeTeam}>
          //   <Button
          //     variant="destructive"
          //     className="text-red-500 bg-gray-950 hover:bg-gray-950 hover:underline font-bold px-2 py-1 rounded-full"
          //   >
          //     Delete team
          //   </Button>
          // </form>
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
            <AlertDialog>
              <AlertDialogTrigger className="text-red-500 bg-gray-950 hover:bg-gray-950 hover:underline font-bold text-sm">
                Leave team
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you really want to leave this team?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/* <AlertDialogAction>   */}
                  <form action={leaveTeam}>
                    <Button variant="default" className="w-full" type="submit">
                      Continue
                    </Button>
                  </form>
                  {/* </AlertDialogAction> */}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            // <form action={leaveTeam}>
            //   <Button
            //     variant="destructive"
            //     className="text-red-500 hover:bg-gray-950 hover:underline bg-gray-950 font-bold p-0"
            //   >
            //     Leave team
            //   </Button>
            // </form>
            ""
          )}
        </div>
      ))}
      {teammate.creator && teammate.price > 0 ? (
        <div className="mt-20 w-full">
          {!teammate.paid ? (
            <div>
              <p className="text-orange-500 mb-3">Buy team slot</p>
              <Button
                className="bg-green-500 text-gray-950 hover:bg-green-600 font-bold w-full md:w-1/3 text-md"
                onClick={handlePayment}
              >
                Buy now {teammate.price}€
              </Button>
            </div>
          ) : (
            <p className="text-gray-500">
              You have already bought the slot for the tournament.
            </p>
          )}
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
