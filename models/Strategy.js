module.exports = (sequelize, DataTypes) => {
  sequelize.define('Strategy', {
    name: DataTypes.STRING,
  });
  return sequelize;
};
