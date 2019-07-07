import * as Chess from 'chess.js';

class ChessEngine {

    constructor() {
        this._game = new Chess();
    }

    get game() {
        return this._game;
    }

    makeRandomMove(board) {
        const possibleMoves = this.game.moves();

        // Game is over if no moves remain.
        if (possibleMoves.length === 0) {
            return;
        }

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        this.game.move(randomMove);
        board.position(this.game.fen());
    }
}

export default ChessEngine;
