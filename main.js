/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// catch selectors
const startButton = document.querySelector(".start");
const levelNameSpan = document.querySelector(".message .lvl");
const secondsSpan = document.querySelector(".message .seconds");
const theWord = document.querySelector(".the-word");
const upComingWords = document.querySelector(".upcoming-words");
const input = document.querySelector(".input");
const timeLeftSpan = document.querySelector(".time span");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finishMessage = document.querySelector(".finish");
// select the show scores screen and elements
const seeScoreButton = document.querySelector(".see-scores");
const seeScoresScreen = document.querySelector(".scores-screen");
const closeScoresScreenButton = document.querySelector(".scores-screen button");
const scoreDiv = document.querySelector(".scores-screen div");
// select the radio check box's
const radios = document.getElementsByName("radio");

// array of all data
const allWords = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "omar",
  "ali",
  "palestine",
  "syria",
  "iraq",
  "free palestine",
];

// array of easy words
const easyWords = allWords.filter((word) => word.length < 5);
// array of normal words
const normalWords = allWords.filter((word) => {
  return word.length >= 5 && word.length < 10;
});
// array of hard words
const hardWords = allWords.filter((word) => word.length >= 10);

// Array Of  Words
let words = [];

// settting levels
const lvls = {
  easy: 5,
  normal: 3,
  hard: 2,
};

startButton.addEventListener("click", () => {
  // check the choosn level
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      if (radios[i].dataset.level === "easy") {
        // spread the easy word array in the words array
        words = [...easyWords];
        // setting the total array length or words cuz it will change depand on level
        scoreTotal.innerHTML = words.length;
      } else if (radios[i].dataset.level === "normal") {
        // spread the normal word array in the words array
        words = [...normalWords];
        // setting the total array length or words cuz it will change depand on level
        scoreTotal.innerHTML = words.length;
      } else {
        // spread the hard word array in the words array
        words = [...hardWords];
        // setting the total array length or words cuz it will change depand on level
        scoreTotal.innerHTML = words.length;
      }
    }
  }
});

// start game
startButton.addEventListener("click", () => {
  startButton.remove();
  input.focus();
  // generate word function
  genWords();
});

// the radio checker to set the level of the game

function genWords() {
  // set level
  let level;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      level = radios[i].dataset.level;
    }
  }
  // set the wait time in seconds
  let LevelSeconds = lvls[level];

  // setting level name + seconds
  levelNameSpan.innerHTML = level;
  secondsSpan.innerHTML = LevelSeconds;
  timeLeftSpan.innerHTML = LevelSeconds;

  // disable paste event
  input.onpaste = () => false;

  // get random word from the array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get random word index
  let randomWordIndex = words.indexOf(randomWord);
  // remove the word from the array to don't show it agine
  words.splice(randomWordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // empty the upcoming words
  upComingWords.innerHTML = "";
  // loop throwh words array and create a div foreach word in it
  words.forEach((word) => {
    // create the main div
    const div = document.createElement("div");
    div.innerHTML = word;
    // append the div to the upcoming words
    upComingWords.append(div);
  });
  // call play function
  startPlay(LevelSeconds);
}

function startPlay(LevelSeconds) {
  // reset the time left every word gen
  timeLeftSpan.innerHTML = LevelSeconds;
  let start = setInterval(() => {
    if (timeLeftSpan.innerHTML === "0") {
      // stop timer
      clearInterval(start);
      // compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // empty the input value
        input.value = "";
        // increace score
        scoreGot.innerHTML++;
        // call the genwords function to play agine
        if (words.length > 0) {
          // call genword function
          genWords();
        } else {
          // disable the input box
          input.setAttribute("disabled", true);
          // save the score in local storage
          saveData();
          // if the user won
          let span = document.createElement("span");
          span.className = "good";
          span.innerHTML = "congrats! you win";
          // create a restart button
          let restart = document.createElement("button");
          restart.className = "restart";
          restart.innerHTML = "Restart";
          finishMessage.append(span);
          finishMessage.append(restart);
          // click the button to restart
          restart.addEventListener("click", () => {
            location.reload();
          });
          // remove upcoming words box
          upComingWords.remove();
        }
      } else {
        // disable the input box
        input.setAttribute("disabled", true);
        // remove upcoming words box
        upComingWords.remove();
        // save the score in local storage
        saveData();
        let span = document.createElement("span");
        span.className = "bad";
        span.innerHTML = "game over";
        // create a restart button
        let restart = document.createElement("button");
        restart.className = "restart";
        restart.innerHTML = "Restart";
        finishMessage.append(span);
        finishMessage.append(restart);
        // click the button to restart
        restart.addEventListener("click", () => {
          location.reload();
        });
      }
    } else {
      timeLeftSpan.innerHTML--;
    }

    // click enter to test the word and not wait for the time until it end
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        timeLeftSpan.innerHTML = "0";
      }
    });
  }, 1000);
}

function saveData() {
  // make a var have the current date and set the local storag item depend on this day
  let day = `${new Date().getDate()}/${new Date().getMonth() + 1}`;
  // set in local storage score depand on day
  localStorage.setItem(day, scoreGot.innerHTML);
  // run the show score function on win or lose
}

function seeScores() {
  // loop throh local storage items
  for (let i = 0; i < localStorage.length; i++) {
    const mainDiv = document.createElement("div");
    mainDiv.className = "score-value";
    const span = document.createElement("span");
    span.innerHTML = `your last score in ${localStorage.key(
      i
    )} is ${localStorage.getItem(localStorage.key(i))}`;
    mainDiv.append(span);
    // append the main div to the show score screen
    seeScoresScreen.append(mainDiv);
  }
  // hundle the see score button click event
  seeScoreButton.addEventListener("click", () => {
    seeScoresScreen.classList.add("after-score");
    // add the class after open the scores screen
    document.querySelector(".game").classList.add("game-on-score-button-click");
  });
  // hudle the close score screen button click event
  closeScoresScreenButton.addEventListener("click", () => {
    seeScoresScreen.classList.remove("after-score");
    // remove the class after closing the scores screen
    document
      .querySelector(".game")
      .classList.remove("game-on-score-button-click");
  });
}

// run the seeScores function
seeScores();
