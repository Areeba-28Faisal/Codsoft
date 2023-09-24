// Get elements from the HTML
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Initialize tasks from local storage or set an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const isChecked = task.completed ? 'checked' : '';
        listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${isChecked}>
            <label>${task.text}</label>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;
        listItem.querySelector('.edit-task').addEventListener('click', () => editTask(index));
        listItem.querySelector('.delete-task').addEventListener('click', () => deleteTask(index));
        listItem.querySelector('.task-checkbox').addEventListener('change', () => toggleTask(index));
        taskList.appendChild(listItem);
    });
}

// Function to add a new task
function addTask() {
    const newTaskText = taskInput.value.trim();
    if (newTaskText !== '') {
        tasks.push({ text: newTaskText, completed: false });
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }
}

// Function to edit a task
function editTask(index) {
    const updatedTask = prompt('Edit task:', tasks[index].text);
    if (updatedTask !== null) {
        tasks[index].text = updatedTask;
        saveTasks();
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to toggle task completion status
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listeners
addTaskButton.addEventListener('click', addTask);

// Initial rendering of tasks
renderTasks();
