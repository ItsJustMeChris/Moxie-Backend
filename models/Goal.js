module.exports = (sequelize, DataTypes) => {
  sequelize.define('Goal', {
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
  });

  const { Goal, Strategy } = sequelize.models;

  Strategy.hasMany(Goal, { as: 'goals' });
  Goal.belongsTo(Strategy);
  return sequelize;
};
