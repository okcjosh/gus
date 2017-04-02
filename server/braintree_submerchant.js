/**
 * Created by joshuajohnson on 3/15/17.
 */
'use strict';

let braintree = require('braintree');
let environment, gateway;

gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'swvg9scjkhfhq9rs',
  publicKey: '78ghksfzt5z5hfcx',
  privateKey: '1f210164c4fff82b6da4c29131f30379'
});

module.exports = gateway;

var merchantAccountParams;
merchantAccountParams = {
  individual: {
    firstName: "Shye",
    lastName: "Doe",
    email: "sheyoootech@gmail.com",
    phone: "5563334444",
    dateOfBirth: "1981-11-19",
    ssn: "456-45-4567",
    address: {
      streetAddress: "111 Main St",
      locality: "Chicago",
      region: "IL",
      postalCode: "60622"
    }
  },
  business: {
    legalName: "Jane's Ladders",
    dbaName: "Jane's Ladders",
    taxId: "98-7654321",
    address: {
      streetAddress: "111 Main St",
      locality: "Chicago",
      region: "IL",
      postalCode: "60622"
    }
  },
  funding: {
    descriptor: "Blue Ladders",
    destination: braintree.MerchantAccount.FundingDestination.Bank,
    email: "funding@blueladders.com",
    mobilePhone: "5555555555",
    accountNumber: "1123581321",
    routingNumber: "071101307"
  },
  tosAccepted: true,
  masterMerchantAccountId: "americanhustlersyndicate",
  id: "sheyih",
};

gateway.merchantAccount.create(merchantAccountParams, function (err, result) {
  console.log(result)
});

