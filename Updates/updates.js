// List of updates
const updates = [
  {
    title: "New Game Added: Hangman",
    content: "We are excited to announce the addition of the Hangman game to our website. Give it a try and test your vocabulary skills!",
    date: "2025-04-20",
  },
  {
    title: "UI Improvements",
    content: "We've updated the user interface for a cleaner and more modern look across all games. Let us know what you think!",
    date: "2025-04-15",
  },
  {
    title: "Bug Fixes",
    content: "Several bugs in the Sudoku game have been fixed for a smoother gameplay experience.",
    date: "2025-04-10",
  },
];

// Function to load updates into the page
function loadUpdates() {
  const container = document.getElementById("updates-container");

  updates.forEach((update) => {
    // Create the update item element
    const updateItem = document.createElement("div");
    updateItem.className = "update-item";

    // Add title
    const title = document.createElement("h2");
    title.textContent = update.title;
    updateItem.appendChild(title);

    // Add content
    const content = document.createElement("p");
    content.textContent = update.content;
    updateItem.appendChild(content);

    // Add date
    const date = document.createElement("div");
    date.className = "date";
    date.textContent = `Posted on: ${update.date}`;
    updateItem.appendChild(date);

    // Append the update item to the container
    container.appendChild(updateItem);
  });
}

// Load updates when the page loads
window.onload = loadUpdates;
