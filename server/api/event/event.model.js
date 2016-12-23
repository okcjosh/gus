'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Event', {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    venue: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    point_of_contact: DataTypes.STRING,
    job_type: DataTypes.STRING,
    job_type_specs: DataTypes.STRING,
    prefered_officer_name: DataTypes.STRING,
    is_recuring: DataTypes.BOOLEAN,
    recuring_data: DataTypes.STRING,
    date: DataTypes.DATE,
    // address: DataTypes.STRING,
    // job_type: DataTypes.STRING,
    // status: DataTypes.STRING,
    // event_type: DataTypes.STRING,
    // crowd_security: DataTypes.STRING,
    // special_patrols: DataTypes.STRING,
    // traffic_direction: DataTypes.STRING,
    // escorts: DataTypes.STRING,
    // asset_protection: DataTypes.STRING,
    // officer_needed: DataTypes.STRING,
    // hours_expected: DataTypes.STRING,
    // crowd_size: DataTypes.STRING,
    // officer_attire: DataTypes.STRING,
    // officer_skillset: DataTypes.STRING,
    // language: DataTypes.STRING,
    // operational_details: DataTypes.STRING
  });
}
