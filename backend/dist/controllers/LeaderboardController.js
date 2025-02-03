"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const LeaderboardService_1 = require("../services/LeaderboardService");
const responseHeader_1 = require("../utils/responseHeader");
exports.LeaderboardController = {
    handleRequest(req, res) {
        if (req.method === "GET" && req.url === "/leaderboard") {
            const leaderboard = LeaderboardService_1.LeaderboardService.getLeaderboard();
            (0, responseHeader_1.sendResponse)(res, 200, leaderboard);
        }
    }
};
