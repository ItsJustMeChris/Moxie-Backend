/* eslint-disable global-require */
module.exports = async (fastify) => {
  fastify.register(require('./new'), { prefix: '/user' });
};
