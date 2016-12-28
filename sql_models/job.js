/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job', {
    job_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'job_type',
        key: 'job_type_id'
      }
    },
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
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'department',
        key: 'department_id'
      }
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'leo',
        key: 'leo_id'
      }
    }
  }, {
    tableName: 'job'
  });
};
