'use strict';

export default function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_type_specs: DataTypes.STRING,

    status_id: DataTypes.INTEGER(11),

    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    point_of_contact: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    prefered_officer_name: DataTypes.STRING,
    is_recuring: DataTypes.BOOLEAN,
    recuring_data: DataTypes.STRING,
    date: DataTypes.DATE,
    crowd_size: DataTypes.INTEGER(11),
    officer_arrival_time: DataTypes.STRING,
    hours_expected: DataTypes.INTEGER(11),
    officer_attire: DataTypes.STRING,

    alchohol: DataTypes.STRING,
    barricades: DataTypes.STRING,
    police_vehicle: DataTypes.STRING,
    amplified_sound: DataTypes.STRING,

    operational_details: DataTypes.STRING


    // address: DataTypes.STRING,
    // job_type: DataTypes.STRING,
    // status_id: {
    //   type: DataTypes.INTEGER(11),
    //   references: {
    //     model: "status",
    //     key: "status_id"
    //   }
    // }
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
  return Event;
}
