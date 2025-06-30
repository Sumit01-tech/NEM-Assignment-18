const request = require('supertest');
const app = require('../src/app');
const { resetDB } = require('../src/data/db');

beforeEach(() => resetDB());

describe('Integration Test - Full Flow', () => {
    it('should create, fetch, update and delete a todo', async () => {
        const createRes = await request(app).post('/todos').send({ task: 'Integration' });
        const id = createRes.body.id;

        const getRes = await request(app).get('/todos');
        expect(getRes.body.length).toBe(1);

        const updateRes = await request(app).put(`/todos/${id}`).send({ task: 'Updated Task' });
        expect(updateRes.body.task).toBe('Updated Task');

        const deleteRes = await request(app).delete(`/todos/${id}`);
        expect(deleteRes.statusCode).toBe(204);
    });
});
