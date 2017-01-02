'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('JobInvitation', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // job_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false,
    //   references: {
    //     model: 'job',
    //     key: 'job_id'
    //   }
    // },

    party_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      // references: {
      //   model: 'event',
      //   key: 'event_id'
      // }
    },
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      // references: {
      //   model: 'Leo',
      //   key: '_id'
      // }
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },

    pick: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },

    job_invitation_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      default: 1
    }
  }, {
    tableName: 'JobInvitation'
  });
}
