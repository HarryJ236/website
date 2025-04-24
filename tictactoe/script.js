let currentPlayer = "X";
let board = Array(9).fill(null);
let gameMode = null;
let robotDifficulty = "easy"; // Default difficulty
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
  let moveIndex;

  if (robotDifficulty === "easy") {
    // Easy: Random movements
    const emptyCells = board.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
    moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  } else if (robotDifficulty === "medium") {
    // Medium: Attack and block semi-effectively
    moveIndex = findWinningMove("O") || findWinningMove("X") || getRandomMove();
  } else if (robotDifficulty === "hard") {
    // Hard: Perfect moves using Minimax
    moveIndex = findBestMove();
  }

  board[moveIndex] = "O";
  cells[moveIndex].textContent = "O";

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

function findWinningMove(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === null) return c;
    if (board[a] === player && board[c] === player && board[b] === null) return b;
    if (board[b] === player && board[c] === player && board[a] === null) return a;
  }

  return null;
}

function getRandomMove() {
  const emptyCells = board.map((value, index) => (value === null ? index : null)).filter(index => index !== null);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function findBestMove() {
  function minimax(newBoard, depth, isMaximizing) {
    const winner = checkWinner();
    if (winner === "X") return -10;
    if (winner === "O") return 10;
    if (!newBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "O";
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = "X";
          const score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
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
  robotDifficulty = prompt("Choose difficulty: easy, medium, or hard", "easy");
  gameModeDiv.style.display = "none";
  boardDiv.style.display = "grid";
  resetButton.style.display = "block";
  statusDiv.textContent = "Player X's Turn";
});

resetButton.addEventListener("click", resetGame);
boardDiv.addEventListener("click", handleCellClick);
