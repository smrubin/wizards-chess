class Board {

    constructor(position = 'start') {
        this._board = ChessBoard('wizard-board', {
            position: position,
            draggable: true,
            onDragStart: this.onDragStart,
        });
    }

    get board() {
        return this._board;
    }

    onDragStart() {
        this.displayError('This is Wizard\'s Chess');
        return false;
    }

    displayError(msg) {
        $('.game-error').html(msg);
    }

    clearError() {
        $('.game-error').html('&nbsp;');
    }
}

export default Board;
