import ChessEngine from './ChessEngine.js';
import Board from './Board.js';

class WizardsChess {
    constructor() {
        this._game = new ChessEngine(); // Handles the engine
        this._board = new Board(); // Handles the display

        this.columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
        this.pieces = ['king', 'queen', 'bishop', 'knight', 'rook', 'castle', 'pawn'];
        this.squares = this.buildSquares(this.columns, this.rows);
        this.moves = this.buildMoves(this.squares, this.pieces);

        const phrases = this.squares.concat(this.pieces).join(' | ');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
        const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrases + ' ;';
        this.recognition = new SpeechRecognition();
        const speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = speechRecognitionList;
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.onnomatch = this.onnomatch.bind(this);
        this.recognition.onerror = this.onerror.bind(this);
        this.recognition.onspeechstart = this.onspeechstart.bind(this);
        this.recognition.onresult = this.onresult.bind(this);
    }

    get game() {
        return this._game;
    }

    get board() {
        return this._board;
    }

    buildSquares(columns, rows) {
        return columns.flatMap(column => rows.map(row => column.concat(row)));
    }

    buildMoves(squares, pieces) {
        return squares.flatMap(square => pieces.map(piece => piece.concat(` to ${square}`)));
    }

    start() {
        console.log('Starting Wizards Chess');
        this.recognition.start();
    }

    onend() {
        console.log('Restarting listener.');
        this.start();
    };

    onnomatch() {
        this.board.displayError('Not a valid Wizards Chess command');
    };

    onerror(event) {
        this.board.displayError('An error occurred.');
        console.error('Error occurred: ' + event.error);
    };

    onspeechstart() {
        this.board.clearError();
        console.log('Capturing voice input.');
    };

    onresult(event) {
        const speechResult = event.results[0][0].transcript;
        const cleanSpeechResult = speechResult.replace(/-/g,"").toLowerCase(); // Remove any hyphens
        console.log('Speech: ' + cleanSpeechResult);
        console.log('Confidence: ' + event.results[0][0].confidence);

        // Check if game is over
        if (this.game.game.game_over()) {
            return this.board.displayError('The game is over.');
        }

        // Check to make sure its our (white) turn
        if (this.game.game.turn() !== 'w') {
            return this.board.displayError('It is not your turn. Wait for black to move.');
        }

        // Check to make sure its a valid speech input (based on all possible inputs, not current board).
        const move = this.moves.find(move => move === cleanSpeechResult);
        if (!move) {
            return this.board.displayError('Not a valid move.');
        }

        console.log('Valid move. Trying move: ' + move);
        this.handleMove(move);
    };

    handleMove(move) {
        console.log(this.game.game.moves());
        console.log('Your move: ' + move.slice(-2));

        const gameMove = this.game.game.move(move.slice(-2));

        // Determine if move is valid based on current board position
        if (gameMove === null) {
            return this.board.displayError('Not a valid move.');
        }

        this.board.board.position(this.game.game.fen());

        // Handle opponent move
        window.setTimeout(() => {
            this.game.makeRandomMove(this.board.board);
        }, 2000);
    }
}

export default WizardsChess;
