'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var staffingCtrlStub = {
  index: 'staffingCtrl.index',
  show: 'staffingCtrl.show',
  create: 'staffingCtrl.create',
  upsert: 'staffingCtrl.upsert',
  patch: 'staffingCtrl.patch',
  destroy: 'staffingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var staffingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './staffing.controller': staffingCtrlStub
});

describe('Staffing API Router:', function() {
  it('should return an express router instance', function() {
    expect(staffingIndex).to.equal(routerStub);
  });

  describe('GET /api/staffings', function() {
    it('should route to staffing.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'staffingCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/staffings/:id', function() {
    it('should route to staffing.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'staffingCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/staffings', function() {
    it('should route to staffing.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'staffingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/staffings/:id', function() {
    it('should route to staffing.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'staffingCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/staffings/:id', function() {
    it('should route to staffing.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'staffingCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/staffings/:id', function() {
    it('should route to staffing.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'staffingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
