'use strict';
import sqldb from '../sqldb';


let Job = sqldb.Job;
let JobType = sqldb.JobType;
let JobInvitationStatus = sqldb.JobInvitationStatus;
//let JobInvitation = sqldb.JobInvitation;
//let JobTypePreference = sqldb.JobTypePreference;

JobType.sync()
  .then(() => JobType.destroy({where: {}}))
  .then(() => {
    JobType.bulkCreate([{
      name: 'Concert',
      description: 'Rock & Roll',
    }, {
      name: 'Parade',
      description: 'Happy Birthday America',
    }])
      .then(() => {
        console.log('finished populating JOB_TYPES');
      });
  });

JobInvitationStatus.sync()
  .then(() => JobInvitationStatus.destroy({where: {}}))
  .then(() => {
    JobInvitationStatus.bulkCreate([{
      name: 'Accepted',
      description: 'Officer Accepts Invitation',
    }, {
      name: 'Declined',
      description: 'Officer Declines Invitation',
    }, {
      name: 'Expired',
      description: 'Invitation has Expired',
    }])
      .then(() => {
        console.log('finished populating JOB_INVITATION_STATUSES');
      });
  });

Job.sync()
  .then(() => Job.destroy({where: {}}))
  .then(() => {
    Job.bulkCreate([{
      date: '12/12/2019',
      location: 'fairgrounds',
      address: '123 abc street OKC, OK 73120',
    }, {
      date: '10/10/2020',
      location: 'downtown',
      address: '456 xyz street DALLAS, TX 90210',
    }])
      .then(() => {
        console.log('finished populating JOBS');
      });
  });
