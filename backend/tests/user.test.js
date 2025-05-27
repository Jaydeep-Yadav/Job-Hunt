import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

describe('User Registration', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/v1/user/register')
            .send({
                fullname: 'Test User',
                email: 'testuser@example.com',
                phoneNumber: '1234567890',
                password: 'password123',
                role: 'jobseeker'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('User registered successfully');
    });

    it('should fail with invalid email', async () => {
        const res = await request(app)
            .post('/api/v1/user/register')
            .send({
                fullname: 'Test User',
                email: 'invalid-email',
                phoneNumber: '1234567890',
                password: 'password123',
                role: 'jobseeker'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toMatch(/failed/i);
    });
});
