'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('dept_preferences', {
    dept_pref_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    preference_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'def_dept_preferences',
        key: 'preference_id'
      }
    },
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'department',
        key: 'department_id'
      }
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'dept_preferences'
  });
};
