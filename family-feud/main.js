$(document).ready(function () {

    var audioBell, audioBuzzer,
        sum = 0,
//        teamScores = JSON.parse(localStorage.getItem('scores')) || {
//            teamA: 0,
//            teamB: 0
//        },
        strikeCount = 0,
        strike = '<span class="wrong">X</span>',
        strikeCountDisplay = $('#strike-count'),
        wrongDisplay = $('#wrong'),
        strikesDisplay = $('#strikesDisplay');
//        spanTeamAScore = $("#teamAScore"),
//        spanTeamBScore = $("#teamBScore"),
//        btnTeamAWins = $("#teamAWins"),
//        btnTeamBWins = $("#teamBWins");

    var init = function () {
//        window.localStorage.setItem('scores', JSON.stringify(teamScores));

        // setup audio files
        audioBell = document.createElement('audio');
        audioBell.setAttribute('src', 'media/ff-clang.wav');
        audioBell.setAttribute('autoplay', 'autoplay');

        audioBuzzer = document.createElement('audio');
        audioBuzzer.setAttribute('src', 'media/ff-strike2.wav');
        audioBuzzer.setAttribute('autoplay', 'autoplay');

        // set team scores
//        spanTeamAScore.text(JSON.parse(localStorage.getItem('scores')).teamA);
//        spanTeamBScore.text(JSON.parse(localStorage.getItem('scores')).teamB);

        $('#rotating-answers').find('.active').on('click',
            function () {
                var answer = $(this).find('.answer');
                if (!answer.hasClass('flipped')) {
                    answer.addClass('flipped');
                    audioBell.play();
                    sumScores($(this).data("score"));
                }
            });

        $('#strike').on('click', function () {
            if (strikeCount < 2) {
                strikeCount++;
                strikeCountDisplay.text(strikeCount);
                wrongDisplay.append(strike);
                strikesDisplay.append(strike);
                audioBuzzer.play();
                wrongDisplay.fadeIn('fast');
                setTimeout(function () {
                    wrongDisplay.fadeOut('fast');
                    strikesDisplay.fadeIn('fast');
                }, 1500);
            }
        });

        $('#resetStrikes').on('click', function () {
            strikeCount = 0;
            strikeCountDisplay.text(strikeCount);
            wrongDisplay.text('');
            strikesDisplay.text('');
            strikesDisplay.fadeOut('fast');
        });

//        btnTeamAWins.on('click', function () {
//            sumTeamScores('A');
//        });
//
//        btnTeamBWins.on('click', function () {
//            sumTeamScores('B');
//        });


    };

    var sumScores = function (score) {
        sum += score
        $('#score').text(sum);
    };

//    var sumTeamScores = function (winner) {
//        if (winner === 'A') {
//            teamScores.teamA = sum;
//            localStorage.setItem('scores', JSON.stringify(teamScores));
//            spanTeamAScore.text(JSON.parse(localStorage.getItem('scores')).teamA);
//        } else if (winner === 'B') {
//            teamScores.teamB = sum;
//            localStorage.setItem('scores', JSON.stringify(teamScores));
//            spanTeamBScore.text(JSON.parse(localStorage.getItem('scores')).teamB);
//        }
//    };

    // Initialize
    init();
});