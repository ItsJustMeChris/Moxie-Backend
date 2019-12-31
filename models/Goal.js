const Sequelize = require('sequelize');

module.exports = async (fastify) => {
  fastify.db.define('Goal', {
    name: Sequelize.STRING,
    start: Sequelize.DATE,
    end: Sequelize.DATE,
  });

  const { Goal, Strategy } = fastify.db.models;

  Strategy.hasMany(Goal, { as: 'goals' });
  Goal.belongsTo(Strategy);
};
