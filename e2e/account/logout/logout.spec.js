'use strict';

let config = browser.params;
let UserModel = require(config.serverConfig.root + '/server/sqldb').User;

describe('Logout View', function() {
  let login = function(user) {
    let promise = browser.get(config.baseUrl + '/new');
    require('../login/login.po').login(user);
    return promise;
  };

  let testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  };

  beforeEach(function() {
    return UserModel
      .destroy({ where: {} })
      .then(function() {
        return UserModel.create(testUser);
      })
      .then(function() {
        return login(testUser);
      });
  });

  after(function() {
    return UserModel.destroy({ where: {} });
  });

  describe('with local auth', function() {

    it('should logout a user and redirecting to '/'', function() {
      let navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.getText()).to.eventually.equal('Hello ' + testUser.name);

      browser.get(config.baseUrl + '/logout');

      navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.isDisplayed()).to.eventually.equal(false);
    });

  });
});
