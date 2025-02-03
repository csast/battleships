import { Player } from "../models/Player";

export class PlayerRepository {
  private players: Player[] = [];
  private currentId = 1;

  // "omit" hides the id from the creation process, players don't need to input an id
  //let the system handle it
  create(playerData: Omit<Player, "id">): Player {
    const newPlayer: Player = { id: this.currentId++, ...playerData, hp: 100 };
    this.players.push(newPlayer);
    return newPlayer;
  }

  getAll(): Player[] {
    return this.players;
  }

  getById(id: number): Player | undefined {
    return this.players.find(player => player.id === id);
  }
}