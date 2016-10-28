/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Leos', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    year_started: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastGig: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Leos'
  });
};
