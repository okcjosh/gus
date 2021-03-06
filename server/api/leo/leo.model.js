/* eslint-disable camelcase */
'use strict';

import shortid from 'shortid';

export default function(sequelize, DataTypes) {
  return sequelize.define('Leo', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    merchantId: {
      type: DataTypes.STRING,
      defaultValue: shortid.generate
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    routingNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    btStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    password: {
      type: DataTypes.STRING
    },
    // department_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: true,
    //   references: {
    //     model: 'department',
    //     key: '_id'
    //   }
    // },
    dislikes: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'leo'
    },
    date_hired: {
      type: DataTypes.DATE,
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
  });
}
