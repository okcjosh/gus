/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leo', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'leo'
    },
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'department',
        key: 'department_id'
      }
    },
    dislikes: {
      type: DataTypes.STRING
    },
    year_started: {
      type: 'YEAR(4)',
      allowNull: true
    },
    lastGig: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phone_verified: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'leo'
  });
};
