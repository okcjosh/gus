
var util = require('util'),
  braintree = require('braintree');
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379',
});

gateway.transaction.sale({
    amount: '666.00',
    paymentMethodNonce: "nonce-from-the-client",
    options: {
      submitForSettlement: true
    }
  },
  function(err, result) {
    if (result) {
      if (result.success) {
        console.log("Transaction ID: " + result.transaction.id)
      } else {
        console.log(result.message)
      }
    } else {
      console.log(err)
    }
  });
