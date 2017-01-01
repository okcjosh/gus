'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('department', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'department'
  });
}
