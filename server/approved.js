let braintree = require('braintree');
let environment, gateway;

gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379'
});

module.exports = gateway;




gateway.webhookNotification.parse(btSignature, btPayload, function (err, webhookNotification) {
  webhookNotification.kind === braintree.WebhookNotification.Kind.SubMerchantAccountApproved
   true
  webhookNotification.merchantAccount.status
   "active"
  webhookNotification.merchantAccount.id
   "blueLaddersStore"
  webhookNotification.merchantAccount.masterMerchantAccount.id
   "14laddersMarketplace"
  notification.merchantAccount.masterMerchantAccount.status
   "active"
});
