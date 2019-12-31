const Sequelize = require('sequelize');

module.exports = async (fastify) => {
  fastify.db.define('Comment', {
    comment: Sequelize.STRING,
  });

  const {
    Comment,
    User,
    Strategy,
    Status,
  } = fastify.db.models;

  User.hasMany(Comment, { as: 'comments' });
  Comment.hasMany(Comment, { as: 'comments' });
  Strategy.hasMany(Comment, { as: 'comments' });
  Status.hasMany(Comment, { as: 'comments' });

  Comment.belongsTo(User);
  Comment.belongsTo(Comment);
  Comment.belongsTo(Strategy);
  Comment.belongsTo(Status);
};
