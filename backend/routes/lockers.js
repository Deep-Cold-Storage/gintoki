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

  router.get(
    '/:lockerId',
    {
      schema: {
        summary: 'Get locker by Id.',
        tags: ['Lockers'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { lockerId } = req.params;

      const locker = await LockerService.getOne(lockerId);

      return res.send(locker);
    }
  );

  router.get(
    '/:lockerId/slots',
    {
      schema: {
        summary: 'Get locker slots.',
        tags: ['Lockers'],
        security: [{ BearerAuth: [] }],
      },
    },
    async (req, res) => {
      const { lockerId } = req.params;

      const locker = await LockerService.getOne(lockerId);

      return res.send(locker.slots);
    }
  );
}

module.exports = routes;
