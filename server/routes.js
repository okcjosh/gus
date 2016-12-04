'use strict';
import errors from './components/errors';
import path from 'path';
let braintree = require('braintree');
const flash = require('connect-flash');
let gateway = require('./gateway');

let TRANSACTION_SUCCESS_STATUSES = [
  braintree.Transaction.Status.Authorizing,
  braintree.Transaction.Status.Authorized,
  braintree.Transaction.Status.Settled,
  braintree.Transaction.Status.Settling,
  braintree.Transaction.Status.SettlementConfirmed,
  braintree.Transaction.Status.SettlementPending,
  braintree.Transaction.Status.SubmittedForSettlement
];

export default function(app) {
  app.use(flash());
  app.use('/api/leos', require('./api/leo'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/cocknballs', require('./api/cocknball'));
  app.use('/api/def_dept_preferences', require('./api/def_dept_preferences'));
  app.use('/api/dept_preferences', require('./api/dept_preferences'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/jobs', require('./api/job'));
  app.use('/api/invitations', require('./api/job_invitation'));
  app.use('/api/job_invitation_status', require('./api/job_invitation_status'));
  app.use('/api/job_types', require('./api/job_type'));
  app.use('/api/job_type_preferences', require('./api/job_type_preference'));
  app.use('/api/leo_scheduling', require('./api/leo_scheduling'));
  app.use('/api/new_appts', require('./api/new_appt'));
  app.use('/api/seniority_class', require('./api/seniority_class'));
  app.use('/api/status', require('./api/status'));
  app.use('/auth', require('./auth').default);
  function formatErrors() {
    let formattedErrors = '';

    for (let i in errors) { // eslint-disable-line no-inner-declarations, lets-on-top
      if (errors.hasOwnProperty(i)) {
        formattedErrors += 'Error: ' + errors[i].code + ': ' + errors[i].message + '\n';
      }
    }
    return formattedErrors;
  }

  function createResultObject(transaction) {
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


  // app.post('/checkout_/token', function (req, res) {
  //   gateway.clientToken.generate({}, function (err, response) {
  //     // res.render('client/app/checkout_/checkout_', {clientToken: response.clientToken, messages: req.flash('error')});
  //   });
  // });

  app.post('/checkout/transaction/token', function (request, response) {
    gateway.clientToken.generate({}, function (err, res) {
      if (err) throw err;
      response.json(res.clientToken);
      console.log(res.clientToken);
    });
  });

  app.get('/transaction/:id', function (req, res) {
    let result;
    let transactionId = req.params.id;

    gateway.transaction.find(transactionId, function (err, transaction) {
      result = createResultObject(transaction);
      //console.log(transaction);
      console.log(result);
      // res.render('client/app/checkout_/checkout_/show', {transaction: transaction, result: result});
      //res.render('./checkout/transaction/transaction', {transaction:transaction});
      //res.redirect('/checkout/transaction', );
      res.json(transaction);

    });

  });

  app.post('/checkout', function (req, res) {
    let transactionErrors;
    let amount = req.body.amount; // In production you should not take amounts directly from clients
    let nonce = req.body.payment_method_nonce;
    console.log('nonce = ' +  nonce);

    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if (result.success || result.transaction) {
        let resultOb = createResultObject(result.transaction);
        console.log('result: ');
        console.log(resultOb);
        //res.redirect('transaction/' + result.transaction.id);
        res.redirect('/checkout/transaction?tranid=' + result.transaction.id);
      } else {
        transactionErrors = result.errors.deepErrors();
        req.flash('error', {msg: formatErrors(transactionErrors)});

      }
    });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}


