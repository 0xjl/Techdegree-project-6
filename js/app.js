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
    console.log(letterChecked);
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
  console.log(letters);
  console.log(show);
  if (letters.length === show.length) {
    overlay.classList.add("win");
    overlay.style.display = "flex";
    overlay.children[0].textContent = "SUCCESS!";
    overlay.children[1].textContent = "Restart";
  } else if (missed >= 5) {
    overlay.classList.add("lose");
    overlay.style.display = "flex";
    overlay.children[0].textContent = "FAILURE!";
    overlay.children[1].textContent = "Restart?";
  }
}
