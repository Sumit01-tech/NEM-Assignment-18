const express = require('express');
const app = express();
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    findTodo
} = require('./controllers/todo.controller');

app.use(express.json());

app.post('/todos', (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ error: 'Task required' });
        const todo = createTodo(task);
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

app.get('/todos', (req, res) => {
    try {
        res.status(200).json(getTodos());
    } catch {
        res.status(500).json({ error: 'Internal error' });
    }
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = findTodo(id);
    if (!todo) return res.status(404).json({ error: 'Not found' });
    const updated = updateTodo(id, req.body.task);
    res.status(200).json(updated);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    deleteTodo(id);
    res.status(204).send();
});

module.exports = app;
