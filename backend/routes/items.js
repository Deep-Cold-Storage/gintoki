const ItemService = require('../services/ItemService');

async function routes(router) {
  router.register(require('../hooks/authHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get all items owned by the currently authenticated user.',
        tags: ['Items'],
        security: [{ BearerAuth: [] }],
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                owners: { type: 'array' },
                locker: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    location: { type: 'array' },
                  },
                },
                occupied: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const items = await ItemService.getAll(req.userId);

      return res.send(items);
    }
  );

  router.get(
    '/:itemId',
    {
      schema: {
        summary: 'Get item by ID, owned by the currently authenticated user.',
        tags: ['Items'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            itemId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              owners: { type: 'array' },
              locker: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  name: { type: 'string' },
                  location: { type: 'array' },
                },
              },
              occupied: { type: 'boolean' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { itemId } = req.params;

      const items = await ItemService.get(req.userId, itemId);

      return res.send(items);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Insert a new item into the locker.',
        tags: ['Items'],
        security: [{ BearerAuth: [] }],

        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            lockerId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              owners: { type: 'array' },
              locker: { type: 'object' },
              occupied: { type: 'boolean' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name, lockerId } = req.body;

      const { success } = await ItemService.addItem(req.userId, name, lockerId);

      if (success) {
        return res.send({ msg: 'Success!' });
      } else {
        return res.code(400).send({ msg: 'Failure! No free slots available.' });
      }
    }
  );

  router.delete(
    '/:itemId',
    {
      schema: {
        summary: 'Retrieve an item from the locker.',
        tags: ['Items'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            itemId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { itemId } = req.params;

      const { success } = await ItemService.retrieveItem(req.userId, itemId);

      if (success) {
        return res.send({ msg: 'Success!' });
      } else {
        return res.code(400).send({ msg: 'Failure!' });
      }
    }
  );
}

module.exports = routes;
