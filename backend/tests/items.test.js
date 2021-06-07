const db = require('./db');
const app = require('../server');

const { getAuthToken, getLocker } = require('./helpers');

const supertest = require('supertest');
const request = supertest(app.server);
fastify.ready();

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Items Resources', function () {
  it('Positive: Check GET: /items', async () => {
    {
      let authToken = getAuthToken();

      const res = await request.get('/items').set('Authorization', 'Bearer ' + authToken);
      expect(res.status).toBe(200);
    }
  });

  it('Positive: Check POST: /items', async () => {
    {
      let authToken = getAuthToken();
      let locker = getLocker();

      {
        const res = await request
          .post('/items')
          .send({ name: 'bag', lockerId: locker._id })
          .set('Authorization', 'Bearer ' + authToken);

        expect(res.status).toBe(200);
      }

      {
        const res = await request.get('/items').set('Authorization', 'Bearer ' + authToken);

        expect(res.status).toBe(200);
        expect(res.body[0]).toBeTruthy();
      }
    }
  });
});
