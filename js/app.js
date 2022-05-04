/* GLOBAL VARIABLES */
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startGame = document.querySelector(".btn__reset");
const listItem = document.querySelector("#phrase ul");
const tries = document.querySelectorAll("li.tries");
let overlay = document.getElementById("overlay");

/* phrases array containing 5 different phrases as strings */
const phrases = [
  "too blessed to be stressed",
  "life is short",
  "you only live once",
  "time is gold",
  "never give up",
];

/* USER SCORE */
let missed = 0;

/* START THE GAME */
startGame.addEventListener("click", () => {
  let restart = startGame.textContent;
  overlay.style.display = "none";
  if (restart === "Restart?") {
    resetGame();
  }
});

/* Create a character array from a random array function. */
function getRandomPhraseAsArray(arr) {
  const random = Math.floor(Math.random() * phrases.length);
  const randomPhrase = arr[random];
  const charArray = randomPhrase.split("");
  return charArray;
}

/* SET THE GAME DISPLAY */
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.textContent = arr[i];
    if (li.textContent === " ") {
      li.classList.add("space");
    } else {
      li.classList.add("letter");
    }
    listItem.appendChild(li);
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

/* Function that accepts a letter as a parameter */
function checkLetter(letter) {
  const checkLetter = document.querySelectorAll(".letter");
  let foundLetter = null;
  for (let i = 0; i < checkLetter.length; i++) {
    if (checkLetter[i].textContent === letter) {
      checkLetter[i].classList.add("show");
      foundLetter = true;
    }
  }
  return foundLetter;
}

qwerty.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    e.target.className = "chosen";
    e.target.disabled = true;
    let letterChecked = checkLetter(e.target.textContent);
    if (letterChecked === null) {
      /* NOTE TO SELF: THIS MAY COME IN HANDY IN THE FUTURE */
      tries[missed].firstElementChild.src = "images/lostHeart.png";
      missed += 1;
      /* THIS END OF NOTE TO SELF */
    }
    checkWin();
  }
});

function checkWin() {
  const letters = document.getElementsByClassName("show");
  const show = document.getElementsByClassName("letter");
  if (letters.length === show.length) {
    overlay.classList.add("win");
    overlay.style.display = "flex";
    overlay.children[0].textContent = "SUCCESS!";
    overlay.children[1].textContent = "Restart?";
  } else if (missed >= 5) {
    overlay.classList.add("lose");
    overlay.style.display = "flex";
    overlay.children[0].textContent = "FAILURE!";
    overlay.children[1].textContent = "Restart?";
  }
}

/* EXCEEDS EXPECTATIONS REQUIREMENT: RESET THE GAME */

function resetGame() {
  const buttons = document.getElementsByTagName("button");
  const li = document.querySelectorAll("ul li");
  /* RESETS THE HEARTS */
  for (let i = 0; i < tries.length; i++) {
    tries[i].firstElementChild.src = "images/liveHeart.png";
  }
  /* RESETS YOUR LIVES */
  missed = 0;

  /* RESETS THE LIST ITEMS */
  for (let i = 0; i < li.length; i++) {
    li[i].className = "";
    li[i].textContent = "";
  }

  /* RESETS THE CHOSEN KEYBOARD KEYS */
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "";
    buttons[i].disabled = false;
  }
  /* CREATES A NEW PHRASE */
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}
