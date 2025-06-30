jest.mock('../src/data/db', () => ({
    getTodos: jest.fn(() => new Promise(res => setTimeout(() => res([{ id: 1, task: 'Delayed' }]), 50))),
    createTodo: jest.fn(() => { throw new Error('Fake DB Error') }),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
    findTodo: jest.fn()
}));

const request = require('supertest');
const app = require('../src/app');

describe('Mocked DB', () => {
    it('should simulate delay in getTodos', async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body[0].task).toBe('Delayed');
    });

    it('should simulate DB failure on POST', async () => {
        const res = await request(app).post('/todos').send({ task: 'Failing Task' });
        expect(res.statusCode).toBe(500);
    });
});
