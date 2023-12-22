// Replace 'YOUR_API_URL' with the actual URL provided by MockAPI.io
const apiUrl = 'https://65708b7509586eff66419718.mockapi.io/todos';

let currentUser = null;

function signUp() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Implement user registration logic
    // ...

    // For demonstration purposes, set the currentUser after signup
    currentUser = { username };
    showTaskManager();
}

function logIn() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Implement user authentication logic
    // ...

    // For demonstration purposes, set the currentUser after login
    currentUser = { username };
    showTaskManager();
}

function logOut() {
    // Clear the currentUser
    currentUser = null;
    hideTaskManager();
}

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayTasks(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.title} - ${task.description} (Due: ${task.due_date})
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    if (title && description && dueDate) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, due_date: dueDate }),
            });

            const data = await response.json();
            fetchData();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    } else {
        alert('Please fill in all fields');
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${apiUrl}/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchData();
        } else {
            console.error('Error deleting task:', response.status);
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function showTaskManager() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('taskManager').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'block';
    fetchData();
}

function hideTaskManager() {
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('taskManager').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
}


// Initial setup: Hide the task manager on page load
hideTaskManager();
