/* jshint indent: 2 */

export default function(sequelize, DataTypes) {
  return sequelize.define('leo', {
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'department',
        key: 'department_id'
      }
    },
    year_started: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastGig: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'leo',
  });
};


