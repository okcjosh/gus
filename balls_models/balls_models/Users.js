/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'user'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    google: {
      type: DataTypes.STRING,
      allowNull: true
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Users'
  });
};
