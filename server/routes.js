/**
 * Main application routes
 */

'use strict';

import errors from "./components/errors";
import path from "path";
import gateway, {formatErrors, createResultObject} from "./gateway";

export default function(app) {
  // Insert routes below
  app.use('/api/statuses', require('./api/status'));
  app.use('/api/seniority_classes', require('./api/seniority_class'));
  app.use('/api/new_appts', require('./api/new_appt'));
  app.use('/api/leo_schedulings', require('./api/leo_scheduling'));
  app.use('/api/job_type_preferences', require('./api/job_type_preference'));
  app.use('/api/job_types', require('./api/job_type'));
  app.use('/api/job_invitation_statuses', require('./api/job_invitation_status'));
  app.use('/api/job_invitations', require('./api/job_invitation'));
  app.use('/api/jobs', require('./api/job'));
  app.use('/api/dept_preferences', require('./api/dept_preference'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/def_dept_preferences', require('./api/def_dept_preference'));
  app.use('/api/leos', require('./api/leo'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });


  app.post('/api/checkout/new', function (req, res) {
    var transactionErrors;
    var amount = req.body.amount; // In production you should not take amounts directly from clients
    var nonce = req.body.payment_method_nonce;

    gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if (result.success || result.transaction) {
        res.redirect('/checkout/show/' + result.transaction.id);
        console.log('FUCK YOU')
      } else {
        transactionErrors = result.errors.deepErrors();
        req.flash('error', {msg: formatErrors(transactionErrors)});
        res.redirect('/');
        console.log('BLOW ME')
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
    var result;
    var transactionId = req.params.id;

    gateway.transaction.find(transactionId, function (err, transaction) {
      result = createResultObject(transaction);
      res.render('checkout/show/new', {transaction: transaction, result: result});
    });
  });
}
