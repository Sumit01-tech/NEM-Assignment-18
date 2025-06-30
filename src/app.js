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

// CREATE
app.post('/todos', (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).json({ error: 'Task required' });
        const todo = createTodo(task);
        res.status(201).json(todo);
    } catch (err) {
        console.error('POST /todos error:', err);
        res.status(500).json({ error: 'Internal error' });
    }
});

// READ ALL
app.get('/todos', (req, res) => {
    try {
        const todos = getTodos();
        res.status(200).json(todos);
    } catch (err) {
        console.error('GET /todos error:', err);
        res.status(500).json({ error: 'Internal error' });
    }
});

// UPDATE
app.put('/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const todo = findTodo(id);
        if (!todo) return res.status(404).json({ error: 'Not found' });
        const updated = updateTodo(id, req.body.task);
        res.status(200).json(updated);
    } catch (err) {
        console.error('PUT /todos/:id error:', err);
        res.status(500).json({ error: 'Internal error' });
    }
});

// DELETE
app.delete('/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        deleteTodo(id);
        res.status(204).send();
    } catch (err) {
        console.error('DELETE /todos/:id error:', err);
        res.status(500).json({ error: 'Internal error' });
    }
});

module.exports = app;
