module.exports = (sequelize, DataTypes) => {
  sequelize.define('Motivation', {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
  });

  const { Motivation, Strategy } = sequelize.models;

  Strategy.hasMany(Motivation, { as: 'motivations' });
  Motivation.belongsTo(Strategy);
  return sequelize;
};
