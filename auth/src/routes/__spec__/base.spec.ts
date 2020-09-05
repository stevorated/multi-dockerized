import { baseRouter } from '../base';

import express, { Express } from 'express';
import request from 'supertest';
import { Server } from 'http';
import { keys } from '../../config';

const { serviceName } = keys;

let app: Express, server: Server;

jest.mock(
  'redis',
  jest.fn().mockImplementation(() => ({
    createClient: jest.fn().mockImplementation(() => ({
      duplicate: jest.fn(),
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

describe('Base router', () => {
  it('should give back proper body with status 200', async (done) => {
    const res = await request(express().use(baseRouter)).get('/');

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      message: `welcome to ${serviceName} server`,
      status: 'Cool',
    });
    done();
  });
});
