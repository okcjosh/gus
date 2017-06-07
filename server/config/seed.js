/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import {User} from '../sqldb';


User.sync()
  .then(() => User.destroy({
    where: {}
  }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'josh@myofficers.com',
      password: 'admin'
    }])
      .then(() => {
        console.log('finished populating USERS');
      });
  });

