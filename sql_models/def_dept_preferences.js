/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('def_dept_preferences', {
    preference_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'def_dept_preferences'
  });
};
