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
    department_id: DataTypes.STRING,
    status_id: DataTypes.STRING,
    leo_id: DataTypes.INTEGER
  });
}
