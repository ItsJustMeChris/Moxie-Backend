module.exports = (sequelize, DataTypes) => {
  sequelize.define('SessionToken', {
    token: { type: DataTypes.STRING, unique: true },
    ip: { type: DataTypes.STRING },
  });
  return sequelize;
};
