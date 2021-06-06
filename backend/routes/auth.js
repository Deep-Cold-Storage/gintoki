const AuthService = require('../services/AuthService');

async function routes(router) {
  router.post(
    '/magic',
    {
      schema: {
        summary: 'Send the magic email to the user.',
        tags: ['Auth'],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
          },
          required: ['email'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              email: { type: 'string' },
            },
          },

          429: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { email } = req.body;

      const { success } = await AuthService.sendEmail(email);

      if (success) {
        return res.send({ email: email });
      }

      return res.code(429).send({ msg: 'Too Many Requests' });
    }
  );

  router.post(
    '/magic/:code',
    {
      schema: {
        summary: 'Validate magic code and retrieve JWT.',
        tags: ['Auth'],
        params: {
          type: 'object',
          properties: {
            code: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              authToken: { type: 'string' },
            },
          },

          403: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { code } = req.params;

      const { success, token } = await AuthService.validateMagic(code);

      if (success) {
        return res.send({ authToken: token });
      }

      return res.code(403).send({ msg: 'Invalid magic token!' });
    }
  );
}

module.exports = routes;
