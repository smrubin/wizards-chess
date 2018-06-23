(function() {

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
        $('.error').html('This is Wizard\'s Chess');
        return false;
    };

    var wizardBoard = ChessBoard('wizard-board', {
        position: initPosition,
        draggable: true,
        onDragStart: onDragStart
    });

    // setup new event for voice activation and trigger piece moving in correct

    // hook up erorr and success responses, with sound and then final page

})();
