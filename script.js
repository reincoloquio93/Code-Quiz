// create variables to reference all DOM elements we're working with
var timeLeftEl = document.querySelector("#time-left");
// time-left
var startScreenEl = document.querySelector("#start-screen");
// start game button
var startGameBtnEl = document.querySelector("#start-game-btn");
// start screen
var quizContentEl = document.querySelector("#quiz-content");
// quiz content (event delegation. event listener attach to this)
var postGameEl = document.querySelector("#post-game-screen");
// post-game screen
var userScoreEl = document.querySelector("#user-score");
// user-score
var playAgainBtnEl = document.querySelector("#play-again-btn");
// play again-btn
var currentQuestionIndex = 0;

// create variables for game logic
var timerIntervalId;
// timerIntervalId
var score = 0;

// score
// secondsLeft
var secondsLeft = questions.length * 10;
var intervalRunning = false

// create function to start game
function startGame() {
    secondsLeft = questions.length * 10;
    // set seconds left variable to starting time (300 seconds = 5 minutes)
    timeLeftEl.textContent = secondsLeft;
    // write seconds left to the page
    userScoreEl.value = userScoreEl.defaultValue;

    // reset score to 0
    // write score to the page (optional)
    // set timer interval to setInterval function that decrements secondsLeft every second
    if (!intervalRunning) {
        intervalRunning = true;
        timerIntervalId = setInterval(function () {
            secondsLeft--;
            timeLeftEl.textContent = secondsLeft
            console.log(secondsLeft)
            if (secondsLeft === 0) {

                stopGame();
            }
        }, 1000);
    }


    // display first question
    displayQuestions(0);
}

// create function to display a question and possible choices
function displayQuestions(questionIndex) {
    if (questionIndex === questions.length) {
        // check if questionIndex in questions array doesn't exist
        return stopGame();
        // stop game weve hit the last question
    }
    var currentQuestion = questions[questionIndex];
    // initialize question text variable
    var titleEl = document.getElementById("question-title");
    // get questions[questionIndex]
    titleEl.textContent = currentQuestion.questions;
    // print question to the page
    var choicesEl = document.getElementById("choices");
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("value", choice);
        choiceButton.textContent = i + 1 + ". " + choice;
        choiceButton.onclick = questionClick;
        choicesEl.appendChild(choiceButton);
    });
    // loop through choices and print out choices to the page (make them buttons)
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        alert("Wrong Answer!");
    } else {
        alert("You're Right!");
        score++;
    }
    currentQuestionIndex++;
    displayQuestions(currentQuestionIndex);
}
// create function to handle user's answering

function stopGame() {
    console.log("stopGame");
    intervalRunning = false;
    clearInterval(timerIntervalId)
    quizContentEl.setAttribute("class", "hide");
    postGameEl.removeAttribute("class");
    userScoreEl.textContent = score;
}

// create a function to stop the game (answering all the questions or time has run out)
// clearInterval() to stop the timer
// hide quiz-content element
// show post-game-screen
// print out user score
function playAgain() {
    postGameEl.setAttribute("class", "hide");
    quizContentEl.removeAttribute("class");

    startGame();
}
// start game button (for starting the game)

startGameBtnEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        startScreenEl.setAttribute("class", "hide");
        // hide start-screen element && post-game-screen
        quizContentEl.removeAttribute("class");
        startGame();
    }
});

// add event listeners
startGameBtnEl.addEventListener("click", startGame);
quizContentEl.addEventListener("click", function (event) {
    event.preventDefault();
});
// play again button
playAgainBtnEl.addEventListener("click", playAgain);
