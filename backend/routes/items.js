const ItemService = require('../services/ItemService');

async function routes(router) {
  router.register(require('../hooks/authHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get all items owned by user.',
        tags: ['Items'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const items = await ItemService.getAll(req.userId);

      return res.send(items);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Insert a new item to the locker.',
        tags: ['Items'],
        security: [{ BearerAuth: [] }],

        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            lockerId: { type: 'string' },
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
        return res.send({ msg: 'Failure! No free slots available.' });
      }
    }
  );

  router.delete(
    '/:itemId',
    {
      schema: {
        summary: 'Retrieve a item from the locker.',
        tags: ['Items'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { itemId } = req.params;

      const { success } = await ItemService.retrieveItem(req.userId, itemId);

      if (success) {
        return res.send({ msg: 'Success!' });
      } else {
        return res.send({ msg: 'Failure!' });
      }
    }
  );
}

module.exports = routes;
