const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEM_ID = "bookid";

function makeBook(title, author, date, isCompleted) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const writer = document.createElement("h5");
  writer.innerText = author;

  const year = document.createElement("p");
  year.innerText = date;

  const textItem = document.createElement("div");
  textItem.classList.add("text-item");
  textItem.append(bookTitle, writer, year);

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(textItem);

  const action_button = document.createElement("div");
  action_button.classList.add("action");
  action_button.append(BookRemovedButton());

  if (isCompleted) {
    action_button.append(undoCompletedButton());
  } else {
    action_button.append(BookCompletedButton());
  }

  container.append(action_button);
  return container;
}

// BUTTON

function BookCompletedButton() {
  return createIcon("fas", "fa-clipboard-check", function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}

function BookRemovedButton() {
  return createIcon("fas", "fa-trash-alt", function (event) {
    removeBook(event.target.parentElement.parentElement);
  });
}

function undoCompletedButton() {
  return createIcon("fas", "fa-undo-alt", function (event) {
    undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function createButton(buttonTypeClass, textButton, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = textButton;
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function createIcon(iconTypeClass1, iconTypeClass2, eventListener) {
  const icon = document.createElement("i");
  icon.classList.add(iconTypeClass1);
  icon.classList.add(iconTypeClass2);
  icon.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return icon;
}

// FUNCTION BOOKS

function addBook() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

  const bookTitle = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;

  const book = makeBook(bookTitle, author, year);
  const bookObject = composeDataBook(bookTitle, author, year, false);

  book[BOOK_ITEM_ID] = bookObject.id;
  books.push(bookObject);

  uncompletedBookList.append(book);
  updateDataStorage();
}

function addBookToCompleted(bookElement) {
  const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const bookTitle = bookElement.querySelector(".text-item > h3").innerText;
  const author = bookElement.querySelector(".text-item > h5").innerText;
  const year = bookElement.querySelector(".text-item > p").innerText;

  const newBook = makeBook(bookTitle, author, year, true);

  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isCompleted = true;
  newBook[BOOK_ITEM_ID] = book.id;

  completedBookList.append(newBook);
  bookElement.remove();

  updateDataStorage();
}

function removeBook(bookElement) {
  const indexBook = findBookIndex(bookElement[BOOK_ITEM_ID]);
  books.splice(indexBook, 1);

  bookElement.remove();
  updateDataStorage();
}

function undoBookFromCompleted(bookElement) {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector(".text-item > h3").innerText;
  const author = bookElement.querySelector(".text-item > h5").innerText;
  const year = bookElement.querySelector(".text-item > p").innerText;

  const newBook = makeBook(bookTitle, author, year, false);
  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isCompleted = false;
  newBook[BOOK_ITEM_ID] = book.id;

  uncompletedBookList.append(newBook);
  bookElement.remove();
  updateDataStorage();
}
