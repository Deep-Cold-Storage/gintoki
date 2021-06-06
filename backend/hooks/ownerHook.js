const fp = require('fastify-plugin');
const projects = require('../models/projects');

module.exports = fp(function (fastify, options, next) {
  fastify.addHook('onRequest', async (req, res) => {
    const { projectId } = req.params;

    let project = await projects.findOne({ _id: projectId, _userId: req.userId });

    if (!project) {
      return res.code(403).send({ msg: 'Permissions not sufficient for this operation!' });
    } else {
      next();
    }
  });

  next();
});
