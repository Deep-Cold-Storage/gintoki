const LockerService = require('../services/LockerService');

async function routes(router) {
  router.register(require('../hooks/authHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get the all the lockers.',
        tags: ['Lockers'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const lockers = await LockerService.getAll();

      return res.send(lockers);
    }
  );
}

module.exports = routes;
