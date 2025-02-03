import { IncomingMessage, ServerResponse } from "http";
import { LeaderboardService } from "../services/LeaderboardService";
import { sendResponse } from "../utils/responseHeader";

export const LeaderboardController = {
  handleRequest(req: IncomingMessage, res: ServerResponse) {
    if (req.method === "GET" && req.url === "/leaderboard") {
      const leaderboard = LeaderboardService.getLeaderboard();
      sendResponse(res, 200, leaderboard);
    }
  }
};