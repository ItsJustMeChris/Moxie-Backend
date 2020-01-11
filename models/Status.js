module.exports = (sequelize, DataTypes) => {
  sequelize.define('Status', {
    status: DataTypes.STRING,
    mood: DataTypes.INTEGER,
  });

  const { Status, Strategy } = sequelize.models;

  Strategy.hasMany(Status, { as: 'statuses' });
  Status.belongsTo(Strategy);
  return sequelize;
};
