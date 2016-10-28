'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var leoCtrlStub = {
  index: 'leoCtrl.index',
  show: 'leoCtrl.show',
  create: 'leoCtrl.create',
  upsert: 'leoCtrl.upsert',
  patch: 'leoCtrl.patch',
  destroy: 'leoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var leoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './leo.controller': leoCtrlStub
});

describe('Leo API Router:', function() {
  it('should return an express router instance', function() {
    expect(leoIndex).to.equal(routerStub);
  });

  describe('GET /api/leos', function() {
    it('should route to leo.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'leoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/leos/:id', function() {
    it('should route to leo.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'leoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/leos', function() {
    it('should route to leo.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'leoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/leos/:id', function() {
    it('should route to leo.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'leoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/leos/:id', function() {
    it('should route to leo.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'leoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/leos/:id', function() {
    it('should route to leo.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'leoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
