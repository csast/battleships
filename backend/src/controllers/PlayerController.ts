import { IncomingMessage, ServerResponse } from "http";
import { PlayerService } from "../services/PlayerService";
import { sendResponse } from "../utils/responseHeader";

export const PlayerController = {
  handleRequest(req: IncomingMessage, res: ServerResponse) {
    if (req.method === "POST" && req.url === "/players") {
      let body = "";

      req.on("data", chunk => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const playerData = JSON.parse(body);
          const result = PlayerService.createPlayer(playerData);

          if (result.error) {
            return sendResponse(res, 400, { error: result.error });
          }

          sendResponse(res, 201, result.player!);
        } catch (error) {
          sendResponse(res, 400, { error: "Invalid JSON format" });
        }
      });
    } else if (req.method === "GET" && req.url === "/players") {
      const players = PlayerService.getAllPlayers();
      sendResponse(res, 200, players);
    }
  }
};