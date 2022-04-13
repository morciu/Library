// Store books in an array called library
let myLibrary = [];

// Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    if (typeof pages !== 'number') {
        this.pages = 0;
    } else {
        this.pages = pages;
    }
    if (typeof read !== 'boolean') {
        this.read = false;
    } else {
        this.read = read;
    }
}


// Add to library
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Open Add Menu
