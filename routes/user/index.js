/* eslint-disable global-require */
module.exports = async (fastify) => {
  fastify.register(require('./new'), { prefix: '/user' });
  fastify.register(require('./login'), { prefix: '/user' });
};
