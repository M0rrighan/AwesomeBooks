const booksList = document.getElementById('booksList');
const addBookForm = document.getElementById('addBookForm');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');
let getRemoveButtons = [];
let collectionOfBooks = [];

const book = {
  title: '',
  author: '',
};

/*********************************************************
 *** bookObject and localStorage manipulation Functions ***
 **********************************************************/
function addBook() {
  let id = 0;
  if (title.value.length < 1 || author.value < 1) {
    return;
  }
  if (collectionOfBooks.length > 0) {
    // collectionOfBooks [[id, BookObj] [id, BookObj] ...]
    // checks the collectionOfBooks last array, first element: id and adds 1
    id = collectionOfBooks[collectionOfBooks.length - 1][0] + 1;
  }
  const currentBook = Object.create(book);
  currentBook.title = title.value;
  currentBook.author = author.value;
  collectionOfBooks.push([id, currentBook]);
}

function removeBook(id) {
  const newCollection = collectionOfBooks.filter((book) => book[0] !== id);
  collectionOfBooks = newCollection;
}

function updateLocalStorage() {
  const arrayOfBooksToString = JSON.stringify(collectionOfBooks);

  if (localStorage.getItem('BookData') !== arrayOfBooksToString) {
    localStorage.setItem('BookData', arrayOfBooksToString);
  }
  return collectionOfBooks;
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBook();
  generateHtmlCodeForUlBookList();
});

function addRemoveListeners() {
  getRemoveButtons.forEach((removeBtn) => {
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      removeBook(parseInt(removeBtn.id));      
      generateHtmlCodeForUlBookList();
    });
  });
}