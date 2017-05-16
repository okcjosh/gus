'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let leoSchedulingCtrlStub = {
  index: 'leoSchedulingCtrl.index',
  show: 'leoSchedulingCtrl.show',
  create: 'leoSchedulingCtrl.create',
  upsert: 'leoSchedulingCtrl.upsert',
  patch: 'leoSchedulingCtrl.patch',
  destroy: 'leoSchedulingCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let leoSchedulingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './leo_scheduling.controller': leoSchedulingCtrlStub
});

describe('LeoScheduling API Router:', function() {
  it('should return an express router instance', function() {
    expect(leoSchedulingIndex).to.equal(routerStub);
  });

  describe('GET /api/leo_scheduling', function() {
    it('should route to leoScheduling.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'leoSchedulingCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/leo_scheduling/:id', function() {
    it('should route to leoScheduling.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'leoSchedulingCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/leo_scheduling', function() {
    it('should route to leoScheduling.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'leoSchedulingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/leo_scheduling/:id', function() {
    it('should route to leoScheduling.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'leoSchedulingCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/leo_scheduling/:id', function() {
    it('should route to leoScheduling.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'leoSchedulingCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/leo_scheduling/:id', function() {
    it('should route to leoScheduling.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'leoSchedulingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
