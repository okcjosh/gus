
var form = document.querySelector('#checkout-form');
var submit = document.querySelector('input[type="submit"]');
import braintree from 'braintree-web';

braintree.client.create({
  // Replace this with your own authorization.
  authorization: clientToken
}, function (clientErr, clientInstance) {
  if (clientErr) {
    // Handle error in client creation
    console.log(clientToken, "CLIENTTOKEN");
    console.log(clientInstance, "CLIENTINSTANCE");
    return;
  }

  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      'input': {
        'font-size': '14pt'
      },
      'input.invalid': {
        'color': 'red'
      },
      'input.valid': {
        'color': 'green'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: '10/2019'
      }
    }
  }, function (hostedFieldsErr, hostedFieldsInstance) {
    if (hostedFieldsErr) {
      // Handle error in Hosted Fields creation
      console.log(hostedFieldsErr, "BLOW ME");
      console.log(hostedFieldsInstance, "BLOW YOU");
      console.log(clientToken, "WE ALL BLOW DOWN");
      return;
    }

    submit.removeAttribute('disabled');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
        if (tokenizeErr) {
          // Handle error in Hosted Fields tokenization
          console.log(payload, "HOT LOAD HERE");
          return;
        }

        // Put `payload.nonce` into the `payment-method-nonce` input, and then
        // submit the form. Alternatively, you could send the nonce to your server
        // with AJAX.
        document.querySelector('input[name="payment-method-nonce"]').value = payload.nonce;
        form.submit();
      });
    }, false);
  });
});
