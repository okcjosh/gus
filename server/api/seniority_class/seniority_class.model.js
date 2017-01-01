'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('SeniorityClass', {
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
    minimum_years: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    maximum_years: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  });
}
