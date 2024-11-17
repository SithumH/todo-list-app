const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// Add a task
app.post('/tasks', (req, res) => {
    const task = { id: Date.now(), ...req.body };
    tasks.push(task);
    res.status(201).json(task);
});

// Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.status(200).send('Task deleted');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
