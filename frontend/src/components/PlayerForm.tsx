import { useState } from "react";
import { createPlayer } from "../services/api";
import React from "react";

export default function PlayerForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      await createPlayer(name);
      setName("");
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
        required
      />
      <button type="submit">Create Player</button>
    </form>
  );
}
