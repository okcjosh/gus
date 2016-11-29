'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('job_type_preferences', {
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'leo',
        key: 'leo_id'
      }
    },
    job_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'job_type',
        key: 'job_type_id'
      }
    }
  }, {
    tableName: 'job_type_preferences'
  });
};
