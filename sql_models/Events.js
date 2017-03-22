/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Events', {
    event_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    point_of_contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    job_type_specs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prefered_officer_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_recuring: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    interested_officers: {
      type: DataTypes.STRING
    },
    recuring_data: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'Events'
  });
};
