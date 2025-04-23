// 🔤 Word list: Add more valid 5-letter words here
const wordList = [
  "apple", "grape", "peach", "lemon", "mango", "berry", "melon", "plums", "guava", "banjo"
];

// 🎯 Pick a random word from the list
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];

const maxGuesses = 6;
let currentRow = 0;

const board = document.getElementById("game-board");

// Build the board
for (let i = 0; i < maxGuesses; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < 5; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    row.appendChild(cell);
  }
  board.appendChild(row);
}

function submitGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.toLowerCase();

  if (guess.length !== 5) {
    showMessage("Enter a 5-letter word!");
    return;
  }

  if (!wordList.includes(guess)) {
    showMessage("Not in word list!");
    return;
  }

  const row = board.children[currentRow];
  const letters = row.children;

  const secretLetterCount = {};
  for (const letter of secretWord) {
    secretLetterCount[letter] = (secretLetterCount[letter] || 0) + 1;
  }

  // First pass: mark correct positions
  for (let i = 0; i < 5; i++) {
    letters[i].textContent = guess[i];
    if (guess[i] === secretWord[i]) {
      letters[i].classList.add("correct");
      secretLetterCount[guess[i]]--;
    }
  }

  // Second pass: mark present (right letter, wrong spot)
  for (let i = 0; i < 5; i++) {
    if (guess[i] !== secretWord[i]) {
      if (secretWord.includes(guess[i]) && secretLetterCount[guess[i]] > 0) {
        letters[i].classList.add("present");
        secretLetterCount[guess[i]]--;
      } else {
        letters[i].classList.add("absent");
      }
    }
  }

  if (guess === secretWord) {
    showMessage("🎉 You guessed it!");
    disableInput();
    return;
  }

  currentRow++;
  input.value = "";

  if (currentRow === maxGuesses) {
    showMessage(`💀 Game Over! The word was "${secretWord.toUpperCase()}".`);
    disableInput();
  }
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

function disableInput() {
  document.getElementById("guess-input").disabled = true;
}
