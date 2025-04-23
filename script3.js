let secretWord = "";
let wordList = [];
const maxGuesses = 6;
let currentRow = 0;

const board = document.getElementById("game-board");

// Fetch words from file
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
    wordList = text.trim().split('\n').map(word => word.toLowerCase());
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];
    setupBoard();
  })
  .catch(err => {
    console.error("Failed to load word list:", err);
    showMessage("Failed to load words.");
  });

function setupBoard() {
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

  for (let i = 0; i < 5; i++) {
    letters[i].textContent = guess[i];
    if (guess[i] === secretWord[i]) {
      letters[i].classList.add("correct");
      secretLetterCount[guess[i]]--;
    }
  }

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
