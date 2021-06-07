const LockerService = require('../services/LockerService');

async function protectedRoutes(router) {
  router.register(require('../hooks/authHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get all the registered lockers with their statuses.',
        tags: ['Lockers'],
        security: [{ BearerAuth: [] }],
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                location: { type: 'array' },
                available: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const lockers = await LockerService.getAll();

      return res.send(lockers);
    }
  );

  router.get(
    '/geo',
    {
      schema: {
        summary: 'Get the nearest locker by latitude and longitude.',
        tags: ['Lockers'],
        security: [{ BearerAuth: [] }],
        querystring: {
          latitude: { type: 'string' },
          longitude: { type: 'string' },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              location: { type: 'array' },
              available: { type: 'boolean' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { latitude, longitude } = req.query;

      const location = [];

      location.push(longitude);
      location.push(latitude);

      const locker = await LockerService.getNearest(location);

      return res.send(locker);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Create and provision a new locker controller.',
        tags: ['Lockers'],
        security: [{ BearerAuth: [] }],

        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            slots: { type: 'array' },
            latitude: { type: 'string' },
            longitude: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              slots: { type: 'array' },
              location: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name, latitude, longitude, slots } = req.body;

      const location = [];
      location.push(longitude);
      location.push(latitude);

      const locker = await LockerService.create(name, location, slots);

      return res.send(locker);
    }
  );
}

async function routes(router) {
  router.get(
    '/:lockerId/commands',
    {
      schema: {
        summary: "Get locker's controller command queue.",
        tags: ['Lockers'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            lockerId: { type: 'string' },
          },
        },

        body: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              pin: { type: 'number' },
              action: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { lockerId } = req.params;
      const { key } = req.headers;

      const commands = await LockerService.getCommands(lockerId, key);

      return res.send(commands);
    }
  );

  router.register(protectedRoutes);
}

module.exports = routes;
