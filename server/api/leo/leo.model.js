'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Leo', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    department_id: DataTypes.STRING,
    year_started: DataTypes.DATE,
    lastGig: DataTypes.DATE,
  })
}
