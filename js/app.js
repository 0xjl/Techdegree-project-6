/* GLOBAL VARIABLES */
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startGame = document.querySelector(".btn__reset");

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

startGame.addEventListener("click", () => {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
});
