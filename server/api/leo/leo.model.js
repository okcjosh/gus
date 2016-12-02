'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('leo', {
    leo_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
  },
    {
      tableName: 'leo'
    });
};

