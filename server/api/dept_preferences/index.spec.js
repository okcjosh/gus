'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let deptPreferencesCtrlStub = {
  index: 'deptPreferencesCtrl.index',
  show: 'deptPreferencesCtrl.show',
  create: 'deptPreferencesCtrl.create',
  upsert: 'deptPreferencesCtrl.upsert',
  patch: 'deptPreferencesCtrl.patch',
  destroy: 'deptPreferencesCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let deptPreferencesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './dept_preferences.controller': deptPreferencesCtrlStub
});

describe('DeptPreferences API Router:', function() {
  it('should return an express router instance', function() {
    expect(deptPreferencesIndex).to.equal(routerStub);
  });

  describe('GET /dept_preferences', function() {
    it('should route to deptPreferences.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'deptPreferencesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /dept_preferences/:id', function() {
    it('should route to deptPreferences.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'deptPreferencesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /dept_preferences', function() {
    it('should route to deptPreferences.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'deptPreferencesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /dept_preferences/:id', function() {
    it('should route to deptPreferences.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'deptPreferencesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /dept_preferences/:id', function() {
    it('should route to deptPreferences.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'deptPreferencesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /dept_preferences/:id', function() {
    it('should route to deptPreferences.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'deptPreferencesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
