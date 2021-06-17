const STORAGE_KEY = "BOOK_SHELF_KEY";

let books = [];

function isStorageExist() {
  if (typeof Storage == "undefined") {
    alert("browser anda tidak mendukung");
    return false;
  }
  return true;
}

// REFRESH DATA-LOCAL STORAGE
function refreshDataBook() {
  const listBookCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const listBookUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
    newBook[BOOK_ITEM_ID] = book.id;

    if (book.isCompleted) {
      listBookCompleted.append(newBook);
    } else {
      listBookUncompleted.append(newBook);
    }
  }
}

function composeDataBook(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function saveBook() {
  const data = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, data);
  document.dispatchEvent(new Event("onbooksaved"));
}

function loadDataFromStorage() {
  const dataSerializer = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(dataSerializer);

  if (data !== null) books = data;
  document.dispatchEvent(new Event("onbookload"));
}

function updateDataStorage() {
  if (isStorageExist()) {
    saveBook();
  }
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  let i = 0;
  for (book of books) {
    if (book.id === bookId) {
      return i;
    }
    i++;
  }
  return -1;
}
