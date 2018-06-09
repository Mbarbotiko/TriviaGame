$(document).ready(function () {
    var triviaQuestions = [{
        question: "This game featured two plumbers with impressive mustaches",
        answerList: ["Double Dragon", "Tale of Two Brothers", "Super Mario Bro's", "Bubble Bobble"],
        answer: 2
    }, {
        question: "He had a little buddy with 9 tails",
        answerList: ["Sonic the Hedghog", "Crash Bandicoot", "Kirby", "Conker's: Bad Fur Day"],
        answer: 0
    },
    {
        question: "Boxing game featuring a boxer who has exhibited mild cannabalism-like behavior during a fight",
        answerList: ["Boxing Duel", "Ready 2 Rumble", "Mike Tysons Punch Out", "Rocky"],
        answer: 2
    },
    {
        question: "Waka-Waka , but he doesnt look like Fozzy Bear",
        answerList: ["Muppet Race Mania", "Talespin", "Spyro the Dragon", "Pac-Man"],
        answer: 3
    },
    {
        question: "Hadouken!",
        answerList: ["Streets of Rage", "River City Ransom", "Street Fighter", "Mortal Combat"],
        answer: 2

    },
    {
        question: "A box + a bad guy=!",
        answerList: ["Duke Nukem", "Metal Gear Solid", "Doom", "Metroid"],
        answer: 1
    },
    {
        question: "He's on FIRE!",
        answerList: ["Tecmo Bowl", "Tony Hawks Pro Skater", "NBA Live", "NBA Jam"],
        answer: 3
    },
    {
        question: "Monsters that fit in your pocket",
        answerList: ["Pokemon", "Kirby", "Spyro the Dragon", "Rampage"],
        answer: 0
    },
    {
        question: "It's her name but everyone thinks its his",
        answerList: ["Final Fantasy", "Zelda", "Princess Peach", "Tekken"],
        answer: 1
    },
    {
        question: "Finish him!",
        answerList: ["Super Smash Bro's", "Fatal Fury", "Marvel vs Capcom", "Mortal Combat"],
        answer: 3
    }];


    var pictureArray = ['mario2', 'sonic', 'punchout3', 'pacman', 'streetfighter', 'metalgear2', 'nbajam', 'pokemon', 'zelda','mortalcombat'];


    var correctCount;
    var incorrectCount;
    var userChoice;
    var choices;
    var currentQuestion = 0;
    var correctAnswer;
    var incorrectAnswer;
    var answered;
    var seconds;
    var time;
    var percent;
    var results;
    var soundYeah = new Audio();
    soundYeah.src = "assets/sounds/yeah.mp3";
    var soundNo = new Audio();
    soundNo.src = "assets/sounds/ohno.mp3";
    var music = new Audio();
    music.src = "assets/sounds/battle.mp3"

    var messages = {
        correct: "NICE!",
        incorrect: "WRONG!",
        timeOut: "OUT OF TIME!",
        gameEnd: "RESULTS",
        resultsGood: "Game on BRO!",
        resultsBad: "Have you been living under a rock? Try again!"

    }

    function newGame() {
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        newQuestion();
        $('#score').empty();
        $('#results').empty();
        music.play();

    }

    function countdown() {
        seconds = 10;
        $('#timer').html('<p>Hurry Up!: ' + seconds + '</p>');
        answered = true;
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--;
        $('#timer').html('<p>Hurry Up!: ' + seconds + '</p>');
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            $('.btn-light').hide();
            answerPage();
        }
    }


    $('#start').html('<button id=pushStart>START GAME</button>');
    $('#start').on('click', function () {
        $(this).hide();
        newGame();
        $('#instructions').hide();
        music.play();

    })

    $('#startOver').html('<button id=startOver>START OVER</button>');
    $('#startOver').on('click', function () {
        $(this).hide();
        newGame();
    });

    $('#startOver').hide();

    function newQuestion() {
        $('#message').empty();
        $('#picture').empty();
        $('#timer').show();
        $('#answer').empty();

        answered = true;

        $('.question').html('<p>' + triviaQuestions[currentQuestion].question + '</p>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<button type="button" class=" btn-light"></button>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }


        $('.thisChoice').on('click', function () {
            userChoice = $(this).data('index');
            clearInterval(time);
            answerPage();
            $('.btn-light').hide();
        });

        countdown();

    }


    function answerPage() {
        $('.thisChoice').empty();
        $('.question').empty();
        $('.btn-light').hide();
        $('#timer').hide();


        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];

        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        $('#picture').append('<img src = "assets/images/' + pictureArray[currentQuestion] + '.jpg">');
        // $('#picture').append('<img id=border src = "assets/images/border.gif">');  working on auto overlay of images.

        if ((userChoice == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#message').html(messages.correct);

            soundYeah.play();
        } else if ((userChoice != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#answer').html('<p>The right answer is: </p>' + rightAnswerText);

            soundNo.play();
        } else {
            incorrectAnswer++;
            $('#message').html(messages.endTime);
            $('#answer').html('<p>The right answer is: </p>' + rightAnswerText);
            answered = true;
            soundNo.play();

        }

        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(endGame, 3000)

        } else {
            currentQuestion++;
            setTimeout(newQuestion, 3000);

        }

    }

    function resultsOfGame() {
        if (results > 79) {
            $('#results').html(messages.resultsGood);

        } else {
            $('#results').html(messages.resultsBad);
        }

    }
    function endGame() {
        percent = correctAnswer + incorrectAnswer;
        results = correctAnswer / percent * 100;
        $('.btn-light').hide();
        $('#timer').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#picture').empty();
        $('#score').html('<p>Your Score: ' + Math.round(results) + '%<p>');
        $('#startOver').show();
        resultsOfGame();
        music.pause();

    }


});

