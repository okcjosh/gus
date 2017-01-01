'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('LeoScheduling', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // leo_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false,
    //   references: {
    //     model: 'leo',
    //     key: '_id'
    //   }
    // },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  });
}
