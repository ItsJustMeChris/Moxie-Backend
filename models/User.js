const Sequelize = require('sequelize');

module.exports = async (fastify) => {
  fastify.db.define('User', {
    name: Sequelize.STRING,
    email: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
  });

  const { User, Strategy } = fastify.db.models;

  User.hasMany(User, { as: 'friends' });
  Strategy.belongsTo(User);
};
