// Get modal element and close button
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');

// Function to open modal when page loads
window.onload = () => {
    modal.style.display = 'block';
};

// Function to close modal when close button is clicked
closeButton.onclick = () => {
    modal.style.display = 'none';
};

// Function to close modal when clicking outside of it
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};