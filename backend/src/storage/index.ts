// Enforcign this here to avoid having different instances of the player storage.... I think on some places I may be using the wrong import????

import { PlayerRepository } from "./PlayerRepository";

export const playerRepository = new PlayerRepository();