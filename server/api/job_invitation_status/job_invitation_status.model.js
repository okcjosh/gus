/* eslint-disable camelcase */
'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('JobInvitationStatus', {
    job_invitation_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
}
