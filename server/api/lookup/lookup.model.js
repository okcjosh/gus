/* eslint-disable camelcase */
'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Lookup', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    extra_officers: DataTypes.INTEGER,
    show_notes: DataTypes.BOOLEAN
  });
}
