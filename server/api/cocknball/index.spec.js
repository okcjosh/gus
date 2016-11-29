'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cocknballCtrlStub = {
  index: 'cocknballCtrl.index',
  show: 'cocknballCtrl.show',
  create: 'cocknballCtrl.create',
  upsert: 'cocknballCtrl.upsert',
  patch: 'cocknballCtrl.patch',
  destroy: 'cocknballCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cocknballIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './cocknball.controller': cocknballCtrlStub
});

describe('Cocknball API Router:', function() {
  it('should return an express router instance', function() {
    expect(cocknballIndex).to.equal(routerStub);
  });

  describe('GET /api/cocknballs', function() {
    it('should route to cocknball.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'cocknballCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/cocknballs/:id', function() {
    it('should route to cocknball.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'cocknballCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/cocknballs', function() {
    it('should route to cocknball.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'cocknballCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/cocknballs/:id', function() {
    it('should route to cocknball.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'cocknballCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/cocknballs/:id', function() {
    it('should route to cocknball.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'cocknballCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/cocknballs/:id', function() {
    it('should route to cocknball.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'cocknballCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
