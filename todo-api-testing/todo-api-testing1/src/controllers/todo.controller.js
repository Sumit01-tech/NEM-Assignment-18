const db = require('../data/db');

const createTodo = (task) => {
    if (!task || typeof task !== 'string') {
        throw new Error('Invalid task');
    }
    return db.createTodo(task);
};

const getAllTodos = () => {
    return db.getAllTodos();
};

const getTodoById = (id) => {
    return db.findTodo(id);
};

const updateTodo = (id, task) => {
    return db.updateTodo(id, task);
};

const deleteTodo = (id) => {
    return db.deleteTodo(id);
};

const resetTodos = () => {
    db.resetDB();
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    resetTodos
};
