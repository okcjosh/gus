/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leo_scheduling', {
    leo_scheduling_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'leo',
        key: 'leo_id'
      }
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'leo_scheduling'
  });
};
