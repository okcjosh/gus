/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cocknballs', {
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
    info: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'Cocknballs'
  });
};
