import React from "react";
import PlayerForm from "components/PlayerForm";
import PlayerList from "components/PlayerList";
import Leaderboard from "components/Leaderboard";

export default function App() {
  return (
    <div className="App">
      <h1>Player Battle System</h1>
      <PlayerForm />
      <PlayerList />
      <Leaderboard />
    </div>
  );
}
