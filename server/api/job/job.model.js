/* eslint-disable camelcase */
'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Job', {
    job_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // job_type_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false,
    //   references: {
    //     model: 'job_type',
    //     key: '_id'
    //   }
    // },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // department_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false,
    //   references: {
    //     model: 'department',
    //     key: '_id'
    //   }
    // },
    // status_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false,
    //   references: {
    //     model: 'status',
    //     key: '_id'
    //   }
    // },
    // leo_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: true,
    //   references: {
    //     model: 'leo',
    //     key: '_id'
    //   }
    // }
  });
}
