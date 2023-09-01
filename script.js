





// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value.trim(); // Trim the value to remove spaces
  if (userEnteredValue !== "") {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

// Show tasks on page load
showTasks();

addBtn.onclick = () => {
  let userEnteredValue = inputBox.value.trim();
  if (userEnteredValue !== "") {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userEnteredValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
  }
};

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length;

  todoList.innerHTML = "";

  listArray.forEach((element, index) => {
    const isChecked = element.startsWith("[x]");
    const todoText = isChecked ? element.slice(3) : element;
    const todoItem = createTodoItem(todoText, index, isChecked);
    todoList.appendChild(todoItem);
  });

  updateClearAllButton();
}

function createTodoItem(todoText, index, checked) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" id="todo-${index}" ${checked ? "checked" : ""}>
    <label for="todo-${index}" class="${checked ? "checked" : ""}">${todoText}</label>
    <span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span>
  `;
  return li;
}

function updateClearAllButton() {
  if (listArray.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.onclick = () => {
  listArray = listArray.filter(item => !item.startsWith("[x]"));
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
};

