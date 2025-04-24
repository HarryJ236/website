// Selecting DOM elements
const addUpdateForm = document.getElementById('addUpdateForm');
const updatesContainer = document.getElementById('updatesContainer');

// Event listener for form submission
addUpdateForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get user input
    const title = document.getElementById('updateTitle').value.trim();
    const content = document.getElementById('updateContent').value.trim();

    // Validate input
    if (!title || !content) {
        alert('Please fill out both fields!');
        return;
    }

    // Add update to the list
    addUpdateToList(title, content);

    // Clear form fields
    addUpdateForm.reset();
});

// Function to add an update to the list
function addUpdateToList(title, content) {
    // Create the update item container
    const updateItem = document.createElement('div');
    updateItem.className = 'update-item';

    // Add title
    const updateTitle = document.createElement('div');
    updateTitle.className = 'update-title';
    updateTitle.textContent = title;

    // Add content
    const updateContent = document.createElement('div');
    updateContent.className = 'update-content';
    updateContent.textContent = content;

    // Append title and content to the update item
    updateItem.appendChild(updateTitle);
    updateItem.appendChild(updateContent);

    // Append the update item to the updates container
    updatesContainer.appendChild(updateItem);
}
