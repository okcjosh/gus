/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_invitation', {
    job_invitation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'job',
        key: 'job_id'
      }
    },
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'leo',
        key: 'leo_id'
      }
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    job_invitation_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'job_invitation_status',
        key: 'job_invitation_status_id'
      }
    }
  }, {
    tableName: 'job_invitation'
  });
};
