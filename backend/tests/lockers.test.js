const db = require('./db');
const app = require('../server');

const { getAuthToken } = require('./helpers');

const supertest = require('supertest');
const request = supertest(app.server);
fastify.ready();

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Lockers Resources', function () {
  it('Positive: Check GET: /lockers', async () => {
    {
      let authToken = getAuthToken();

      const res = await request.get('/lockers').set('Authorization', 'Bearer ' + authToken);
      expect(res.status).toBe(200);
    }
  });

  it('Positive: Check POST: /lockers', async () => {
    {
      let authToken = getAuthToken();

      {
        const res = await request
          .post('/lockers')
          .send({ name: 'Locker', slots: [{ pin: 1 }, { pin: 2 }, { pin: 3 }], latitude: '21.973228', longitude: '50.015645' })
          .set('Authorization', 'Bearer ' + authToken);

        expect(res.status).toBe(200);
      }

      {
        const res = await request.get('/lockers').set('Authorization', 'Bearer ' + authToken);

        expect(res.status).toBe(200);
        expect(res.body[0]).toBeTruthy();
      }
    }
  });
});
