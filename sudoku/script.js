import puzzles from './puzzles.js';

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("sudoku-board");
  const timerElement = document.getElementById("timer");
  const statusElement = document.getElementById("game-status");
  let timerInterval;

  const startTimer = () => {
    let seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
      const secs = String(seconds % 60).padStart(2, '0');
      timerElement.textContent = `Time: ${mins}:${secs}`;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const loadPuzzle = (puzzle) => {
    const inputs = document.querySelectorAll("#sudoku-board input");
    inputs.forEach((input, i) => {
      const value = puzzle[i];
      input.value = value !== "0" ? value : "";
      input.disabled = value !== "0";
    });
    stopTimer();
    timerElement.textContent = "Time: 00:00";
    statusElement.textContent = "";
    startTimer();
  };

  const getBoardValues = () => {
    const inputs = document.querySelectorAll("#sudoku-board input");
    return Array.from(inputs).map(input => parseInt(input.value) || 0);
  };

  const setBoardValues = (values) => {
    const inputs = document.querySelectorAll("#sudoku-board input");
    inputs.forEach((input, i) => {
      input.value = values[i] || "";
    });
  };

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row * 9 + i] === num || board[i * 9 + col] === num) {
        return false;
      }
      const startRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
      const startCol = Math.floor(col / 3) * 3 + (i % 3);
      if (board[startRow * 9 + startCol] === num) {
        return false;
      }
    }
    return true;
  };

  const solveSudoku = (board) => {
    for (let i = 0; i < 81; i++) {
      if (board[i] === 0) {
        for (let num = 1; num <= 9; num++) {
          const row = Math.floor(i / 9);
          const col = i % 9;
          if (isValid(board, row, col, num)) {
            board[i] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[i] = 0;
          }
        }
        return false;
      }
    }
    return true;
  };

  const checkWin = () => {
    const boardValues = getBoardValues();
    const isWin = solveSudoku([...boardValues]);
    statusElement.textContent = isWin ? "You Win!" : "You Lose!";
    statusElement.className = isWin ? "win" : "lose";
    stopTimer();
  };

  const handleArrowKeys = (e) => {
    const inputs = Array.from(document.querySelectorAll("#sudoku-board input"));
    const currentIndex = inputs.indexOf(document.activeElement);
    if (currentIndex !== -1) {
      let nextIndex;
      switch (e.key) {
        case 'ArrowUp':
          nextIndex = currentIndex - 9;
          break;
        case 'ArrowDown':
          nextIndex = currentIndex + 9;
          break;
        case 'ArrowLeft':
          nextIndex = currentIndex - 1;
          break;
        case 'ArrowRight':
          nextIndex = currentIndex + 1;
          break;
      }
      if (nextIndex >= 0 && nextIndex < 81) {
        inputs[nextIndex].focus();
      }
    }
  };

  // Generate the Sudoku board
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.dataset.index = i;
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      if (!/^[1-9]$/.test(value)) {
        e.target.value = "";
      }
    });
    board.appendChild(input);
  }

  document.getElementById("solve").addEventListener("click", () => {
    checkWin();
  });

  document.getElementById("reset").addEventListener("click", () => {
    const selectedPuzzle = document.getElementById("puzzle-selector").value;
    loadPuzzle(puzzles[selectedPuzzle]);
  });

  document.getElementById("puzzle-selector").addEventListener("change", (event) => {
    const selectedPuzzle = event.target.value;
    loadPuzzle(puzzles[selectedPuzzle]);
  });

  document.addEventListener("keydown", handleArrowKeys);

  // Load the first puzzle at the start
  loadPuzzle(puzzles[0]);
});
