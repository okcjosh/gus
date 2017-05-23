let sinon = require('sinon');
'use strict';

/* globals sinon, describe, expect, it */

let proxyquire = require('proxyquire').noPreserveCache();

let btWebhookCtrlStub = {
  index: 'btWebhookCtrl.index',
  show: 'btWebhookCtrl.show',
  create: 'btWebhookCtrl.create',
  upsert: 'btWebhookCtrl.upsert',
  patch: 'btWebhookCtrl.patch',
  destroy: 'btWebhookCtrl.destroy'
};

let routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
let btWebhookIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './bt_webhook.controller': btWebhookCtrlStub
});

describe('BtWebhook API Router:', function() {
  it('should return an express router instance', function() {
    expect(btWebhookIndex).to.equal(routerStub);
  });

  describe('GET /api/bt_webhooks', function() {
    it('should route to btWebhook.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'btWebhookCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/bt_webhooks/:id', function() {
    it('should route to btWebhook.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'btWebhookCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/bt_webhooks', function() {
    it('should route to btWebhook.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'btWebhookCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/bt_webhooks/:id', function() {
    it('should route to btWebhook.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'btWebhookCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/bt_webhooks/:id', function() {
    it('should route to btWebhook.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'btWebhookCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/bt_webhooks/:id', function() {
    it('should route to btWebhook.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'btWebhookCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
