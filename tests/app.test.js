const request = require('supertest');
const app = require('../src/app');
const { resetDB } = require('../src/data/db');

beforeEach(() => {
    resetDB(); // ensures clean state
});

describe('To-Do API', () => {
    let todoId;

    it('should create a new todo', async () => {
        const res = await request(app).post('/todos').send({ task: 'Test Task' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.task).toBe('Test Task');
        todoId = res.body.id;
    });

    it('should get all todos', async () => {
        await request(app).post('/todos').send({ task: 'Another Task' });
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should update the todo', async () => {
        const createRes = await request(app).post('/todos').send({ task: 'Initial' });
        const id = createRes.body.id;

        const res = await request(app).put(`/todos/${id}`).send({ task: 'Updated Task' });
        expect(res.statusCode).toBe(200);
        expect(res.body.task).toBe('Updated Task');
    });

    it('should delete the todo', async () => {
        const createRes = await request(app).post('/todos').send({ task: 'Delete Me' });
        const id = createRes.body.id;

        const res = await request(app).delete(`/todos/${id}`);
        expect(res.statusCode).toBe(204);
    });

    it('should handle error for missing task', async () => {
        const res = await request(app).post('/todos').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('should handle update for non-existent todo', async () => {
        const res = await request(app).put('/todos/999').send({ task: 'Does not exist' });
        expect(res.statusCode).toBe(404);
    });
});
