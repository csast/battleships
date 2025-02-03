import http, { IncomingMessage, ServerResponse } from "http";
import { PlayerController } from "./controllers/PlayerController";
import { BattleController } from "./controllers/BattleController";
import { messageQueueService } from "./externalServices/QueueService";
import { BattleService } from "./services/BattleService";
import { LeaderboardController } from "./controllers/LeaderboardController";

const startServer = async () => {
  await messageQueueService.connect();
  await BattleService.processAttackRequests();

  const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url?.startsWith("/players")) {
      PlayerController.handleRequest(req, res);
    } else if (req.url?.startsWith("/battle")) {
      BattleController.handleRequest(req, res);
    } else if (req.url?.startsWith("/leaderboard")) {
        LeaderboardController.handleRequest(req, res);
      } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "notfound" }));
    }
  });

  const gracefulShutdown = async () => {
   //ensure no messages will be lost when things are turned off aka graceful shutdown
    await messageQueueService.close();
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  };

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);

  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

startServer();