(function() {

    /**
     * 1) Setup and initialize the chessboard via chessboard.js
     */

    var initPosition = {
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

    var onDragStart = function() {
        $('.game-error').html('This is Wizard\'s Chess');
        return false;
    };

    var wizardBoard = ChessBoard('wizard-board', {
        position: initPosition,
        draggable: true,
        onDragStart: onDragStart
    });


    /**
     * 2) Add listeners for Web Speech API
     */

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

    var phrase = 'Knight to H3';
    var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        var speechResult = event.results[0][0].transcript;

        console.log(speechResult);

        if(speechResult === phrase) {
            handleSuccess();
        } else {
            handleError();
        }

        console.log('Confidence' + event.results[0][0].confidence);
    };

    recognition.onspeechend = function() {
        recognition.start();
    };

    recognition.onnomatch = function(event) {
        console.error('Command not recognizaed');
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ' + event.error);
    };

    function handleSuccess() {

        var knight = $('.square-g5 > img');

        knight.animate({top: "200%"}, 2000).animate({left: "100%"}, 2000, function() {
            $('.game').fadeOut(800);
            $('.success').fadeIn(800).delay(500);

            var video = document.getElementById('success-video');

            video.addEventListener('ended', function(e) {
                $('.success-message').fadeIn();
            },false);

            document.getElementById('success-video').play()
        });

    }

    function handleError() {
        $('.game-error').html('Not the right move. Try again.');
        recognition.start();
    }


    //todo:
    // keep persistent audio

})();
