const sinon = require('sinon');
const db = require('../src/data/db');

describe('Sinon stubs', () => {
    it('should stub createTodo', () => {
        const stub = sinon.stub(db, 'createTodo').returns({ id: 99, task: 'Stubbed' });
        const todo = db.createTodo('test');
        expect(todo.id).toBe(99);
        stub.restore();
    });
});
