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
  if (remainingAttempts <= 0) {
    statusDisplay.textContent = `Game Over! The word was "${chosenWord}".`;
  } else if (!document.getElementById("wordDisplay").textContent.includes("_")) {
    statusDisplay.textContent = "Congratulations! You guessed the word!";
  } else {
    statusDisplay.textContent = `Remaining Attempts: ${remainingAttempts}`;
  }
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter) || remainingAttempts <= 0) return;

  guessedLetters.push(letter);
  if (!chosenWord.includes(letter)) {
    remainingAttempts--;
  }
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
});
