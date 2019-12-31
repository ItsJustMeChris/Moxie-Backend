const Sequelize = require('sequelize');

module.exports = async (fastify) => {
  fastify.db.define('Strategy', {
    name: Sequelize.STRING,
  });
};
