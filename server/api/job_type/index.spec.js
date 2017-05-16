'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let jobTypeCtrlStub = {
  index: 'jobTypeCtrl.index',
  show: 'jobTypeCtrl.show',
  create: 'jobTypeCtrl.create',
  upsert: 'jobTypeCtrl.upsert',
  patch: 'jobTypeCtrl.patch',
  destroy: 'jobTypeCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let jobTypeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './job_type.controller': jobTypeCtrlStub
});

describe('JobType API Router:', function() {
  it('should return an express router instance', function() {
    expect(jobTypeIndex).to.equal(routerStub);
  });

  describe('GET /api/job_types', function() {
    it('should route to jobType.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'jobTypeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/job_types/:id', function() {
    it('should route to jobType.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'jobTypeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/job_types', function() {
    it('should route to jobType.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'jobTypeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/job_types/:id', function() {
    it('should route to jobType.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'jobTypeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/job_types/:id', function() {
    it('should route to jobType.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'jobTypeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/job_types/:id', function() {
    it('should route to jobType.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'jobTypeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
