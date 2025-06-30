let todos = [];
let idCounter = 1;

function getTodos() {
    return todos;
}

function createTodo(task) {
    const todo = { id: idCounter++, task };
    todos.push(todo);
    return todo;
}

function findTodo(id) {
    return todos.find(t => t.id === id);
}

function updateTodo(id, newTask) {
    const todo = findTodo(id);
    if (todo) {
        todo.task = newTask || todo.task;
    }
    return todo;
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
}

function resetDB() {
    todos = [];
    idCounter = 1;
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    findTodo,
    resetDB
};
