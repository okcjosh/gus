'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'mysql://es4admin:es4admin@es4.clmk2ccz7ewv.us-west-2.rds.amazonaws.com:3306/es4xxx',
    options: {
      logging: false,
      storage: 'mysql',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};

