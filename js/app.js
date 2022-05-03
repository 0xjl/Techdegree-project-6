/* GLOBAL VARIABLES */
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startGame = document.querySelector(".btn__reset");
const listItem = document.querySelector("#phrase ul");

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
