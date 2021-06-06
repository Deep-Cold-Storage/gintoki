const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');

const config = require('../configs/config');

module.exports = fp(function (fastify, options, next) {
  fastify.addHook('onRequest', async (req, res) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
      const authToken = authHeader.split(' ')[1];

      jwt.verify(authToken, config.jwt.secret, (err, data) => {
        if (err) {
          return res.code(401).send({ msg: 'Invalid authorization Bearer token!' });
        }

        req.userId = data.userId;
        next();
      });
    } else {
      return res.code(401).send({ msg: 'Authorization Bearer token missing!' });
    }
  });
  next();
});
