const db = require('./db');
const app = require('../server');

const { getAuthToken } = require('./helpers');

const supertest = require('supertest');
const request = supertest(app.server);
fastify.ready();

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Users Resources', function () {
  it('Positive: Check GET: /users/me', async () => {
    {
      let authToken = getAuthToken();

      const res = await request.get('/users/me').set('Authorization', 'Bearer ' + authToken);
      expect(res.status).toBe(200);
    }
  });

  it('Negative: Check GET: /users/me', async () => {
    {
      const res = await request.get('/users/me').set('Authorization', 'Bearer Hello World');
      expect(res.status).toBe(401);
    }
  });
});
