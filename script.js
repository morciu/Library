// Controlls
const addBookBtn = document.querySelector('#add-book');
const addMenu = document.querySelector(".add-menu");
const titleSection = document.querySelector('#titleDisplay').innerText;
const authorSection = document.querySelector('#authorDisplay').innerText;
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

    // Place book on shelf
    let bookElement = document.createElement('div');
    bookElement.className = 'book';
    bookElement.dataset.title = book.title;
    bookElement.dataset.author = book.author;
    bookElement.dataset.pages = book.pages;
    bookElement.dataset.read = book.read;
    bookElement.addEventListener('mouseover', () => {
        document.querySelector('#titleDisplay').innerText += ' ' + book.title;
        document.querySelector('#authorDisplay').innerText += ' ' + book.author;
    })
    bookElement.addEventListener('mouseleave', () => {
        document.querySelector('#titleDisplay').innerText = 'Title: '
        document.querySelector('#authorDisplay').innerText = 'Author: '
    })

    let bookSpace = document.querySelector('.empty');
    if (bookSpace) {
        bookSpace.appendChild(bookElement);
        replaceClass(bookSpace, 'empty', 'occupied')
    }
}

// Open Add Menu
addBookBtn.addEventListener('click', () => {
    // Check if Add Menu is visible
    popupMenu(addMenu);
    clearInput();
})

// Add new book
document.querySelector('#get-user-input').addEventListener('click', () => {
    let newBook = getNewBook();
    if (!checkInput(newBook)) {
    }
    else {
        addBookToLibrary(newBook.title, newBook.author, newBook.pages, newBook.read);
        popupMenu(addMenu);
    }
})

// Clear Input
function clearInput() {
    let titleField = document.querySelector('#input-title');
    let authorField = document.querySelector('#input-author');
    let pagesField = document.querySelector('#input-pages');
    let readCheck = document.querySelector('#input-read-status');

    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    readCheck.checked = false;
}

// Get new book
function getNewBook() {
    let bookTitle = document.querySelector('#input-title').value;
    let bookAuthor = document.querySelector('#input-author').value;
    let bookPages = parseInt(document.querySelector('#input-pages').value);
    let readStatus = getCheckBoxVal(document.querySelector('#input-read-status'));

    return {title: bookTitle, author: bookAuthor, pages: bookPages, read: readStatus}
}

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

function checkInput(input) {
    let valid = true;
    let titleInput = document.querySelector('#input-title');
    let authorInput = document.querySelector('#input-author');
    let pagesInput = document.querySelector('#input-pages');
    if (input.title === '') {
        titleInput.style.backgroundColor = 'rgb(253, 121, 121)';
        valid = false;
    }
    if (input.author === '') {
        authorInput.style.backgroundColor = 'rgb(253, 121, 121)';
        valid = false;
    }
    if (!Number.isInteger(input.pages)) {
        pagesInput.style.backgroundColor = 'rgb(253, 121, 121)';
        valid = false;
    }
    if (valid) {
        resetInputColor([titleInput, authorInput, pagesInput]);
    }
    return valid
}

function resetInputColor(elementArray) {
    for (let i in elementArray) {
        elementArray[i].style.backgroundColor = 'white';
    }
}

function popupMenu(element) {
    if (element.classList.contains('hidden')) {
        replaceClass(addMenu, 'hidden', 'visible');
    } else {
        replaceClass(addMenu, 'visible', 'hidden');
    }
}