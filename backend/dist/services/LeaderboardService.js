"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const index_1 = require("../storage/index");
exports.LeaderboardService = {
    getLeaderboard() {
        const players = index_1.playerRepository.getAll();
        return players
            .sort((a, b) => b.totalGoldStolen - a.totalGoldStolen)
            .map((player, index) => ({
            rank: index + 1,
            name: player.name,
            totalGoldStolen: player.totalGoldStolen,
            gold: player.gold
        }));
    }
};
