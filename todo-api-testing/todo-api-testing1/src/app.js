const express = require('express');
const { createTodo, updateTodo, deleteTodo, findTodo, getAllTodos } = require('./data/db');

const app = express();
app.use(express.json());

app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: 'Task is required' });
    const todo = createTodo(task);
    res.status(201).json(todo);
});

app.get('/todos', (req, res) => {
    res.json(getAllTodos());
});

app.get('/todos/:id', (req, res) => {
    const todo = findTodo(Number(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
});

app.put('/todos/:id', (req, res) => {
    const updated = updateTodo(Number(req.params.id), req.body.task);
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
    res.json(updated);
});

app.delete('/todos/:id', (req, res) => {
    const todo = findTodo(Number(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    deleteTodo(Number(req.params.id));
    res.status(204).send();
});

module.exports = app;
