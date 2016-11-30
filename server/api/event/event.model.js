'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Event', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventTitle: DataTypes.STRING,
    date: DataTypes.DATE,
    location_desc: DataTypes.STRING,
    address: DataTypes.BOOLEAN,
    job_type: DataTypes.STRING,
    one_field: DataTypes.STRING,
    two_field: DataTypes.STRING,
    three_field: DataTypes.STRING,
    four_field: DataTypes.STRING,
    five_field: DataTypes.STRING,
    six_field: DataTypes.STRING,
    seven_field: DataTypes.STRING,
    eight_field: DataTypes.STRING,
    nine_field: DataTypes.STRING,
    ten_field: DataTypes.STRING,
    eleven_field: DataTypes.STRING,
    twelve_field: DataTypes.STRING,
    ryan_is_a_dick_field: DataTypes.STRING,
  });
}
