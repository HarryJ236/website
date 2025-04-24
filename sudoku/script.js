// Import puzzles from puzzles.js
import puzzles from './puzzles.js';

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("sudoku-board");

  const loadPuzzle = (puzzle) => {
    const inputs = document.querySelectorAll("#sudoku-board input");
    inputs.forEach((input, i) => {
      const value = puzzle[i];
      input.value = value !== "0" ? value : "";
      input.disabled = value !== "0"; // Disable pre-filled cells
    });
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

  // Generate the Sudoku board
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.dataset.index = i;
    input.addEventListener("input", (e) => {
      const value = e.target.value;
      if (!/^[1-9]$/.test(value)) {
        e.target.value = ""; // Clear invalid input
      }
    });
    board.appendChild(input);

    // Add subgrid borders
    if ((i % 9 === 2 || i % 9 === 5) && i % 9 !== 8) {
      input.classList.add("subgrid-border");
    }
  }

  document.getElementById("solve").addEventListener("click", () => {
    const boardValues = getBoardValues();
    if (solveSudoku(boardValues)) {
      setBoardValues(boardValues);
    } else {
      alert("No solution exists!");
    }
  });

  document.getElementById("reset").addEventListener("click", () => {
    const selectedPuzzle = document.getElementById("puzzle-selector").value;
    loadPuzzle(puzzles[selectedPuzzle]);
  });

  document.getElementById("puzzle-selector").addEventListener("change", (event) => {
    const selectedPuzzle = event.target.value;
    loadPuzzle(puzzles[selectedPuzzle]);
  });

  // Load the first puzzle at the start
  loadPuzzle(puzzles[0]);
});
