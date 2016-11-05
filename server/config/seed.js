/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;
var Event = sqldb.Event;
var Leo = sqldb.Leo;
var Status = sqldb.Status;
var DefDeptPreference = sqldb.DefDeptPreference;
var Department = sqldb.Department;
var DeptPreference = sqldb.DeptPreference;
var SeniorityClass = sqldb.SeniorityClass;
var Job = sqldb.Job;
var JobInvitation = sqldb.JobInvitation;
var JobInvitationStatus = sqldb.JobInvitationStatus;
var JobType = sqldb.JobType;
var NewAppt = sqldb.NewAppt;
var LeoScheduling = sqldb.LeoScheduling;
var JobTypePreference = sqldb.JobTypePreference;
Thing.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
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
    }]);
  });

Event.sync()
  .then(() => {
    return Event.destroy({ where: {} });
  })
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
    }]);
  });

Leo.sync()
  .then(() => {
    return Leo.destroy({ where: {} });
  })
  .then(() => {
    Leo.bulkCreate([{
      name: 'Joe McJoseph',
      phone: '+14056844042',
      email: 'joe@joe.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '01/01/11'
    }, {
      name: 'Police Officer',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '02/02/22'
    }, {
      name: 'Mr. Rogers',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '03/03/33'
    }, {
      name: 'Sargent McGruff',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '04/04/44'
    }, {
      name: 'Five Ohh',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '05/05/55'
    }, {
      name: 'Lethal Weapon ',
      phone: '+14056844042',
      email: 'test@test.com',
      department_id: 'DPD',
      year_started: '2011',
      lastGig: '05/06/66'
    }]);
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
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
      console.log('finished populating users');
    });
  });

Status.sync()
  .then(() => {
    return Status.destroy({ where: {} });
  })
  .then(() => {
    Status.bulkCreate([{
      name: 'Red Team Go',
      description: 'fill job ASAP',
    }, {
      name: 'Need a cop to stand around',
      description: 'Furniture store grand openings, car shows, other non exciting events',
    }]);
  });


SeniorityClass.sync()
   .then(() => {
     return SeniorityClass.destroy({ where: {} });
   })
  .then(() => {
    SeniorityClass.bulkCreate([{
      name: 'CHIPS Level of Cops',
      minimum_years: '3',
      maximum_years: '7',
      rank: 'Full Tard',
    }, {
      name: 'Mean Cops',
      minimum_years: '1',
      maximum_years: '10',
      rank: 'Black Lives Matter',
    }]);
  });

NewAppt.sync()
  .then(() => {
    return  NewAppt.destroy({ where: {} });
  })
  .then(() => {
    NewAppt.bulkCreate([{

      assigned_officer: 'mcGruff',
      accepted: 'T',
    }, {

      assigned_officer: 'Knight',
      accepted: 'F',
    }]);
  });

LeoScheduling.sync()
  .then(() => {
    return LeoScheduling.destroy({where: {}});
  })
  .then(() => {
    LeoScheduling.bulkCreate([{

      start_date: '12/12/2012',
      end_date: '12/13/2012',
      active: 'T',
    }, {

      start_date: '12/20/2012',
      end_date: '12/23/2012',
      active: 'T',
    }]);
  });


JobType.sync()
  .then(() => {
    return  JobType.destroy({ where: {} });
  })
  .then(() => {
    JobType.bulkCreate([{

      name: 'Gun Show',
      description: 'Make America Great Again Rally w/Gun Nuts'
    }, {

      name: 'Orange Bowl',
      description: 'BOOMER SOONER'
    }]);
  });

JobInvitationStatus.sync()
  .then(() => {
    return JobInvitationStatus.destroy({ where: {} });
  })
  .then(() => {
    JobInvitationStatus.bulkCreate([{

      name: 'TESTING mcTesterton',
      description: 'ISIS Bride Gala and Auction'
    }, {

      name: 'Cannibus Cup',
      description: 'Bulldog Cafe, Amsterdams 2018 Cannibus Cup'
    }]);
  });

DefDeptPreference.sync()
  .then(() => {
    return  DefDeptPreference.destroy({ where: {} });
  })
  .then(() => {
    DefDeptPreference.bulkCreate([{

      name: 'Bible Study',
      description: 'Afterschool Gangbang',
      active: 'T',
    }, {

      name: 'Marathon',
      description: 'Vote Gay',
      active: 'T',
    }]);
  });

JobInvitation.sync()
  .then(() => {
    return  JobInvitation.destroy({ where: {} });
  })
  .then(() => {
    JobInvitation.bulkCreate([{

      job_id: {
        references: {
          model: 'job',
          key: 'job_id'
        }
      },
      leo_id: {
        references: {
          model: 'leo',
          key: 'leo_id'
        }
      },
      expires: '12/12/2018'
    }]);
  });

DeptPreference.sync()
  .then(() => {
    return  DeptPreference.destroy({ where: {} });
  })
  .then(() => {
    DeptPreference.bulkCreate([{

      references: {
        model: 'def_dept_preferences',
        key: 'preference_id',
      department_id: 'DallasPD',
      references: {
        model: 'department',
        key: 'department_id',
        value: 'BLAHBLAHBLAH',
      }}
    }]);
  });
Department.sync()
  .then(() => {
    return  Department.destroy({ where: {} });
  })
  .then(() => {
    Department.bulkCreate([{
      name: 'OKCPD',
      address: '123abc street',
    }])
  });


