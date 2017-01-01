/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    notification_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    notification_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notification_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notification_confirmation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
};
