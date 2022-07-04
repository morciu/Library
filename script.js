
// Book object
class Book {
    constructor(title, author, pages, read) {
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
}

// Array for stored books

let myLibrary = [
    new Book('Dracula', 'Bram Stoker', 418, false),
    new Book('Moby Dick', 'Herman Melville', 752, true),
    new Book('Frankenstein', 'Mary Shelley', 280, true),
    new Book('The Dog It Was That Died', 'Tom Stoppard', 192, true),
    new Book('Get in the van', 'Henry Rollins', 247, false),
    new Book('Heart of Darkness', 'Joseph Conrad', 72, false),
    new Book('Charlie and the Chocolate Factory', 'Roald Dahl', 176, true),
    new Book('Great Expectations', 'Charles Dickens', 544, true),
    new Book('The Adventures of Tom Sawyer', 'Mark Twain', 216, true),
    new Book('The Turn of the Screw', 'Henry James', 174, true),
    new Book('Strange Case of Dr Jekyll and Mr Hyde', 'R. L. Stevenson', 141, false),
    new Book('The Trial', 'Franz Kafka', 106, true),
    new Book('Bartleby, the Scrivener', 'Herman Melville', 68, false)
    ];


// DOM object that controls DOM events
const DOMObject = (() => {
    // DOM Controlls
    const addBookBtn = document.querySelector('#add-book');
    const addMenu = document.querySelector(".add-menu");
    const titleSection = document.querySelector('#titleDisplay').innerText;
    const authorSection = document.querySelector('#authorDisplay').innerText;
    // Colors to use for DOM elements representing books
    bookColors = ['#5AA85E', '#CA6636', '#DAC792'];

    // Static method that places new book on shelf
    const placeOnShelf = (book, index) => {
        let bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.id = index;
        bookElement.dataset.title = book.title;
        bookElement.dataset.author = book.author;
        bookElement.dataset.pages = book.pages;
        bookElement.dataset.read = book.read;
        bookElement.style.backgroundColor = bookColors[Math.floor(Math.random() * bookColors.length)];

        // When hovered, display title and author on top of the page
        bookElement.addEventListener('mouseover', () => {
            document.querySelector('#titleDisplay').innerText += ' ' + book.title;
            document.querySelector('#authorDisplay').innerText += ' ' + book.author;
        })
        bookElement.addEventListener('mouseleave', () => {
            document.querySelector('#titleDisplay').innerText = 'Title: '
            document.querySelector('#authorDisplay').innerText = 'Author: '
        })

        // When clicked pop up window with all its info
        bookElement.addEventListener('click', () => {
            let bookMenu = document.createElement('div');

            let title = document.createElement('div');
            title.className = "book-title";
            title.innerText = book.title;
            let author = document.createElement('div');
            author.innerText = `Author: ${book.author}`;
            let pages = document.createElement('div');
            pages.innerText = `Pages: ${book.pages}`;

            // Read / Unread button
            let readDiv = document.createElement('div');
            readDiv.className = "read-div";
            let read = document.createElement('div');
            read.innerText = `Read: ${book.read ? 'Yes' : 'No'}`;
            let readChangeBtn = document.createElement('button');
            readChangeBtn.innerText = book.read ? 'Unread' : 'Read';
            readChangeBtn.addEventListener('click', () => {
                myLibrary[index].read = myLibrary[index].read ? false : true;
                readChangeBtn.innerText = readChangeBtn.innerText === 'Read' ? 'Unread' : 'Read';
                read.innerText = read.innerText === 'Read: Yes' ? 'Read: No' : 'Read: Yes';

            })
            readDiv.append(read, readChangeBtn);
        
            // Close Popup and Remove Book
            let controlsDiv = document.createElement('div');
            controlsDiv.className = 'controls-div';

            // Close
            let closeBtn = document.createElement('button');
            closeBtn.innerText = "Close"
            closeBtn.addEventListener('click', () => {
                bookMenu.parentElement.removeChild(bookMenu);
            })

            // Remove
            let removeBtn = document.createElement('button');
            removeBtn.innerText = "Discard Book";
            removeBtn.addEventListener('click', () => {
                delete myLibrary[index];
                let books = document.querySelectorAll('.book');
                books.forEach(item => item.remove());
                let bookspaces = document.querySelectorAll('.occupied');
                bookspaces.forEach(space => replaceClass(space, 'occupied', 'empty'));
                populateShelves();
                bookMenu.parentElement.removeChild(bookMenu);
            })

            controlsDiv.append(closeBtn, removeBtn);

            bookMenu.append(title, author, pages, readDiv, controlsDiv);

            bookMenu.classList = 'pop-menu book-menu';
            document.body.appendChild(bookMenu);
        })

        let bookSpace = document.querySelector('.empty');
        if (bookSpace) {
            bookSpace.appendChild(bookElement);
            replaceClass(bookSpace, 'empty', 'occupied')
        }
    }

    function populateShelves() {
        for (let book in myLibrary) {
            placeOnShelf(myLibrary[book], book);
        }
    }

    // Set up DOM events
    const setUpEvents = (library) => {
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
                library.addBookToLibrary(newBook.title, newBook.author, newBook.pages, newBook.read);
                popupMenu(addMenu);
            }
        })
    }

    function getNewBook() {
        let bookTitle = document.querySelector('#input-title').value;
        let bookAuthor = document.querySelector('#input-author').value;
        let bookPages = parseInt(document.querySelector('#input-pages').value);
        let readStatus = getCheckBoxVal(document.querySelector('#input-read-status'));
    
        return {title: bookTitle, author: bookAuthor, pages: bookPages, read: readStatus}
    }

    // Clear Input
    const clearInput = () => {
        let titleField = document.querySelector('#input-title');
        let authorField = document.querySelector('#input-author');
        let pagesField = document.querySelector('#input-pages');
        let readCheck = document.querySelector('#input-read-status');

        titleField.value = '';
        authorField.value = '';
        pagesField.value = '';
        readCheck.checked = false;
    }

    // Helper methods
    function popupMenu(element) {
        if (element.classList.contains('hidden')) {
            replaceClass(addMenu, 'hidden', 'visible');
        } else {
            replaceClass(addMenu, 'visible', 'hidden');
        }
    }

    
    return { populateShelves, setUpEvents, placeOnShelf }
})()

// Library class
class Library {
    // Constructor that takes in book array
    constructor(savedBooks) {
        this.savedBooks = savedBooks;
    }

    addBookToLibrary(title, author, pages, read) {
        let book = new Book(title, author, pages, read);
        this.savedBooks.push(book);
        DOMObject.placeOnShelf(book, myLibrary.length-1);
    }
}

// Instantiate library object
const library = new Library(myLibrary);

// Place entire library on the shelves
DOMObject.populateShelves();
// Set up DOM events
DOMObject.setUpEvents(library);


// Helper functions
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