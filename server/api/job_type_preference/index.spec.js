'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let jobTypePreferenceCtrlStub = {
  index: 'jobTypePreferenceCtrl.index',
  show: 'jobTypePreferenceCtrl.show',
  create: 'jobTypePreferenceCtrl.create',
  upsert: 'jobTypePreferenceCtrl.upsert',
  patch: 'jobTypePreferenceCtrl.patch',
  destroy: 'jobTypePreferenceCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let jobTypePreferenceIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './job_type_preference.controller': jobTypePreferenceCtrlStub
});

describe('JobTypePreference API Router:', function() {
  it('should return an express router instance', function() {
    expect(jobTypePreferenceIndex).to.equal(routerStub);
  });

  describe('GET /api/job_type_preferences', function() {
    it('should route to jobTypePreference.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'jobTypePreferenceCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/job_type_preferences/:id', function() {
    it('should route to jobTypePreference.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'jobTypePreferenceCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/job_type_preferences', function() {
    it('should route to jobTypePreference.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'jobTypePreferenceCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/job_type_preferences/:id', function() {
    it('should route to jobTypePreference.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'jobTypePreferenceCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/job_type_preferences/:id', function() {
    it('should route to jobTypePreference.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'jobTypePreferenceCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/job_type_preferences/:id', function() {
    it('should route to jobTypePreference.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'jobTypePreferenceCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
