'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let newApptCtrlStub = {
  index: 'newApptCtrl.index',
  show: 'newApptCtrl.show',
  create: 'newApptCtrl.create',
  upsert: 'newApptCtrl.upsert',
  patch: 'newApptCtrl.patch',
  destroy: 'newApptCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let newApptIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './new_appt.controller': newApptCtrlStub
});

describe('NewAppt API Router:', function() {
  it('should return an express router instance', function() {
    expect(newApptIndex).to.equal(routerStub);
  });

  describe('GET /api/new_appts', function() {
    it('should route to newAppt.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'newApptCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/new_appts/:id', function() {
    it('should route to newAppt.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'newApptCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/new_appts', function() {
    it('should route to newAppt.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'newApptCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/new_appts/:id', function() {
    it('should route to newAppt.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'newApptCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/new_appts/:id', function() {
    it('should route to newAppt.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'newApptCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/new_appts/:id', function() {
    it('should route to newAppt.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'newApptCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
