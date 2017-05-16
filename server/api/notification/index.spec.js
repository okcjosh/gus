'use strict';

let proxyquire = require('proxyquire').noPreserveCache();

let notificationCtrlStub = {
  index: 'notificationCtrl.index',
  show: 'notificationCtrl.show',
  create: 'notificationCtrl.create',
  upsert: 'notificationCtrl.upsert',
  patch: 'notificationCtrl.patch',
  destroy: 'notificationCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let notificationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './notification.controller': notificationCtrlStub
});

describe('Notification API Router:', function() {
  it('should return an express router instance', function() {
    expect(notificationIndex).to.equal(routerStub);
  });

  describe('GET /api/notifications', function() {
    it('should route to notification.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'notificationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/notifications/:id', function() {
    it('should route to notification.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'notificationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/notifications', function() {
    it('should route to notification.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'notificationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/notifications/:id', function() {
    it('should route to notification.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'notificationCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/notifications/:id', function() {
    it('should route to notification.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'notificationCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/notifications/:id', function() {
    it('should route to notification.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'notificationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
