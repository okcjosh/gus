/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_invitation', {
    job_invitation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    party_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
    pick: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_invitation_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'job_invitation'
  });
};
