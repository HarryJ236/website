// Hangman Game Logic
const words = ["javascript", "hangman", "developer", "github", "coding"];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingAttempts = 6;

function displayWord() {
  const wordDisplay = document.getElementById("wordDisplay");
  wordDisplay.textContent = chosenWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function updateStatus() {
  const statusDisplay = document.getElementById("statusDisplay");
  const restartButton = document.getElementById("restartButton");

  if (remainingAttempts <= 0) {
    statusDisplay.textContent = `Game Over! The word was "${chosenWord}".`;
    disableAllButtons();
    restartButton.style.display = "block";
  } else if (!document.getElementById("wordDisplay").textContent.includes("_")) {
    statusDisplay.textContent = "Congratulations! You guessed the word!";
    disableAllButtons();
    restartButton.style.display = "block";
  } else {
    statusDisplay.textContent = `Remaining Attempts: ${remainingAttempts}`;
  }
}

function handleGuess(letter) {
  if (
    guessedLetters.includes(letter) ||
    remainingAttempts <= 0 ||
    document.getElementById("wordDisplay").textContent.indexOf("_") === -1
  ) {
    return; // Ignore input when the game is over or the letter is already guessed
  }

  guessedLetters.push(letter);
  if (!chosenWord.includes(letter)) {
    remainingAttempts--;
  }
  displayWord();
  updateStatus();
}

function disableAllButtons() {
  const buttons = document.querySelectorAll("#buttonsContainer button");
  buttons.forEach((button) => (button.disabled = true));
}

function handleKeyboardInput(event) {
  const letter = event.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) {
    handleGuess(letter);
  }
}

function restartGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  remainingAttempts = 6;

  const buttons = document.querySelectorAll("#buttonsContainer button");
  buttons.forEach((button) => (button.disabled = false));

  const restartButton = document.getElementById("restartButton");
  restartButton.style.display = "none";

  displayWord();
  updateStatus();
}

document.addEventListener("DOMContentLoaded", () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const buttonsContainer = document.getElementById("buttonsContainer");

  alphabet.forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => handleGuess(letter);
    buttonsContainer.appendChild(button);
  });

  displayWord();
  updateStatus();

  // Add keyboard event listener
  document.addEventListener("keydown", handleKeyboardInput);

  // Add Restart Button
  const restartButton = document.createElement("button");
  restartButton.id = "restartButton";
  restartButton.textContent = "Restart Game";
  restartButton.style.display = "none";
  restartButton.onclick = restartGame;
  document.body.appendChild(restartButton);
});
