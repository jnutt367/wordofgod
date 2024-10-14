  
       document.addEventListener('DOMContentLoaded', function() {
        const booksContainer = document.getElementById("books");
    
        // Fetch the JSON data
        fetch('json/bible_data.json')
            .then(response => response.json())
            .then(data => {
                // Iterate over the books array in the JSON data
                data.books.forEach(book => {
                    // Create a link element
                    const link = document.createElement("a");
                    link.href = book.link; // Set the link href attribute
    
                    // Create the book card div
                    const bookCard = document.createElement("div");
                    bookCard.classList.add("book-card");
    
                    // Create the image element
                    const img = document.createElement("img");
                    img.src = book.image;
                    img.alt = book.title;
    
                    // Create the title element
                    const title = document.createElement("h2");
                    title.textContent = book.title;
    
                    // Create the description element
                    const description = document.createElement("p");
                    description.textContent = book.description;
    
                    // Append elements to the book card
                    bookCard.appendChild(img);
                    bookCard.appendChild(title);
                    bookCard.appendChild(description);
    
                    // Append the book card to the link
                    link.appendChild(bookCard);
    
                    // Append the link to the books container
                    booksContainer.appendChild(link);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });