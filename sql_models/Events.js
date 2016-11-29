/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Events', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    location_desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Events'
  });
};
