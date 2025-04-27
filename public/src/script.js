const words = ["tribo", "indio", "penas", "toras", "cauim", "cocar"];
const targetWord = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const gameBoard = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");

// Create game board
for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.classList.add("game-row");
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.classList.add("game-tile");
    row.appendChild(tile);
  }
  gameBoard.appendChild(row);
}

// Handle keyboard input
keyboard.addEventListener("click", (e) => {
  const key = e.target.closest(".key");
  if (!key || isGameOver) return;
  const keyValue = key.dataset.key;
  if (keyValue === "enter") {
    submitGuess();
  } else if (keyValue === "backspace") {
    deleteLetter();
  } else {
    addLetter(keyValue);
  }
});

// Handle physical keyboard input
document.addEventListener("keydown", (e) => {
  // Ignore keydown events if focused on input or textarea
  if (
    document.activeElement.tagName === "INPUT" ||
    document.activeElement.tagName === "TEXTAREA"
  ) {
    return;
  }
  if (isGameOver) return;
  const key = e.key.toLowerCase();
  if (key === "enter") {
    submitGuess();
  } else if (key === "backspace") {
    deleteLetter();
  } else if (/^[a-z]$/.test(key)) {
    addLetter(key);
  }
});

function addLetter(letter) {
  if (currentTile < 5 && currentRow < 6) {
    const tile = gameBoard.children[currentRow].children[currentTile];
    tile.textContent = letter.toUpperCase();
    tile.classList.add("filled");
    currentTile++;
  }
}

function deleteLetter() {
  if (currentTile > 0) {
    currentTile--;
    const tile = gameBoard.children[currentRow].children[currentTile];
    tile.textContent = "";
    tile.classList.remove("filled");
  }
}

function submitGuess() {
  if (currentTile !== 5) {
    alert("A palavra deve ter 5 letras!");
    return;
  }

  const guess = Array.from(gameBoard.children[currentRow].children)
    .map((tile) => tile.textContent.toLowerCase())
    .join("");

  // Check if guess is valid (simplified, assuming any 5-letter input is valid)
  if (guess.length !== 5) {
    alert("Digite uma palavra válida de 5 letras!");
    return;
  }

  // Update tile colors
  const rowTiles = gameBoard.children[currentRow].children;
  const targetArray = targetWord.split("");
  const guessArray = guess.split("");

  for (let i = 0; i < 5; i++) {
    const tile = rowTiles[i];
    if (guessArray[i] === targetArray[i]) {
      tile.classList.add("correct");
      updateKeyboard(guessArray[i], "correct");
    } else if (targetArray.includes(guessArray[i])) {
      tile.classList.add("present");
      updateKeyboard(guessArray[i], "present");
    } else {
      tile.classList.add("absent");
      updateKeyboard(guessArray[i], "absent");
    }
  }

  if (guess === targetWord) {
    alert("Parabéns! Você acertou a palavra!");
    isGameOver = true;
    return;
  }

  currentRow++;
  currentTile = 0;

  if (currentRow >= 6) {
    alert(`Fim de jogo! A palavra era ${targetWord.toUpperCase()}.`);
    isGameOver = true;
  }
}

function updateKeyboard(letter, state) {
  const key = keyboard.querySelector(`[data-key="${letter}"]`);
  if (key) {
    if (state === "correct") {
      key.classList.add("correct");
    } else if (state === "present" && !key.classList.contains("correct")) {
      key.classList.add("present");
    } else if (
      state === "absent" &&
      !key.classList.contains("correct") &&
      !key.classList.contains("present")
    ) {
      key.classList.add("absent");
    }
  }
}

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}
