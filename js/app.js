/* GLOBAL VARIABLES */
const overlay = document.getElementById("overlay");
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

/* TRACK PLAYER LIVES */
let missed = 0;

/* START THE GAME */
startGame.addEventListener("click", () => {
  let restart = startGame.textContent;
  overlay.style.display = "none";
  if (restart === "Restart?") {
    resetGame();
  }
});

/* PICKS A RANDOM STRING AND CONVERTS IT INTO AN ARRAY OF INDIVIDUAL CHARACTERS */
function getRandomPhraseAsArray(arr) {
  const random = Math.floor(Math.random() * phrases.length);
  const randomPhrase = arr[random];
  const charArray = randomPhrase.split("");
  return charArray;
}

/* DISPLAYS ANY ARRAY PASSED TO IT */
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

/* CHECKS IF LETTER OF CHOSEN BUTTON IS FOUND AND THEN DISPLAYS IT */
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

/* CHECKS IF ALL LETTERS OF THE PHRASE ARE SHOWN */
function checkWin() {
  const show = document.getElementsByClassName("show");
  const letters = document.getElementsByClassName("letter");
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
  overlay.className = "start";
  listItem.innerHTML = "";
  missed = 0;

  /* RESETS THE HEARTS */
  for (let i = 0; i < tries.length; i++) {
    tries[i].firstElementChild.src = "images/liveHeart.png";
  }

  /* RESETS LI */
  for (let i = 0; i < li.length; i++) {
    li[i].className = "";
    li[i].textContent = "";
  }

  /* RESETS THE CHOSEN KEYBOARD KEYS */
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "";
    buttons[i].disabled = false;
  }

  /* ADDS NEW PHRASE TO DISPLAY */
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}
