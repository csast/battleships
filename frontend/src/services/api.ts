const API_URL = "http://localhost:3000";

export const createPlayer = async (name: string) => {
  const res = await fetch(`${API_URL}/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
};

export const getPlayers = async () => {
  const res = await fetch(`${API_URL}/players`);
  return res.json();
};

export const attackPlayer = async (attackerId: number, defenderId: number) => {
    try {
      const res = await fetch("http://localhost:3001/battle/attack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attackerId, defenderId }),
      });
  
      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }
  
      return res.json();
    } catch (error) {
      console.error("Attack API Error:", error);
      alert("Attack failed. Check console for details.");
    }
  };
  
  

export const getLeaderboard = async () => {
  const res = await fetch(`${API_URL}/leaderboard`);
  return res.json();
};
