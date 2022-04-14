// Controlls
const addBookBtn = document.querySelector('#add-book');
const addMenu = document.querySelector(".add-menu");

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
addBookBtn.addEventListener('click', () => {
    // Check if Add Menu is visible
    if (addMenu.classList.contains('hidden')) {
        replaceClass(addMenu, 'hidden', 'visible');
    } else {
        replaceClass(addMenu, 'visible', 'hidden');
    }
})

// Add new book
document.querySelector('#get-user-input').addEventListener('click', () => {
    let newBook = getNewBook();
    if (newBook.title === '' || newBook.author === '' || !Number.isInteger(newBook.pages)) {
        console.log("error");
    }
    else {
        console.log(newBook);
    }
})

// Get new book
function getNewBook() {
    let bookTitle = document.querySelector('#input-title').value;
    let bookAuthor = document.querySelector('#input-author').value;
    let bookPages = parseInt(document.querySelector('#input-pages').value);
    let readStatus = getCheckBoxVal(document.querySelector('#input-read-status'));

    return {title: bookTitle, author: bookAuthor, pages: bookPages, read: readStatus}
}

// Display book title on hover


// Helpers
function replaceClass(element, unwanted, wanted) {
    element.classList.remove(unwanted);
    element.classList.add(wanted);
}

function getCheckBoxVal(checkbox) {
    if (checkbox.checked) {
        return true;
    }
    return false;
}