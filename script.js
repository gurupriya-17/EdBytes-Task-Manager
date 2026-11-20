
// Get HTML elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const emptyMessage = document.getElementById("emptyMessage");

// Load saved tasks
let tasks = loadTasks();

// Save tasks to browser storage
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Load tasks from browser storage
function loadTasks() {
    try {
        const savedTasks = JSON.parse(
            localStorage.getItem("myTasks") || "[]"
        );

        if (!Array.isArray(savedTasks)) {
            return [];
        }

        return savedTasks.filter(
            task => typeof task === "string"
        );
    } catch (error) {
        return [];
    }
}

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task;
        span.className = "task-text";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });

        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";
}

// Add new task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const task = taskInput.value.trim();

    // Check empty input
    if (task === "") {
        message.textContent = "Please enter a task!";
        taskInput.focus();
        return;
    }

    // Add task to array
    tasks.push(task);

    // Save and display
    saveTasks();
    displayTasks();

    // Clear input
    taskInput.value = "";

    message.textContent = "Task added successfully!";
    taskInput.focus();
});

// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    displayTasks();

    message.textContent = "Task deleted successfully!";
}

// Display saved tasks when page opens
displayTasks();
