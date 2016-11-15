//
//
// (function () {
//   'use strict';
//
//   let atob = require('atob');
//   let b64 = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJlM2IxMzY3NTZlNTFiZDYzOTgwZDkzOGE3ZjgzMWU5NjA0NGJhYmVjODNkNGQ5ZTE4ZmFjZTI2YmZmMTBhNTQwfGNyZWF0ZWRfYXQ9MjAxNi0xMS0wMlQxNzowMDozNC43NDAxNDU2NTArMDAwMFx1MDAyNm1lcmNoYW50X2lkPXN3dmc5c2Nqa2hmaHE5cnNcdTAwMjZwdWJsaWNfa2V5PTc4Z2hrc2Z6dDV6NWhmY3giLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc3d2ZzlzY2praGZocTlycy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3N3dmc5c2Nqa2hmaHE5cnMvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3N3dmc5c2Nqa2hmaHE5cnMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQW1lcmljYW4gSHVzdGxlciBTeW5kaWNhdGUiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJhbWVyaWNhbmh1c3RsZXJzeW5kaWNhdGUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6InN3dmc5c2Nqa2hmaHE5cnMiLCJ2ZW5tbyI6Im9mZiJ9';
//   let bin = atob(b64);
//
//   console.log(bin); // 'Hello World'
// }());
//
//
// (function () {
//   'use strict';
//
//   let btoa = require('btoa')
//     , bin = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJhYWMwNmYyNGNkMjhiMzA2NTFmNjJkY2JkM2RiOTc2YzBkMDI3OWJlM2E0NDAyYTYwYTVlMTdmNTJlY2UyYzRifGNyZWF0ZWRfYXQ9MjAxNi0xMS0wMlQxNTo1MTozMy4xNzE2MjAwNjQrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXN3dmc5c2Nqa2hmaHE5cnNcdTAwMjZwdWJsaWNfa2V5PTc4Z2hrc2Z6dDV6NWhmY3giLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc3d2ZzlzY2praGZocTlycy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3N3dmc5c2Nqa2hmaHE5cnMvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3N3dmc5c2Nqa2hmaHE5cnMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQW1lcmljYW4gSHVzdGxlciBTeW5kaWNhdGUiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJhbWVyaWNhbmh1c3RsZXJzeW5kaWNhdGUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6InN3dmc5c2Nqa2hmaHE5cnMiLCJ2ZW5tbyI6Im9mZiJ9'
//
//   , b64 = btoa(bin)
//     ;
//
//   console.log(b64); // 'SGVsbG8sIBZM'
// }());

// (function () {
//   'use strict';
//
//   let btoa = require('btoa')
//     , bin = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJlM2IxMzY3NTZlNTFiZDYzOTgwZDkzOGE3ZjgzMWU5NjA0NGJhYmVjODNkNGQ5ZTE4ZmFjZTI2YmZmMTBhNTQwfGNyZWF0ZWRfYXQ9MjAxNi0xMS0wMlQxNzowMDozNC43NDAxNDU2NTArMDAwMFx1MDAyNm1lcmNoYW50X2lkPXN3dmc5c2Nqa2hmaHE5cnNcdTAwMjZwdWJsaWNfa2V5PTc4Z2hrc2Z6dDV6NWhmY3giLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc3d2ZzlzY2praGZocTlycy9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3N3dmc5c2Nqa2hmaHE5cnMvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3N3dmc5c2Nqa2hmaHE5cnMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQW1lcmljYW4gSHVzdGxlciBTeW5kaWNhdGUiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJhbWVyaWNhbmh1c3RsZXJzeW5kaWNhdGUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6InN3dmc5c2Nqa2hmaHE5cnMiLCJ2ZW5tbyI6Im9mZiJ9'
//     , b64 = btoa(bin)
//     ;
//
//   console.log(b64); // 'SGVsbG8sIBZM'
// }());


// let braintree = require('braintree');
//
// let gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: 'swvg9scjkhfhq9rs',
//   publicKey: '78ghksfzt5z5hfcx',
//   privateKey: '1f210164c4fff82b6da4c29131f30379',
// });
//
// app.get('/client_token', function (req, res) {
//   gateway.clientToken.generate({}, function (err, response) {
//     res.send(response.clientToken);
//     console.log(clientToken);
//   });
// });
//
// app.post('/checkout', function (req, res) {
//   let nonceFromTheClient = req.body.payment_method_nonce;
//   gateway.transaction.sale({
//   amount: '10.00',
//   paymentMethodNonce: nonceFromTheClient,
//   options: {
//     submitForSettlement: true
//   }
// }, function (err, result) {
//
//   })
// });
//
//
// //
// // let util = require('util'),
// //   braintree = require('braintree');
// // let gateway = braintree.connect({
// //   environment: braintree.Environment.Sandbox,
// //   merchantId: 'swvg9scjkhfhq9rs',
// //   publicKey: '78ghksfzt5z5hfcx',
// //   privateKey: '1f210164c4fff82b6da4c29131f30379',
// // });
// //
// // gateway.transaction.sale({
// //     amount: '123.00',
// //     paymentMethodNonce: 'nonce-from-the-client',
// //     options: {
// //       submitForSettlement: true
// //     }
// //   },
// //   function(err, result) {
// //     if (result) {
// //       if (result.success) {
// //         console.log('Transaction ID: ' + result.transaction.id)
// //       } else {
// //         console.log(result.message)
// //       }
// //     } else {
// //       console.log(err)
// //     }
// //   });
