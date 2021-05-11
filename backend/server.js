const app = (fastify = require('fastify')({
  logger: { level: 'warn' },
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
    tags: [],
    servers: [{ url: 'http://127.0.0.1:3000', description: 'Development' }],
  },
});

// const users = require('./routes/users');
// app.register(users, { prefix: '/users' });

module.exports = app;
