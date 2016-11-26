'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var leosCtrlStub = {
  index: 'leosCtrl.index',
  show: 'leosCtrl.show',
  create: 'leosCtrl.create',
  upsert: 'leosCtrl.upsert',
  patch: 'leosCtrl.patch',
  destroy: 'leosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var leosIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './leos.controller': leosCtrlStub
});

describe('Leos API Router:', function() {
  it('should return an express router instance', function() {
    expect(leosIndex).to.equal(routerStub);
  });

  describe('GET /api/leoss', function() {
    it('should route to leos.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'leosCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/leoss/:id', function() {
    it('should route to leos.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'leosCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/leoss', function() {
    it('should route to leos.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'leosCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/leoss/:id', function() {
    it('should route to leos.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'leosCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/leoss/:id', function() {
    it('should route to leos.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'leosCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/leoss/:id', function() {
    it('should route to leos.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'leosCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
