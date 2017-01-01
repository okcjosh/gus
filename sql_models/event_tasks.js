/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event_tasks', {
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references: {
        model: 'status',
        key: 'status_id'
      }
    },
    EventEventId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references: {
        model: 'Events',
        key: 'event_id'
      }
    }
  }, {
    tableName: 'event_tasks'
  });
};
