"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const PlayerService_1 = require("../services/PlayerService");
const responseHeader_1 = require("../utils/responseHeader");
exports.PlayerController = {
    handleRequest(req, res) {
        if (req.method === "POST" && req.url === "/players") {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                try {
                    const playerData = JSON.parse(body);
                    const result = PlayerService_1.PlayerService.createPlayer(playerData);
                    if (result.error) {
                        return (0, responseHeader_1.sendResponse)(res, 400, { error: result.error });
                    }
                    (0, responseHeader_1.sendResponse)(res, 201, result.player);
                }
                catch (error) {
                    (0, responseHeader_1.sendResponse)(res, 400, { error: "Invalid JSON format" });
                }
            });
        }
        else if (req.method === "GET" && req.url === "/players") {
            const players = PlayerService_1.PlayerService.getAllPlayers();
            (0, responseHeader_1.sendResponse)(res, 200, players);
        }
    }
};
