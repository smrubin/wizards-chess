import WizardsChess from "../src/WizardsChess";
import ChessEngine from "../src/ChessEngine";
import Board from "../src/Board";

class WizardsChessPuzzle extends WizardsChess {
    constructor() {
        super();
        this._game = new ChessEngine(); // Handles the engine
        this._board = new Board(this.getStartPosition()); // Handles the display

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
        this.phrase = 'Knight to H3';
        const grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + this.phrase + ' ;';
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

    getStartPosition() {
        return {
            f8: 'bR', // Hermione
            h8: 'bK',
            b7: 'bP',
            c7: 'wN',
            e7: 'wR',
            g7: 'bP',
            h7: 'bP',
            b6: 'wP',
            c6: 'bB',
            a5: 'bN',
            e5: 'wP',
            g5: 'bN', // Ron
            h4: 'wN',
            a3: 'bB', // Harry
            c3: 'wQ',
            h2: 'wP',
            b1: 'wR',
            g1: 'wK'
        };
    }

    onresult(event) {
        const speechResult = event.results[0][0].transcript;
        console.log(speechResult);
        console.log('Confidence' + event.results[0][0].confidence);

        if(speechResult.toLowerCase() === this.phrase.toLowerCase()) {
            return this.handleMove();
        }

        return this.board.displayError('Not the magical move.');
    }

    handleMove(move) {
        this.recognition.onend = function(){}; // Stop constant restarting of listening
        this.recognition.abort();

        const knight = $('.square-g5 > img');

        knight.animate({top: "200%"}, 2000).animate({left: "100%"}, 2000, function() {
            $('.game').fadeOut(800);
            $('.success').fadeIn(800).delay(500);

            const video = document.getElementById('success-video');

            video.addEventListener('ended', function(e) {
                $('.success-message').fadeIn();
            },false);

            video.play();
        });
    }
}

export default WizardsChessPuzzle;
