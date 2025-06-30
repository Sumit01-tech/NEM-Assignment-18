const request = require('supertest');
const app = require('../src/app');
const { resetDB } = require('../src/data/db');

beforeEach(() => resetDB());

describe('To-Do API', () => {
    it('should create and return a todo', async () => {
        const res = await request(app).post('/todos').send({ task: 'Task A' });
        expect(res.statusCode).toBe(201);
        expect(res.body.task).toBe('Task A');
    });

    it('should not create without task', async () => {
        const res = await request(app).post('/todos').send({});
        expect(res.statusCode).toBe(400);
    });

    it('should return todos', async () => {
        await request(app).post('/todos').send({ task: 'Test' });
        const res = await request(app).get('/todos');
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should update a todo', async () => {
        const { body } = await request(app).post('/todos').send({ task: 'Update me' });
        const res = await request(app).put(`/todos/${body.id}`).send({ task: 'Updated!' });
        expect(res.body.task).toBe('Updated!');
    });

    it('should delete a todo', async () => {
        const { body } = await request(app).post('/todos').send({ task: 'Delete me' });
        const res = await request(app).delete(`/todos/${body.id}`);
        expect(res.statusCode).toBe(204);
    });

    it('should handle non-existent update', async () => {
        const res = await request(app).put('/todos/999').send({ task: 'Fail' });
        expect(res.statusCode).toBe(404);
    });
});
