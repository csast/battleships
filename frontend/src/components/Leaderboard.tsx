import React, { useEffect, useState } from "react";
import { getLeaderboard } from "services/api";

interface LeaderboardEntry {
  rank: number;
  name: string;
  totalGoldStolen: number;
  gold: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const fetchLeaderboard = async () => {
    const data = await getLeaderboard();
    setLeaderboard(data);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <button onClick={fetchLeaderboard}>Update Leaderboard</button>
      <ol>
        {leaderboard.map((player) => (
          <li key={player.rank}>
            {player.rank}. {player.name} - Gold Stolen: {player.totalGoldStolen}
          </li>
        ))}
      </ol>
    </div>
  );
}
