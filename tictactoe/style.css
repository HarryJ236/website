let currentPlayer = "X";
let board = Array(9).fill(null);
let gameMode = null;
let scoreX = 0;
let scoreO = 0;

const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const boardDiv = document.getElementById("board");
const gameModeDiv = document.getElementById("game-mode");
const resetButton = document.getElementById("reset-button");
const scoreXSpan = document.getElementById("score-x");
const scoreOSpan = document.getElementById("score-o");

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes(null) ? null : "Draw";
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);

  if (!board[index]) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      if (winner === "X") scoreX++;
      if (winner === "O") scoreO++;
      updateScoreboard();
      statusDiv.textContent = winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
      boardDiv.removeEventListener("click", handleCellClick);
      resetButton.style.display = "block";
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameMode === "robot" && currentPlayer === "O") {
      robotMove();
    }
  }
}

function robotMove() {
  const emptyCells = board.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";

  const winner = checkWinner();
  if (winner) {
    if (winner === "X") scoreX++;
    if (winner === "O") scoreO++;
    updateScoreboard();
    statusDiv.textContent = winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`;
    boardDiv.removeEventListener("click", handleCellClick);
    resetButton.style.display = "block";
    return;
  }

  currentPlayer = "X";
}

function updateScoreboard() {
  scoreXSpan.textContent = `Player X: ${scoreX}`;
  scoreOSpan.textContent = `Player O: ${scoreO}`;
}

function resetGame() {
  board = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
  });
  currentPlayer = "X";
  statusDiv.textContent = gameMode === "robot" ? "Player X's Turn" : "Player X's Turn";
  resetButton.style.display = "none";
  boardDiv.addEventListener("click", handleCellClick);
}

document.getElementById("player-vs-player").addEventListener("click", () => {
  gameMode = "player";
  gameModeDiv.style.display = "none";
  boardDiv.style.display = "grid";
  resetButton.style.display = "block";
  statusDiv.textContent = "Player X's Turn";
});

document.getElementById("player-vs-robot").addEventListener("click", () => {
  gameMode = "robot";
  gameModeDiv.style.display = "none";
  boardDiv.style.display = "grid";
  resetButton.style.display = "block";
  statusDiv.textContent = "Player X's Turn";
});

resetButton.addEventListener("click", resetGame);
boardDiv.addEventListener("click", handleCellClick);
