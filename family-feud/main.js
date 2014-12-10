var audioBell, audioBuzzer, sum, strikeCount, strike, wrong;

$(document).ready(function () {
    //    audioEl = document.getElementById('sound');
    sum = 0;
    strikeCount = 0;
    strike = '<span class="wrong">X</span>'
    wrong = $('#wrong');



    //    var playBell = function () {
    //        ifr.src = 'media/ff-clang.wav';
    //    };
    //
    //    var playBuzzer = function () {
    //        ifr.src = 'media/ff-strike2.wav';
    //    };

    var setupAudio = function () {
        audioBell = document.createElement('audio');
        audioBell.setAttribute('src', 'media/ff-clang.wav');
        audioBell.setAttribute('autoplay', 'autoplay');

        audioBuzzer = document.createElement('audio');
        audioBuzzer.setAttribute('src', 'media/ff-strike2.wav');
        audioBuzzer.setAttribute('autoplay', 'autoplay');
    };

    var setupAnswers = function () {
        $('#rotating-answers').find('.active').on('click',
            function () {
                var answer = $(this).find('.answer');
                if (!answer.hasClass('flipped')) {
                    answer.addClass('flipped');
                    audioBell.play();
                    sumScores($(this).data("score"));
                }
            });
    };

    var setupBuzzers = function () {
        $('#strike').on('click', function () {
            if (strikeCount < 2) {
                strikeCount++;
                $('#strike-count').text(strikeCount);
                wrong.append(strike);
                audioBuzzer.play();
                wrong.fadeIn('fast');
                setTimeout(function () {
                    wrong.fadeOut('fast');
                }, 1500);
            }
        });

        $('#resetStrikes').on('click', function () {
            wrong.text = ' ';
            strikeCount = 0;
            $('#strike-count').text(strikeCount);
        });
    };


    var sumScores = function (score) {
        sum += score
        $('#score').text(sum);
    };

    setupAudio();
    setupAnswers();
    setupBuzzers();
});