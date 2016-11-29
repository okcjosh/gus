/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';

let Thing = sqldb.Thing;
let User = sqldb.User;
let Event = sqldb.Event;

let Leo = sqldb.Leo;
// let DeptPreference = sqldb.DeptPreference;
// // let DefDeptPreference = sqldb.DefDeptPreference;
// let Department = sqldb.Department;
//
// let Job = sqldb.Job;
// let JobType = sqldb.JobType;
// let JobInvitationStatus = sqldb.JobInvitationStatus;
// let JobInvitation = sqldb.JobInvitation;
let JobTypePreference = sqldb.JobTypePreference;
// let LeoScheduling = sqldb.LeoScheduling;
// let Status = sqldb.Status;
// let SeniorityClass = sqldb.SeniorityClass;
// let NewAppt = sqldb.NewAppt;

JobTypePreference.sync()
  .then(() => JobTypePreference.destroy({where: {}}))
  .then(() => {
    JobTypePreference.bulkCreate([{
      leo_id: '1',
      job_type_id: '2',
    }, {
      leo_id: '3',
      job_type_id: '4',
    }])
      .then(() => {
        console.log('finished populating JOB_TYPE_PREFS');
      });
  });

Thing.sync()
  .then(() =>
    Thing.destroy({where: {}})
  )
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
      + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
      + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
      + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
      + 'tests alongside code. Automatic injection of scripts and '
      + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
      + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
      + 'payload, minifies your scripts/css/images, and rewrites asset '
      + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
      + 'and openshift subgenerators'
    }])
      .then(() => {
        console.log('finished populating THINGS');
      });
  });

User.sync()
  .then(() => User.destroy({where: {}}))
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
    }])
      .then(() => {
        console.log('finished populating USERS');
      });
  });

Event.sync()
  .then(() => Event.destroy({where: {}}))
  .then(() => {
    Event.bulkCreate([{
      eventTitle: 'Football A3',
      date: '10/31/2016',
      location_desc: 'Cowboys Stadium',
      address: '123 Go Fuck Yourself Way',
      department_id: 'DPD',
      status_id: 'ABC123',
      leo_id: 'BALLZ'
    }, {
      eventTitle: 'After Church Gangbang',
      date: '11/31/2016',
      location_desc: 'First GOP Baptist',
      address: '123 Go Fuck Yourself Way',
      department_id: 'OKCPD',
      status_id: 'ABC124',
      leo_id: 'Deepthroat'
    }, {
      eventTitle: 'Make America Great Again Rally',
      date: '12/31/2016',
      location_desc: 'Satans House',
      address: '666 LULZ Drive',
      department_id: 'DPD',
      status_id: 'ABC125',
      leo_id: 'Boomer'
    }])
      .then(() => {
        console.log('finished populating EVENTS');
      });
  });

Leo.sync()
  .then(() => Leo.destroy({where: {}}))
  .then(() => {
    Leo.bulkCreate([{

      name: 'Joe McJoseph',
      phone: '+14056844042',
      email: 'joe@joe.com',
      department_name: 'DALLASPD',
      year_started: '2011',
      lastGig: '01/01/11'
    }, {
      name: 'Police Officer',
      phone: '+14056844042',
      email: 'test@test.com',
      department_name: 'DALLASPD',
      year_started: '2011',
      lastGig: '02/02/22'
    }, {
      name: 'Mr. Rogers',
      phone: '+14056844042',
      email: 'test@test.com',
      department_name: 'DALLASPD',
      year_started: '2011',
      lastGig: '03/03/33'
    }, {
      name: 'Sargent McGruff',
      phone: '+14056844042',
      email: 'test@test.com',
      department_name: 'DALLASPD',
      year_started: '2011',
      lastGig: '04/04/44'
    }, {
      name: 'Five Ohh',
      phone: '+14056844042',
      email: 'test@test.com',
      department_name: 'DALLASPD',
      year_started: '2011',
      lastGig: '05/05/55'
    }, {
      name: 'Lethal Weapon ',
      phone: '+14056844042',
      email: 'test@test.com',
      department_name: 'DALLASPD',
      year_started: '2011',
      lastGig: '05/06/66'
    }])
      .then(() => {
        console.log('finished populating LEOS');
      });
  });

// DefDeptPreference.sync()
//   .then(() => DefDeptPreference.destroy({where: {}}))
//   .then(() => {
//     DefDeptPreference.bulkCreate([{
//       name: 'Seniority',
//       description: 'Officers on the job longer get more preference',
//       active: '1'
//     }, {
//       name: 'Gung-Ho',
//       description: 'How much captain america DICK the officer has',
//       active: '0'
//     }, {
//       name: 'CHIPS',
//       description: 'Cops on Goofy Motorcycles',
//       active: '1'
//     }])
//       .then(() => {
//         console.log('finished populating DEF_DEPT_PREFS');
//       });
//   });

// JobType.sync()
//   .then(() => JobType.destroy({where: {}}))
//   .then(() => {
//     JobType.bulkCreate([{
//       name: 'Concert',
//       description: 'Rock & Roll',
//     }, {
//       name: 'Parade',
//       description: 'Happy Birthday America',
//     }])
//       .then(() => {
//         console.log('finished populating JOB_TYPES');
//       });
//   });

// JobInvitationStatus.sync()
//   .then(() => JobInvitationStatus.destroy({where: {}}))
//   .then(() => {
//     JobInvitationStatus.bulkCreate([{
//       name: 'Accepted',
//       description: 'Officer Accepts Invitation',
//     }, {
//       name: 'Declined',
//       description: 'Officer Declines Invitation',
//     }, {
//       name: 'Expired',
//       description: 'Invitation has Expired',
//     }])
//       .then(() => {
//         console.log('finished populating JOB_INVITATION_STATUSES');
//       });
//   });
//
// Department.sync()
//   .then(() => Department.destroy({where: {}}))
//   .then(() => {
//     Department.bulkCreate([{
//       name: 'OKCPD',
//       address: '123 Abc Street, OKC OK 12345'
//     }, {
//       name: 'DALLASPD',
//       address: '123 Abc Street, DALLAS TX 88888'
//     }])
//       .then(() => {
//         console.log('finished populating DEPARTMENTS');
//       });
//   });
//
// Status.sync()
//   .then(() => Status.destroy({where: {}}))
//   .then(() => {
//     Status.bulkCreate([{
//       name: 'Pending',
//       description: 'Go Fuck Yourself',
//     }, {
//       name: 'Scheduled',
//       description: 'On the TODO List',
//     }, {
//       name: 'Rejected',
//       description: 'Fuck Off',
//     }, {
//       name: 'Accepted',
//       description: 'OK',
//     }, {
//       name: 'Completed',
//       description: 'Get Money',
//     }])
//       .then(() => {
//         console.log('finished populating STATUSES');
//       });
//   });
//
// Job.sync()
//   .then(() => Job.destroy({where: {}}))
//   .then(() => {
//     Job.bulkCreate([{
//       date: '12/12/2019',
//       location: 'fairgrounds',
//       address: '123 abc street OKC, OK 73120',
//     }, {
//       date: '10/10/2020',
//       location: 'downtown',
//       address: '456 xyz street DALLAS, TX 90210',
//     }])
//       .then(() => {
//         console.log('finished populating JOBS');
//       });
//   });
//
// DeptPreference.sync()
//   .then(() => Status.destroy({where: {}}))
//   .then(() => {
//     DeptPreference.bulkCreate([{
//       value: '0',
//     }, {
//       value: '1',
//     }])
//       .then(() => {
//         console.log('finished populating DEPT_PREFS');
//       });
//   });
//
// JobInvitation.sync()
//    .then(() => {
//      return DeptPreference.destroy({ where: {} });
//    })
//    .then(() => {
//      JobInvitation.bulkCreate([{
//        job_id: '1',
//        leo_id: '1',
//        expires: '12/12/2017',
//        job_invitation_status_id: '1'
//      }]);
//    });
//
// SeniorityClass.sync()
//   .then(() => SeniorityClass.destroy({where: {}}))
//   .then(() => {
//     SeniorityClass.bulkCreate([{
//       name: 'Good Old Boys Club',
//       description: 'White Power',
//       Minimum_Years: '10',
//       Maximum_Years: '20',
//       rank: 'Grand Wizard',
//     }, {
//       name: 'GreenHorn Club',
//       description: 'Pledges Apply Here',
//       Minimum_Years: '1',
//       Maximum_Years: '5',
//       rank: 'Private Pile',
//     }])
//       .then(() => {
//         console.log('finished populating SENIORITY_CLASSES');
//       });
//   });
//
//
// NewAppt.sync()
//   .then(() => NewAppt.destroy({where: {}}))
//   .then(() => {
//     NewAppt.bulkCreate([{
//       assigned_officer: 'Car RamRod',
//       accepted: 'TRUE'
//     }, {
//       assigned_officer: 'Private Pile',
//       accepted: 'FALSE'
//     }])
//       .then(() => {
//         console.log('finished populating NEW_APPTS');
//       });
//   });
//
// LeoScheduling.sync()
//   .then(() => LeoScheduling.destroy({where: {}}))
//   .then(() => {
//     LeoScheduling.bulkCreate([{
//       start_date: '1/1/1980',
//       end_date: '1/1/2020',
//       active: 'TRUE',
//     }, {
//       start_date: '10/10/1950',
//       end_date: '10/10/2010',
//       active: 'FALSE',
//     }])
//       .then(() => {
//         console.log('finished populating LEO_SCHEDULING');
//       });
//   });
//

