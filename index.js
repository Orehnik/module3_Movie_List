let todos = [];
let todoIdGlobalCounter = 0
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {

    let inputText = inputBox.value.trim();

    if (!inputText) {
        alert("Нужно что-то написать!");
    } else {

        let todo = {
            id: todoIdGlobalCounter++,
            content: inputText,
            checked: false
        };

        todos.unshift(todo);
        inputBox.value = "";

        update();
    };
}

function renderToDo() {
    listContainer.innerHTML = ''
    todos.forEach((task) => {
        const taskItem = createChild(listContainer, 'div', 'new-task', '')
        const checkClassName = task.checked ? ' checked' : ' unchecked'

        createChild(taskItem, 'span', 'new-task-jr check-button' + checkClassName, '', () => { task.checked = !task.checked; update(); })
        createChild(taskItem, 'span', 'new-task-jr label' + checkClassName, task.content);
        createChild(taskItem, 'span', 'new-task-jr remove-button', '\u00d7', () => { todos = todos.filter(item => item.id !== task.id); update(); })
    })
}

function createChild(parent, tag, classString, content, onClickHandler) {
    const newElement = document.createElement(tag)
    newElement.className = classString
    newElement.addEventListener("click", onClickHandler)
    newElement.innerHTML = content

    parent.appendChild(newElement)

    return newElement
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getFromLocalStorage() {
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    return todos;
}

function update() {
    saveToLocalStorage();
    renderToDo();
}

getFromLocalStorage();
renderToDo();