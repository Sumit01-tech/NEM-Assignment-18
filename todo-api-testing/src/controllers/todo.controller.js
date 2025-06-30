const db = require('../data/db');

module.exports = {
    getTodos: db.getTodos,
    createTodo: db.createTodo,
    updateTodo: db.updateTodo,
    deleteTodo: db.deleteTodo,
    findTodo: db.findTodo
};
