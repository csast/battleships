"use strict";
// Enforcign this here to avoid having different instances of the player storage
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerRepository = void 0;
const PlayerRepository_1 = require("./PlayerRepository");
exports.playerRepository = new PlayerRepository_1.PlayerRepository();
