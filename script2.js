document.addEventListener('DOMContentLoaded', function() {
    // Get modal element and close button
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
  
    // Add a 2-second delay before displaying the modal
    setTimeout(() => {
      // Display modal with a fade-in effect
      modal.classList.add('fade-in');
      modal.style.display = 'block';
    }, 2000);
  
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
