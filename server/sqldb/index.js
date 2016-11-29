/**
 * Sequelize initialization module
 */

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

let db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Cocknball = db.sequelize.import('../api/cocknball/cocknball.model');
db.Session = db.sequelize.import('../api/session/session.model');
db.DeptPreferences = db.sequelize.import('../api/dept_preferences/dept_preferences.model');
db.DefDeptPreferences = db.sequelize.import('../api/def_dept_preferences/def_dept_preferences.model');
db.Status = db.sequelize.import('../api/status/status.model');
db.SeniorityClass = db.sequelize.import('../api/seniority_class/seniority_class.model');
db.NewAppt = db.sequelize.import('../api/new_appt/new_appt.model');
db.LeoScheduling = db.sequelize.import('../api/leo_scheduling/leo_scheduling.model');
db.JobTypePreference = db.sequelize.import('../api/job_type_preference/job_type_preference.model');
db.JobType = db.sequelize.import('../api/job_type/job_type.model');
db.JobInvitationStatus = db.sequelize.import('../api/job_invitation_status/job_invitation_status.model');
db.JobInvitation = db.sequelize.import('../api/job_invitation/job_invitation.model');
db.Job = db.sequelize.import('../api/job/job.model');
db.Department = db.sequelize.import('../api/department/department.model');
db.Leo = db.sequelize.import('../api/leo/leo.model');
db.Event = db.sequelize.import('../api/event/event.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
