/* GLOBAL VARIABLES */
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startGame = document.querySelector(".btn__reset");
const listItem = document.querySelector("#phrase ul");
const tries = document.querySelectorAll("li.tries");

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
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
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
    let li = document.createElement("li");
    li.textContent = arr[i];
    if (arr[i] === " ") {
      li.className = "space";
    } else {
      li.className = "letter";
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
      checkLetter[i].className = "show";
      foundLetter = true;
    }
  }
  return foundLetter;
}

qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.className = "chosen";
    e.target.disabled = true;
    let letterChecked = checkLetter(e.target.textContent);
    if (letterChecked === null) {
      tries[missed].firstElementChild.src = "images/lostHeart.png";
      missed += 1;
    }
  }
});
