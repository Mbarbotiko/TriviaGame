$(document).ready(function () {
    var triviaQuestions = [{//variable/array of objects, inside of object there are key value pairs, key =question: inside of an object that is called a key.  an object is a list of key balue pairs separated by commas, the keys are called properties is the whole thing a property or key research this.
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
    }];

    //setting up object triviaQuestions with properties like question and an array of answers as well as a numerical key(index) that refers to the correct answer in the array.

    var pictureArray = ['mario2', 'sonic', 'punchout3', 'pacman', 'streetfighter', 'metalgear2', 'nbajam', 'pokemon', 'zelda'];
    //setting up an array to cycle through in order with the questions to show the answer page letting user know if they were right or wrong and showing them a picure as well as text of what the corret answer is.

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
    //setting up variables to be used throughout game

    var messages = {
        correct: "NICE!",
        incorrect: "WRONG!",
        timeOut: "OUT OF TIME!",
        gameEnd: "RESULTS",
        resultsGood: "Game on BRO!",
        resultsBad: "Have you been living under a rock? Try again!"

    }

    //setting up messages to the user if they got the question correct, incorrect ran out of time or the game has come to an end. (****maybe turn these into an array to cycle through so the user gets a different message each time?****)


    function newGame() {
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        newQuestion();
        $('#score').empty();
        $('#results').empty();
        music.play();

    }

    //creating a newgame function that will empty DIVs with specific ID's and reset the counters for the current question, correct and incorrect answers. At the end it will run the new Question function.

    function countdown() {
        seconds = 10;
        $('#timer').html('<p>Hurry Up!: ' + seconds + '</p>');
        answered = true;
        time = setInterval(showCountdown, 1000);//this is taking in two parameters

        //passing data is a argument, if you're recieveing data its a parameter.
    }

    //setting up a function that counts down from 10 seconds, the variable seconds is given a value of 10, the timer DIV is targeted and HTML is written into it with an h3 tag that tells the user the remaining amount of time.  Setting variable answered to true boolean because if the timer hasnt run out yet the user would have answered adding to the answered variable which shows user their results at the end. Giving variable a method of setInterval calling showCountdown function for 1 second which will run it every second.




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

    //setting up function ShowCountdown this function decreases the seconds from 10 by 1 using -- then targeting the timer div writes HTML that tells user the the time remaining has changed by that 1 second, this runs several times each second in the countdown function until it reaches 1 second then the if statement clears the time variable, shows that the user did not provide an answer because well time ran out, this logs it into the answered variable later to show user their results, then we hide the buttons and call the function answer page which tells the user what the correct answer was.



    $('#start').html('<button id=pushStart>START GAME</button>');
    $('#start').on('click', function () {
        $(this).hide();
        newGame();
        $('#instructions').hide();
        music.play();

    })

    //creating a button called pushstart to start the game, when clicked it hides itself and then calls the function new game.

    $('#startOver').html('<button id=startOver>START OVER</button>');
    $('#startOver').on('click', function () {
        $(this).hide();
        newGame();
    });

    $('#startOver').hide();

    //creating a button called startover to start the game over, when it is clicked it hides itself then calls the newgame function.  I hid this button, it will be shown later in the game once the user has reached the end.

    function newQuestion() {
        $('#message').empty();
        $('#picture').empty();
        $('#timer').show();
        $('#answer').empty();

        answered = true;
        //creating a function for a new question to be pulled from the triviaquestions object.  First it will make sure the divs that show at the end of the users choice the message, the correct answer the picture are cleared to make room for the following code below that calls for the next question.


        //selecting the question div from HTML to write the current question number the user is on added +1 otherwise it starts @ 0 and you cant be on question 0 in people speak.  The other number is drawn by the number of trivia questions we have length pulls the number from that list.


        $('.question').html('<p>' + triviaQuestions[currentQuestion].question + '</p>');//accessing array using [index of this array].question is how to access the object, then an array is in the object using index of the array.(template literals google this and learn es 6 syntax, what I am using is es 5 syntax)
        //using HTML to overwrite the last question (if there was a last one otherwise writing the first one)
        for (var i = 0; i < 4; i++) {
            var choices = $('<button type="button" class=" btn-light"></button>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }

        //setting up a loop that goes through the answer list index (all four answers) then set up a variable called choices to give it an attribute, class and to add text to the newly created buttons by appending the choices at the end to the div answerList.






        $('.thisChoice').on('click', function () {
            userChoice = $(this).data('index');
            clearInterval(time);
            answerPage();
            $('.btn-light').hide();
        });

        //clicking the class "this choice" which was assigned to all four of the items in the answer list creates a function that assigns the users click (variable userChoice)  the data of the index of the triviaQuestions answers. ClearnInterval selects time which is a variable determined below and clears

        countdown();
        //this calls the countdown function its nestled within the new question function so it only counts down during the screen in which a new question is presented.
    }





    function answerPage() {
        $('.thisChoice').empty();
        $('.question').empty();
        $('.btn-light').hide();
        $('#timer').hide();

        //this function empties everything that has been appended to these divs and hides all the content so we can display the final page of the game displaying the users results

        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];

        //setting a variable to the correct answer following path through the object to the answer which will then be added into the game using HTML method.


        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        $('#picture').append('<img src = "assets/images/' + pictureArray[currentQuestion] + '.jpg">');
        // $('#picture').append('<img id=border src = "assets/images/border.gif">');  working on auto overlay of images.

        //setting variable accessing the index of the right answer sets path to the answer in the object, then targets the picture div adds the picture using html method then picks the picture from the array created with the pictures and targets the current question so the correct picture is displayed


        if ((userChoice == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#message').html(messages.correct);
            //if else statement asks if users choice is the right answer and they answered  increase correct answer variable by 1 and display in the div message the string set to the correct variable set in the messages array
            soundYeah.play();
        } else if ((userChoice != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#answer').html('<p>The right answer is: </p>' + rightAnswerText);
            //ig the users choice does not match the right answer and they did answer show the incorrect message string set in the incorrect variable then show the user the correct answer in the correct answer div displaying text and the right answer targeted in the object with the variable rightAnswerText set up earlier.
            soundNo.play();
        } else {
            incorrectAnswer++;
            $('#message').html(messages.endTime);
            $('#answer').html('<p>The right answer is: </p>' + rightAnswerText);
            answered = true;
            soundNo.play();
            //if the user didnt answer add 1 to incorrect answer, show message set in variable end time, then display the correct answer.
        }

        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(endGame, 3000)
            //if the current question  reaches the last question wait 3 seconds then run the endGame function. -1 for length is to ensure that we stay on a question that exists in the object of triviaQuestions, if -1 was not in the statement it would skip ahead to a question that is not written into the object yet because the index of it starts with 0, so in the 2nd question the array would skip to the 3rd, the -1 keeps it on the second question.

        } else {
            currentQuestion++;
            setTimeout(newQuestion, 3000);
            //if its not on the last question go to the next question after 3 seconds.
        }




    }

    function resultsOfGame() {
        if (results > 79) {
            $('#results').html(messages.resultsGood);

        } else {
            $('#results').html(messages.resultsBad);
        }

        //function that says if the player didnt reach 80 or higher to display a message that makes fun of them, otherwise congratulates the player.



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
        //I cant find how to stop the music? .stop only affects animation will look another time when I update the game, for now it pauses at the end of the game and when a new game is started starts playing again where it left off.

    }








});

