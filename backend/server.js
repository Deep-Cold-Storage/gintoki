const app = (fastify = require('fastify')({
  logger: { level: 'warn' },
  ignoreTrailingSlash: true,
}));

app.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  exposeRoute: true,

  openapi: {
    info: {
      title: 'Gintoki - API Service',
      description: '📦 Internet of things package locker for no contact item exchange.',
      version: '0.1.0',
    },
    tags: [
      { name: 'Users', description: '👱 User management endpoints.' },
      { name: 'Auth', description: '🔒 User authentication endpoints.' },
    ],
    servers: [
      { url: 'http://127.0.0.1:3000', description: 'Development' },
      { url: 'https://gintoki.bednarski.dev/api', description: 'Production' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
});

const lockers = require('./routes/lockers');
const items = require('./routes/items');
const users = require('./routes/users');
const auth = require('./routes/auth');

app.register(items, { prefix: '/items' });
app.register(lockers, { prefix: '/lockers' });
app.register(users, { prefix: '/users' });
app.register(auth, { prefix: '/auth' });

module.exports = app;
