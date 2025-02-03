"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const PlayerController_1 = require("./controllers/PlayerController");
const BattleController_1 = require("./controllers/BattleController");
const QueueService_1 = require("./externalServices/QueueService");
const BattleService_1 = require("./services/BattleService");
const LeaderboardController_1 = require("./controllers/LeaderboardController");
const startServer = async () => {
    await QueueService_1.messageQueueService.connect();
    await BattleService_1.BattleService.processAttackRequests();
    const server = http_1.default.createServer((req, res) => {
        if (req.url?.startsWith("/players")) {
            PlayerController_1.PlayerController.handleRequest(req, res);
        }
        else if (req.url?.startsWith("/battle")) {
            BattleController_1.BattleController.handleRequest(req, res);
        }
        else if (req.url?.startsWith("/leaderboard")) {
            LeaderboardController_1.LeaderboardController.handleRequest(req, res);
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "notfound" }));
        }
    });
    const gracefulShutdown = async () => {
        //ensure no messages will be lost when things are turned off aka graceful shutdown
        await QueueService_1.messageQueueService.close();
        server.close(() => {
            console.log("Server closed.");
            process.exit(0);
        });
    };
    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);
    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
};
startServer();
