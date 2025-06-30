let todos = [];
let idCounter = 1;

function createTodo(task) {
    const todo = { id: idCounter++, task };
    todos.push(todo);
    return todo;
}

function updateTodo(id, newTask) {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.task = newTask || todo.task;
    return todo;
}

function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) todos.splice(index, 1);
}

function findTodo(id) {
    return todos.find(t => t.id === id);
}

function getAllTodos() {
    return todos;
}

function resetDB() {
    todos = [];
    idCounter = 1;
}

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    findTodo,
    getAllTodos,
    resetDB
};
