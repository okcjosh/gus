'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('JobInvitations', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      // references: {
      //   model: 'event',
      //   key: 'event_id'
      // }
    },
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Leo',
        key: '_id'
      }
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pick: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    btTransactionId: DataTypes.STRING,
    paymentStatus: DataTypes.STRING
  }, {
    tableName: 'JobInvitation'
  });
}
