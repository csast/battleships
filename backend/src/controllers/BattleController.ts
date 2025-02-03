// src/controllers/BattleController.ts
import { IncomingMessage, ServerResponse } from "http";
import { BattleService } from "../services/BattleService";
import { sendResponse } from "../utils/responseHeader";

export const BattleController = {
  handleRequest(req: IncomingMessage, res: ServerResponse) {
    if (req.method === "POST" && req.url === "/battle/attack") {
      let body = "";

      req.on("data", chunk => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const attackData = JSON.parse(body);
          const result = BattleService.queueAttack(attackData);

          if (result.error) {
            return sendResponse(res, 400, { error: result.error });
          }

          sendResponse(res, 202, { message: "Attack request received and queued." });
        } catch (error) {
          sendResponse(res, 400, { error: "Invalid JSON format" });
        }
      });
    }
  }
};