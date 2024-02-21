"use client";

import { Button } from "@/components/ui/button";
import { deleteTeamUser, deleteTeam } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function MyteamTeam({ teammate }: { teammate: any }) {
  const [price, setPrice] = useState(0);
  const [priceId, setPriceId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchGetProducts();
      setUserEmail(teammate.creatorEmail || "");
      setLoading(true);
    };

    fetchData();
  }, []);

  const fetchGetProducts = async () => {
    const res = await fetch("/api/stripe/getProducts");
    const data = await res.json();
    setPrice(data[0].unit_amount / 100);
    setPriceId(data[0].id);

    // console.log(
    //   (data[0].unit_amount / 100).toLocaleString("it-IT", {
    //     style: "currency",
    //     currency: "EUR",
    //   })
    // );
  };

  const handlePayment = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/stripe/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: priceId,
        userEmail: userEmail,
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
          <form action={removeTeam}>
            <Button
              variant="destructive"
              className="text-red-500 bg-gray-950 hover:bg-gray-950 hover:underline font-bold px-2 py-1 rounded-full"
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
                className="text-red-500 hover:bg-gray-950 hover:underline bg-gray-950 font-bold px-2 py-1 rounded-full"
              >
                Leave team
              </Button>
            </form>
          ) : (
            ""
          )}
        </div>
      ))}
      {teammate.creator && loading ? (
        <div className="mt-20 w-full">
          {!teammate.paid ? (
            <Button
              className="bg-green-500 text-gray-950 hover:bg-green-600 font-bold w-full md:w-1/3 text-md"
              onClick={handlePayment}
            >
              Buy team slot {price}€
            </Button>
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
