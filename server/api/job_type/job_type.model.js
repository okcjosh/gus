'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('job_type', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    base_price: DataTypes.INTEGER(11),
    officer_rate: DataTypes.INTEGER(11),
    crowd_rate: DataTypes.INTEGER(11),
    hour_rate: DataTypes.INTEGER(11),
    alchohol: DataTypes.INTEGER(11),
    police_vehicle: DataTypes.INTEGER(11),
    barricade: DataTypes.INTEGER(11),
    amplified_sound: DataTypes.INTEGER(11)
  }, {
    tableName: 'job_type'
  });
}
