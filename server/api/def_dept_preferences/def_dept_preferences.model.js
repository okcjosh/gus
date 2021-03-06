'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('DefDeptPreferences', {
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
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  });
}
