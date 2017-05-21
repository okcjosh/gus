// 'use strict';
/* eslint no-process-env:0 */

// Test specific configuration
// ===========================
module.exports = {
  sequelize: {
    uri: 'mysql://es4admin:es4admin@es4.clmk2ccz7ewv.us-west-2.rds.amazonaws.com:3306/es4_sheyi',
    options: {
      logging: false,
      storage: 'mysql',
      define: {timestamps: false}
    }
  }
};
