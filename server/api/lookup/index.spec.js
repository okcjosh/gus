'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let lookupCtrlStub = {
  index: 'lookupCtrl.index',
  show: 'lookupCtrl.show',
  create: 'lookupCtrl.create',
  upsert: 'lookupCtrl.upsert',
  patch: 'lookupCtrl.patch',
  destroy: 'lookupCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let lookupIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './lookup.controller': lookupCtrlStub
});

describe('Lookup API Router:', function() {
  it('should return an express router instance', function() {
    expect(lookupIndex).to.equal(routerStub);
  });

  describe('GET /api/lookups', function() {
    it('should route to lookup.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'lookupCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lookups/:id', function() {
    it('should route to lookup.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'lookupCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lookups', function() {
    it('should route to lookup.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'lookupCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lookups/:id', function() {
    it('should route to lookup.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'lookupCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lookups/:id', function() {
    it('should route to lookup.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'lookupCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lookups/:id', function() {
    it('should route to lookup.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'lookupCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
