document.addEventListener('DOMContentLoaded', function() {
    // Get modal element and close button
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');

    // Display modal when the page loads
    modal.style.display = 'block';

    // Close modal when close button is clicked
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
