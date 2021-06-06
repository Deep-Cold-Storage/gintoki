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
      const items = await ItemService.getUsersAll(req.userId);

      return res.send(items);
    }
  );
}

module.exports = routes;
