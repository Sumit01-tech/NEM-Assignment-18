const request = require('supertest');
const app = require('../src/app');
const { resetDB } = require('../src/data/db');

beforeEach(() => resetDB());

describe('To-Do API Unit Tests', () => {
    it('should create a todo', async () => {
        const res = await request(app).post('/todos').send({ task: 'Test task' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.task).toBe('Test task');
    });

    it('should get all todos', async () => {
        await request(app).post('/todos').send({ task: 'Fetch task' });
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
