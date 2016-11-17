/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
app.use('/api/leos', require('./api/leo'));
app.use('/api/events', require('./api/event'));
app.use('/api/things', require('./api/thing'));
app.use('/api/users', require('./api/user'));
app.use('/auth', require('./auth').default);
let braintree = require('braintree');
let environment, gateway;
require('dotenv').load();
environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + process.env.BT_ENVIRONMENT.slice(1);

gateway = braintree.connect({
  environment: braintree.Environment[environment],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
});


export let TRANSACTION_SUCCESS_STATUSES = [
  braintree.Transaction.Status.Authorizing,
  braintree.Transaction.Status.Authorized,
  braintree.Transaction.Status.Settled,
  braintree.Transaction.Status.Settling,
  braintree.Transaction.Status.SettlementConfirmed,
  braintree.Transaction.Status.SettlementPending,
  braintree.Transaction.Status.SubmittedForSettlement
];


export function formatErrors(errors) {
  let formattedErrors = '';

  for (let i in errors) { // eslint-disable-line no-inner-declarations, lets-on-top
    if (errors.hasOwnProperty(i)) {
      formattedErrors += 'Error: ' + errors[i].code + ': ' + errors[i].message + '\n';
    }
  }
  return formattedErrors;
}

export function createResultObject(transaction) {
  let result;
  let status = transaction.status;

  if (TRANSACTION_SUCCESS_STATUSES.indexOf(status) !== -1) {
    result = {
      header: 'Sweet Success!',
      icon: 'success',
      message: 'Your test transaction has been successfully processed. See the Braintree API response and try again.'
    };
  } else {
    result = {
      header: 'Transaction Failed',
      icon: 'fail',
      message: 'Your test transaction has a status of ' + status + '. See the Braintree API response and try again.'
    };
  }

  return result;
}

export default function(app) {
  // Insert routes below
  // app.use('/api/statuses', require('./api/status'));
  // app.use('/api/seniority_classes', require('./api/seniority_class'));
  // app.use('/api/new_appts', require('./api/new_appt'));
  // app.use('/api/leo_schedulings', require('./api/leo_scheduling'));
  // app.use('/api/job_type_preferences', require('./api/job_type_preference'));
  // app.use('/api/job_types', require('./api/job_type'));
  // app.use('/api/job_invitation_statuses', require('./api/job_invitation_status'));
  // app.use('/api/job_invitations', require('./api/job_invitation'));
  // app.use('/api/jobs', require('./api/job'));
  // app.use('/api/dept_preferences', require('./api/dept_preference'));
  // app.use('/api/departments', require('./api/department'));
  // app.use('/api/def_dept_preferences', require('./api/def_dept_preference'));



  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });


  app.post('/checkout', function (req, res) {
    let transactionErrors;
    let amount = req.body.amount; // In production you should not take amounts directly from clients
    let nonce = req.body.payment_method_nonce;

    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if (result.success || result.transaction) {
        res.redirect('/checkout/new');

      } else {
        transactionErrors = result.errors.deepErrors();
        req.flash('error', {msg: formatErrors(transactionErrors)});
        res.redirect('checkout/new');
      }
    });
  });

  app.post('/api/client_token/new', function (request, response) {
    gateway.clientToken.generate({}, function (err, res) {
      if (err) throw err;
      response.json(res.clientToken);
      console.log(res.clientToken);
    });
  });

   app.get('/checkout/show/:id', function (req, res) {
     let result;
     let transactionId = req.params.id;

     gateway.transaction.find(transactionId, function (err, transaction) {
       result = createResultObject(transaction);
       res.render('checkout/show/new', {transaction: transaction, result: result});
     });
   });
};
