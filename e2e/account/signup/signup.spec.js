'use strict';

let config = browser.params;
let UserModel = require(config.serverConfig.root + '/server/sqldb').User;

describe('Signup View', function() {
  let page;

  let loadPage = function() {
    browser.manage().deleteAllCookies();
    let promise = browser.get(config.baseUrl + '/checkouts');
    page = require('./signup.po');
    return promise;
  };

  let testUser = {
    name: 'Test',
    email: 'test@example.com',
    password: 'test',
    confirmPassword: 'test'
  };

  before(function() {
    return loadPage();
  });

  after(function() {
    return UserModel.destroy({ where: {} });
  });

  it('should include checkouts form with correct inputs and submit button', function () {
    expect(page.form.name.getAttribute('type')).to.eventually.equal('text');
    expect(page.form.name.getAttribute('name')).to.eventually.equal('name');
    expect(page.form.email.getAttribute('type')).to.eventually.equal('email');
    expect(page.form.email.getAttribute('name')).to.eventually.equal('email');
    expect(page.form.password.getAttribute('type')).to.eventually.equal('password');
    expect(page.form.password.getAttribute('name')).to.eventually.equal('password');
    expect(page.form.confirmPassword.getAttribute('type')).to.eventually.equal('password');
    expect(page.form.confirmPassword.getAttribute('name')).to.eventually.equal('confirmPassword');
    expect(page.form.submit.getAttribute('type')).to.eventually.equal('submit');
    expect(page.form.submit.getText()).to.eventually.equal('Sign up');
  });

  it('should include oauth buttons with correct classes applied', function() {
    expect(page.form.oauthButtons.facebook.getText()).to.eventually.equal('Connect with Facebook');
    expect(page.form.oauthButtons.facebook.getAttribute('class')).to.eventually.contain('btn-block');
    expect(page.form.oauthButtons.google.getText()).to.eventually.equal('Connect with Google+');
    expect(page.form.oauthButtons.google.getAttribute('class')).to.eventually.contain('btn-block');
    expect(page.form.oauthButtons.twitter.getText()).to.eventually.equal('Connect with Twitter');
    expect(page.form.oauthButtons.twitter.getAttribute('class')).to.eventually.contain('btn-block');
  });

  describe('with local auth', function() {

    before(function() {
      return UserModel.destroy({ where: {} });
    });

    it('should checkouts a new user, log them in, and redirecting to '/'', function () {
      page.signup(testUser);

      let navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.getText()).to.eventually.equal('Hello ' + testUser.name);
    });

    describe('and invalid credentials', function() {
      before(function() {
        return loadPage();
      });

      it('should indicate checkouts failures', function () {
        page.signup(testUser);

        expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/checkouts');
        expect(page.form.email.getAttribute('class')).to.eventually.contain('ng-invalid-mongoose');

        let helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
        expect(helpBlock.getText()).to.eventually.equal('The specified email address is already in use.');
      });

    });

  });
});
