module.exports = (sequelize, DataTypes) => {
  sequelize.define('User', {
    name: DataTypes.STRING,
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  });

  const { User, SessionToken, Strategy } = sequelize.models;

  User.hasMany(User, { as: 'friends' });
  Strategy.belongsTo(User);
  User.hasMany(SessionToken, { as: 'token' });
  SessionToken.belongsTo(User);
  return sequelize;
};
