const UNCOMPLETED_LIST_TODO_LIST_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";

function addTodo() {
  const uncompletedList = document.getElementById(UNCOMPLETED_LIST_TODO_LIST_ID);
  const textTitle = document.getElementById("title").value;
  const textTimestamp = document.getElementById("date").value;

  const todo = makeTodo(textTitle, textTimestamp);
  uncompletedList.append(todo);
}

function makeTodo(data, timestamp, isCompleted) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = data;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createUndoButton());
    container.append(createTrashButton());
  } else {
    container.append(createCheckButton());
  }

  return container;
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function addTaskToComplete(taskElement) {
  const textTitle = document.querySelector(".inner >h2").innerText;
  const textTimestamp = document.querySelector(".inner >p").innerText;
  const newTodo = makeTodo(textTitle, textTimestamp, true);
  const completedTodos = document.getElementById(COMPLETED_LIST_TODO_ID);
  completedTodos.append(newTodo);
  taskElement.remove();
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToComplete(event.target.parentElement);
  });
}

function undoTaskFromCompleted(taskElement) {
  const uncompletedList = document.getElementById(UNCOMPLETED_LIST_TODO_LIST_ID);
  const taskTitle = taskElement.querySelector(".inner >h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner >h2").innerText;
  const newTodo = makeTodo(taskTitle, taskTimestamp, false);
  uncompletedList.append(newTodo);
  taskElement.remove();
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}

function removeTaskCompleted(taskElement) {
  taskElement.remove();
}

function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeTaskCompleted(event.target.parentElement);
  });
}
