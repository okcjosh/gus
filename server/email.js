const fs = require('fs');
const mailer = require('nodemailer');

const Leo = require('./sqldb').Leo;

const EMAIL_TEMPLATES_DIR = 'server/email-templates';

const DEV_SERVER = '';
const REAL_SERVER = 'http://es4.io';
const LOCAL_SERVER = '192.168.0.17';

let transport = mailer.createTransport({
  host: 'mail.ontinuity.co.uk',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: 'do_not_reply@myofficers.com',
    pass: '@AcHa+4eqE4r'
  }
});

function sendInvitationEmail(invitation) {
  console.log('Sending email for event: ' + invitation.event_id);

  Leo.find({ where: { _id: invitation.leo_id } })
    .then(leo => {
      fs.readFile(`${EMAIL_TEMPLATES_DIR}/job-notification.html`, function(err, data) {
        if(!err) {
          let emailTemplate = data.toString().slice(0);
          emailTemplate = emailTemplate.replace(
            '{{INVITATION_URL}}',
            `${REAL_SERVER}/invitation/${invitation._id}/event/${invitation.event_id}`
          );
          sendEmail(leo.email, 'ES4 Job Notification', emailTemplate);
        } else {
          console.log(`Error reading file: ${err}`);
        }
      });
    });
}

// Event with Included User field
function sendEventCompletionEmail(event) {
  console.log('Sending email for completion of event: ' + event);

  fs.readFile(`${EMAIL_TEMPLATES_DIR}/job-notification.html`, function(err, data) {
    if(!err) {
      let emailTemplate = data.toString().slice(0);
      // Do replace of whatever is needed
      // tempEmail = tempEmail.replace("/invitation/", "/invitation/" + event.party_id);

      // event.User.email for Customer that registered the event
      sendEmail(event.User.email, 'ES4 Event Completion Notification', emailTemplate);
      // event.email for the coordinator of the event
      sendEmail(event.email, 'ES4 Event Completion Notification', emailTemplate);
    } else {
      console.log(`Error reading file: ${err}`);
    }
  });
}

function sendEmail(to, subject, body) {
  let mailoptions = {
    from: 'es4mailer@gmail.com',
    to,
    subject,
    html: body
  };
  transport.sendMail(mailoptions, function(err, info) {
    if(err) {
      console.log(err);
    } else {
      console.log(`Mail sent: ${info.response}`);
    }
  });
}

module.exports = {
  transport,
  sendEmail,
  sendInvitationEmail,
  sendEventCompletionEmail
};
