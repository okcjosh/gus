'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('NewAppt', {
    idnew_appt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    assigned_officer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accepted: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
}
