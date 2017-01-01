'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Transaction', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    transaction_id: DataTypes.STRING,
    transaction_status: DataTypes.STRING
  });
}
