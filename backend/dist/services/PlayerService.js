"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const index_1 = require("../storage/index");
exports.PlayerService = {
    createPlayer(playerData) {
        if (!playerData.name) {
            return { error: "Player name is required" };
        }
        const newPlayer = index_1.playerRepository.create({
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
        return index_1.playerRepository.getAll();
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
    return Math.floor(Math.random() * 10) + 1;
}
