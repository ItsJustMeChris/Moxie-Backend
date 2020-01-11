module.exports = (sequelize, DataTypes) => {
  sequelize.define('Comment', {
    comment: DataTypes.STRING,
  });

  const {
    Comment,
    User,
    Strategy,
    Status,
  } = sequelize.models;

  User.hasMany(Comment, { as: 'comments' });
  Comment.hasMany(Comment, { as: 'comments' });
  Strategy.hasMany(Comment, { as: 'comments' });
  Status.hasMany(Comment, { as: 'comments' });

  Comment.belongsTo(User);
  Comment.belongsTo(Comment);
  Comment.belongsTo(Strategy);
  Comment.belongsTo(Status);
  return sequelize;
};
