"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import Overview from "@/components/overview";
import { Suspense } from "react";
import { fetchTournamentById } from "@/lib/data";
import JoinTeam from "@/components/joinTeam";
import CreateTeam from "@/components/createTeam";

export default function TournamentPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const data = await fetchTournamentById(searchParams.id!);
        if (data.error) {
          console.error("Errore:", data.error);
        } else {
          console.log("dataeffect", data);
          setOverviewData(data);
        }
      } catch (error) {
        console.error("Errore generico:", error);
      } finally {
        // setLoading(false);
        console.log("loading");
        
      }
    };

    fetchOverviewData();
  }, []);

  function handleView(tab: string) {
    setActiveTab(tab);
  }

  function firstLetterUppercase(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <main className="mt-10">
      <Header>Tournament</Header>
      <div className="mt-20 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-200">
          {firstLetterUppercase(activeTab)}
        </h3>

        <div className="flex gap-2">
          <Button
            variant="bottoneSecondary"
            onClick={() => handleView("join team")}
          >
            Join team
          </Button>
          <Button
            variant="bottoneSecondary"
            onClick={() => handleView("create team")}
          >
            Create team
          </Button>
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="flex mt-20">
        <nav className="flex flex-col gap-y-3">
          <Button
            variant={activeTab === "overview" ? "bottone" : "default"}
            onClick={() => handleView("overview")}
          >
            Overview
          </Button>

          <Button
            variant={activeTab === "score" ? "bottone" : "default"}
            onClick={() => handleView("score")}
          >
            Score
          </Button>

          <Button
            variant={activeTab === "leaderboard" ? "bottone" : "default"}
            onClick={() => handleView("leaderboard")}
          >
            Leaderboard
          </Button>
        </nav>
        <Separator orientation="vertical" className="h-100 mx-20" />
        <section className="w-full">
          {activeTab === "overview" && (
            <Suspense fallback={<p>Loading overview...</p>}>
              <Overview data={overviewData} />
            </Suspense>
          )}
          {activeTab === "score" && <p>score</p>}
          {activeTab === "leaderboard" && <p>leaderboard</p>}
          <Suspense fallback={<p>Loading teams...</p>}>
            {activeTab === "join team" && <JoinTeam id={searchParams.id} />}
          </Suspense>
          {activeTab === "create team" && <CreateTeam id={searchParams.id} />}
        </section>
      </div>
    </main>
  );
}
