/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Events_Z', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_specs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officer_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_recuring: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    data: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location_desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    event_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crowd_security: {
      type: DataTypes.STRING,
      allowNull: true
    },
    special_patrols: {
      type: DataTypes.STRING,
      allowNull: true
    },
    traffic_direction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    escorts: {
      type: DataTypes.STRING,
      allowNull: true
    },
    asset_protection: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officer_needed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hours_expected: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crowd_size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officer_attire: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officer_skillset: {
      type: DataTypes.STRING,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true
    },
    operational_details: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Events_Z'
  });
};
