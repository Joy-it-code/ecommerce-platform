const request = require('supertest');
const app = require('../index'); // Import app without starting the server

describe('API Tests', () => {
    it('GET / should return API message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('E-commerce API is running...');
    });
});