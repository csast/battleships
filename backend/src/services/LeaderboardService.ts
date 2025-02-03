import { playerRepository } from "../storage/index";

export const LeaderboardService = {
  getLeaderboard() {
    const players = playerRepository.getAll();
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