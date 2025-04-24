document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("sudoku-board");

  // Generate the Sudoku board
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    board.appendChild(input);
  }

  // Solve button functionality
  document.getElementById("solve").addEventListener("click", () => {
    alert("Solve functionality not implemented yet!");
  });

  // Reset button functionality
  document.getElementById("reset").addEventListener("click", () => {
    document.querySelectorAll("#sudoku-board input").forEach(input => input.value = "");
  });
});
