/* eslint-disable handle-callback-err */
let braintree = require('braintree');
let gateway;

gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379'
});

module.exports = gateway;


function btSignature() {
}
function btPayload() {
}


gateway.webhookNotification.parse(btSignature, btPayload, (err, webhookNotification) => {
  //noinspection JSUnusedAssignment,BadExpressionStatementJS
  webhookNotification.kind === braintree.WebhookNotification.Kind.SubMerchantAccountApproved;
  //noinspection BadExpressionStatementJS
  true;
  //noinspection JSUnusedAssignment,BadExpressionStatementJS
  webhookNotification.merchantAccount.status;
  //noinspection BadExpressionStatementJS
  'active';
  //noinspection JSUnusedAssignment,BadExpressionStatementJS
  webhookNotification.merchantAccount.id;
  //noinspection BadExpressionStatementJS
  'blueLaddersStore';
  //noinspection JSUnusedAssignment,BadExpressionStatementJS
  webhookNotification.merchantAccount.masterMerchantAccount.id;
  //noinspection BadExpressionStatementJS
  '14laddersMarketplace';
  let notification;
  //noinspection JSUnusedAssignment,BadExpressionStatementJS
  notification.merchantAccount.masterMerchantAccount.status;
  //noinspection BadExpressionStatementJS
  'active';
});
