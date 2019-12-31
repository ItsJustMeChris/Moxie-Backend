const Sequelize = require('sequelize');

module.exports = async (fastify) => {
  fastify.db.define('Status', {
    status: Sequelize.STRING,
    mood: Sequelize.INTEGER,
  });

  const { Status, Strategy } = fastify.db.models;

  Strategy.hasMany(Status, { as: 'statuses' });
  Status.belongsTo(Strategy);
};
