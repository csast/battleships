import { playerRepository } from "../storage/index";

export const PlayerService = {
  createPlayer(playerData: { name: string; gold?: number; atk?: number; hp?: number; lck?: number }) {
    if (!playerData.name) {
      return { error: "Player name is required" };
    }

    const newPlayer = playerRepository.create({
      name: playerData.name,
      gold: playerData.gold || getInitialGold(),
      atk: playerData.atk || 50,
      hp: playerData.hp || getInitialHP(),
      lck: playerData.lck || getLuck(),
      totalGoldStolen: 0,
    });

    if (!newPlayer) {
      return { error: "Failed to create new PLayer" };
    }

    return { player: newPlayer };
  },

  getAllPlayers() {
    return playerRepository.getAll();
  }
};


function getInitialGold() {
    return 1000;
}

function getInitialHP() {
    return 100;
}

// random from 1 to 10
function getLuck() {
   return Math.floor(Math.random() * 10) + 1 ;
}
