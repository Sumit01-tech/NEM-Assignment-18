const db = require('../src/data/db');

describe('Jest Spy Tests', () => {
    it('should spy on createTodo', () => {
        const spy = jest.spyOn(db, 'createTodo');
        db.createTodo('Spy task');
        expect(spy).toHaveBeenCalledWith('Spy task');
        spy.mockRestore();
    });
});
