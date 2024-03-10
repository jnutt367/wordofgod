// Books data
const books = [
     "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
    "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
    "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
    "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
    "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew",
    "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
    "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
    "Titus", "Philemon", "Hebrews", "James", "1 Peter",
    "2 Peter", "1 John", "2 John", "3 John", "Jude",
    "Revelation"
];

// Toggle dropdown menu
document.getElementById("toggleDropdown").addEventListener("click", function() {
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

// Add books to dropdown and book cards
window.onload = function() {
    const dropdownContent = document.getElementById("dropdownContent");
    const booksContainer = document.getElementById("books");

    books.forEach(book => {
        const dropdownItem = document.createElement("a");
        dropdownItem.textContent = book;
        dropdownContent.appendChild(dropdownItem);

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const img = document.createElement("img");
        img.src = `images/${book.toLowerCase()}.jpg`; // Assuming image names are lowercase book names
        img.alt = book;
        bookCard.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = book;
        bookCard.appendChild(title);

        const description = document.createElement("p");
        description.textContent = `Description of ${book}.`; // You can add descriptions if available
        bookCard.appendChild(description);

        booksContainer.appendChild(bookCard);
    });
};
