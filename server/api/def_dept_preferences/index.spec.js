'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let defDeptPreferencesCtrlStub = {
  index: 'defDeptPreferencesCtrl.index',
  show: 'defDeptPreferencesCtrl.show',
  create: 'defDeptPreferencesCtrl.create',
  upsert: 'defDeptPreferencesCtrl.upsert',
  patch: 'defDeptPreferencesCtrl.patch',
  destroy: 'defDeptPreferencesCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let defDeptPreferencesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './def_dept_preferences.controller': defDeptPreferencesCtrlStub
});

describe('DefDeptPreferences API Router:', function() {
  it('should return an express router instance', function() {
    expect(defDeptPreferencesIndex).to.equal(routerStub);
  });

  describe('GET /def_dept_preferences', function() {
    it('should route to defDeptPreferences.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'defDeptPreferencesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /def_dept_preferences/:id', function() {
    it('should route to defDeptPreferences.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'defDeptPreferencesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /def_dept_preferences', function() {
    it('should route to defDeptPreferences.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'defDeptPreferencesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /def_dept_preferences/:id', function() {
    it('should route to defDeptPreferences.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'defDeptPreferencesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /def_dept_preferences/:id', function() {
    it('should route to defDeptPreferences.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'defDeptPreferencesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /def_dept_preferences/:id', function() {
    it('should route to defDeptPreferences.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'defDeptPreferencesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
