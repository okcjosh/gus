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
    status: DataTypes.STRING,
    event_type: DataTypes.STRING,
    crowd_security: DataTypes.STRING,
    special_patrols: DataTypes.STRING,
    traffic_direction: DataTypes.STRING,
    escorts: DataTypes.STRING,
    asset_protection: DataTypes.STRING,
    officer_needed: DataTypes.STRING,
    hours_expected: DataTypes.STRING,
    crowd_size: DataTypes.STRING,
    officer_attire: DataTypes.STRING,
    officer_skillset: DataTypes.STRING,
    language: DataTypes.STRING,
    operational_details: DataTypes.STRING
  });
}
