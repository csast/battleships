import React, { useEffect, useState } from "react";
import { getPlayers, attackPlayer } from "services/api";

interface Player {
  id: number;
  name: string;
  gold: number;
  atk: number;
  hp: number;
  lck: number;
  totalGoldStolen: number;
}

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [attackerId, setAttackerId] = useState<number | null>(null);
  const [defenderId, setDefenderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const data = await getPlayers();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const handleAttack = async () => {
    if (attackerId && defenderId && attackerId !== defenderId) {
      await attackPlayer(attackerId, defenderId);
      alert("Attack initiated!");
    } else {
      alert("Please select two different players.");
    }
  };

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - Gold: {player.gold} - HP: {player.hp}
          </li>
        ))}
      </ul>

      <div>
        <h3>Initiate Battle</h3>
        <select onChange={(e) => setAttackerId(Number(e.target.value))} defaultValue="">
          <option value="" disabled>Select Attacker</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setDefenderId(Number(e.target.value))} defaultValue="">
          <option value="" disabled>Select Defender</option>
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>

        <button onClick={handleAttack} disabled={!attackerId || !defenderId}>
          Initiate Battle
        </button>
      </div>
    </div>
  );
}
