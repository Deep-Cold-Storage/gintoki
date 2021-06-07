const db = require('./db');
const app = require('../server');

const supertest = require('supertest');
const request = supertest(app.server);
fastify.ready();

const users = require('../models/users');

jest.mock('../mailer');

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Magic Auth Flow', function () {
  it('Positive: Check GET: /users/me', async () => {
    const email = 'testing@gmail.com';
    let user;

    {
      const res = await request.post('/auth/magic').send({ email: email });
      user = await users.findOne({ email: email });

      expect(res.status).toBe(200);

      expect(user.auth.magicToken).toBeTruthy();
      expect(user.auth.createdAt).toBeTruthy();
    }

    {
      const res = await request.post('/auth/magic/' + user.auth.magicToken);

      expect(res.status).toBe(200);
      expect(res.body.authToken).toBeTruthy();

      user.authToken = res.body.authToken;
    }

    {
      const res = await request.get('/users/me').set('Authorization', 'Bearer ' + user.authToken);
      expect(res.status).toBe(200);
    }
  });

  it('Negative: Check outdated magic token.', async () => {
    const email = 'testing@gmail.com';
    let user;

    {
      const res = await request.post('/auth/magic').send({ email: email });
      user = await users.findOne({ email: email });

      user.auth.createdAt = new Date(2000);
      user.save();

      expect(res.status).toBe(200);
    }

    {
      const res = await request.post('/auth/magic/' + user.auth.magicToken);

      expect(res.status).toBe(403);
      expect(res.body.authToken).toBeFalsy();
    }
  });

  it('Negative: Check invalid magic token.', async () => {
    let authToken;

    {
      const res = await request.post('/auth/magic/helloworld');

      expect(res.status).toBe(403);
      expect(res.body.authToken).toBeFalsy();

      authToken = res.body.authToken;
    }

    {
      const res = await request.get('/users/me').set('Authorization', 'Bearer ' + authToken);
      expect(res.status).toBe(401);
    }
  });
});
