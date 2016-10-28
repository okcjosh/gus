/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sessions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Sessions'
  });
};
