"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRepository = void 0;
class PlayerRepository {
    constructor() {
        this.players = [];
        this.currentId = 1;
    }
    // "omit" hides the id from the creation process, players don't need to input an id
    //let the system handle it
    create(playerData) {
        const newPlayer = { id: this.currentId++, ...playerData, hp: 100 };
        this.players.push(newPlayer);
        return newPlayer;
    }
    getAll() {
        return this.players;
    }
    getById(id) {
        return this.players.find(player => player.id === id);
    }
}
exports.PlayerRepository = PlayerRepository;
