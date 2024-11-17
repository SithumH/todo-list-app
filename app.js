const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

const apiUrl = 'http://localhost:3000/tasks';

// Fetch and display tasks
async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    taskList.innerHTML = tasks.map(task => `
        <li>
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `).join('');
}

// Add a task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    });

    taskForm.reset();
    loadTasks();
});

// Delete a task
async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadTasks();
}

loadTasks();
