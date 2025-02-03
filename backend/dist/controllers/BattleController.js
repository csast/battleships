"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleController = void 0;
const BattleService_1 = require("../services/BattleService");
const responseHeader_1 = require("../utils/responseHeader");
exports.BattleController = {
    handleRequest(req, res) {
        if (req.method === "POST" && req.url === "/battle/attack") {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                try {
                    const attackData = JSON.parse(body);
                    const result = BattleService_1.BattleService.queueAttack(attackData);
                    if (result.error) {
                        return (0, responseHeader_1.sendResponse)(res, 400, { error: result.error });
                    }
                    (0, responseHeader_1.sendResponse)(res, 202, { message: "Attack request received and queued." });
                }
                catch (error) {
                    (0, responseHeader_1.sendResponse)(res, 400, { error: "Invalid JSON format" });
                }
            });
        }
    }
};
