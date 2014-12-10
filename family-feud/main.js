var ifr, sum, strikeCount, strike, wrong;

$(document).ready(function () {
    ifr = document.getElementById('sound');
    sum = 0;
    strikeCount = 0;
    strike = '<span class="wrong">X</span>'
    wrong = $('#wrong');

    setUpAnswers();
    setUpBuzzers();
});

function playBell() {
    ifr.src = 'media/ff-clang.wav';
}

function playBuzzer() {
    ifr.src = 'media/ff-strike2.wav';
}

function setUpAnswers() {
    $('#rotating-answers').find('.active').on('click',
        function () {
            var answer = $(this).find('.answer');
            if (!answer.hasClass('flipped')) {
                answer.addClass('flipped');
                playBell();
                sumScores($(this).data("score"));
            }
        });
}

function setUpBuzzers() {
    $('#strike').on('click', function () {
        if (strikeCount < 2) {
            strikeCount++;
            $('#strike-count').text(strikeCount);
            wrong.append(strike);
            playBuzzer();
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
}


function sumScores(score) {
    sum += score
    $('#score').text(sum);
}