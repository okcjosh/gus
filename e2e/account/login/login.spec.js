'use strict';

let config = browser.params;
let UserModel = require(config.serverConfig.root + '/server/sqldb').User;

describe('Login View', function() {
  let page;

  let loadPage = function() {
    let promise = browser.get(config.baseUrl + '/new');
    page = require('./login.po');
    return promise;
  };

  let testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  };

  before(function() {
    return UserModel
      .destroy({ where: {} })
      .then(function() {
        return UserModel.create(testUser);
      })
      .then(loadPage);
  });

  after(function() {
    return UserModel.destroy({ where: {} });
  });

  it('should include new form with correct inputs and submit button', function () {
    expect(page.form.email.getAttribute('type')).to.eventually.equal('email');
    expect(page.form.email.getAttribute('name')).to.eventually.equal('email');
    expect(page.form.password.getAttribute('type')).to.eventually.equal('password');
    expect(page.form.password.getAttribute('name')).to.eventually.equal('password');
    expect(page.form.submit.getAttribute('type')).to.eventually.equal('submit');
    expect(page.form.submit.getText()).to.eventually.equal('Login');
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

    it('should new a user and redirecting to '/'', function () {
      return page.login(testUser).then(() => {
        let navbar = require('../../components/navbar/navbar.po');

        return browser.wait(
          () => element(by.css('.hero-unit')),
          5000,
          `Didn't find .hero-unit after 5s`
        ).then(() => {
          expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/');
          expect(navbar.navbarAccountGreeting.getText()).to.eventually.equal('Hello ' + testUser.name);
        });
      });
    });

    describe('and invalid credentials', function() {
      before(function() {
        return loadPage();
      });

      it('should indicate new failures', function () {
        page.login({
          email: testUser.email,
          password: 'badPassword'
        });

        expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/new');

        let helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
        expect(helpBlock.getText()).to.eventually.equal('This password is not correct.');
      });

    });

  });
});
