/**
 * Sequelize initialization module
 */

'use strict';

import config from "../config/environment";
import Sequelize from "sequelize";

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
// db.Status = db.sequelize.import('../api/status/status.model');
// db.SeniorityClass = db.sequelize.import('../api/seniority_class/seniority_class.model');
// db.NewAppt = db.sequelize.import('../api/new_appt/new_appt.model');
// db.LeoScheduling = db.sequelize.import('../api/leo_scheduling/leo_scheduling.model');
// db.JobTypePreference = db.sequelize.import('../api/job_type_preference/job_type_preference.model');
// db.JobType = db.sequelize.import('../api/job_type/job_type.model');
// db.JobInvitationStatus = db.sequelize.import('../api/job_invitation_status/job_invitation_status.model');
// db.JobInvitation = db.sequelize.import('../api/job_invitation/job_invitation.model');
// db.Job = db.sequelize.import('../api/job/job.model');
// db.DeptPreference = db.sequelize.import('../api/dept_preference/dept_preference.model');
// db.Department = db.sequelize.import('../api/department/department.model');
// db.DefDeptPreference = db.sequelize.import('../api/def_dept_preference/def_dept_preference.model');
db.Leo = db.sequelize.import('../api/leo/leo.model');
db.Event = db.sequelize.import('../api/event/event.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
