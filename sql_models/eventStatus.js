/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eventStatus', {
    status_id: {
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
    tableName: 'eventStatus'
  });
};
