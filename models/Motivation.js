const Sequelize = require('sequelize');

module.exports = async (fastify) => {
  fastify.db.define('Motivation', {
    name: Sequelize.STRING,
    link: Sequelize.STRING,
  });

  const { Motivation, Strategy } = fastify.db.models;

  Strategy.hasMany(Motivation, { as: 'motivations' });
  Motivation.belongsTo(Strategy);
};
