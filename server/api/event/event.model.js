'use strict';

export default function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    job_type_specs: DataTypes.STRING,
    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    point_of_contact: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    prefered_officer_name: DataTypes.STRING,
    is_recuring: DataTypes.BOOLEAN,
    recuring_collection_id: DataTypes.STRING,
    date: DataTypes.DATE,
    crowd_size: DataTypes.INTEGER(11),
    officer_arrival_time: DataTypes.STRING,
    hours_expected: DataTypes.INTEGER(11),
    officer_attire: DataTypes.STRING,
    interested_officers: DataTypes.STRING,
    alcohol: DataTypes.STRING,
    barricades: DataTypes.STRING,
    police_vehicle: DataTypes.STRING,
    amplified_sound: DataTypes.STRING,

    operational_details: DataTypes.STRING,

    btTransactionId: DataTypes.STRING,
    paymentStatus: DataTypes.STRING
  }, {
    timestamps: true,
    instanceMethods: {
      // Hide password from JSON of user
      toJSON: function () {
        var e = Object.assign({}, this.get());
        if (e.User) {
          delete e.User.password;
          delete e.User.provider;
          delete e.User.salt;
          delete e.User.facebook;
          delete e.User.twitter;
          delete e.User.google;
          delete e.User.github;
        }

        return e;
      },
    }
  });
  Event.seq = sequelize;
  return Event;
}
