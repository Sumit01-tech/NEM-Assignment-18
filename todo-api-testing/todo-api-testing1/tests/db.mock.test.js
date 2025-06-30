jest.mock('../src/data/db', () => ({
    createTodo: jest.fn(() => { throw new Error('DB failed'); }),
}));

const app = require('../src/app');

describe('Mock DB Failure', () => {
    it('should handle DB failure gracefully', async () => {
        const res = await require('supertest')(app).post('/todos').send({ task: 'Fail' });
        expect(res.statusCode).toBe(500);
    });
});
