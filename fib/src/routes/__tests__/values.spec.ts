import { baseRouter } from '../base';
import { router as valuesRouter } from '../values';
import express, { Express } from 'express';
import request from 'supertest';
import { Server } from 'http';

let app: Express, server: Server;

jest.mock(
    'redis',
    jest.fn().mockImplementation(() => ({
        createClient: jest.fn().mockImplementation(() => ({
            duplicate: jest.fn(),
        })),
    }))
);

jest.mock(
    'pg',
    jest.fn().mockImplementation(() => ({
        Pool: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            query: jest.fn(() => ({
                rows: [],
            })),
        })),
    }))
);

beforeAll(() => {
    app = express();
    app.use(baseRouter);
    server = app.listen(3001);
});

afterAll(async (done) => {
    server.close();
    done();
});

describe('Values router', () => {
    it('should give back proper body with status 200', async (done) => {
        const res = await request(express().use(valuesRouter)).get('/all');

        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual([]);
        done();
    });
});
