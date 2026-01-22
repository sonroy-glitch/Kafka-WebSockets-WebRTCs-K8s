"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = void 0;
class GameManager {
    constructor() {
        this.games = [];
        this.games = [];
    }
    addMove(id, move) {
        console.log(`Adding move ${move} to ${id}`);
        this.games.map((item) => {
            if (item.id == id) {
                item.moves.push(move);
            }
        });
    }
    addGame(game) {
        this.games.push(game);
    }
    log() {
        console.log(this.games);
    }
}
exports.gameManager = new GameManager();
