'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var jobInvitationCtrlStub = {
  index: 'jobInvitationCtrl.index',
  show: 'jobInvitationCtrl.show',
  create: 'jobInvitationCtrl.create',
  upsert: 'jobInvitationCtrl.upsert',
  patch: 'jobInvitationCtrl.patch',
  destroy: 'jobInvitationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var jobInvitationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './job_invitation.controller': jobInvitationCtrlStub
});

describe('JobInvitation API Router:', function() {
  it('should return an express router instance', function() {
    expect(jobInvitationIndex).to.equal(routerStub);
  });

  describe('GET /api/job_invitations', function() {
    it('should route to jobInvitation.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'jobInvitationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/job_invitations/:id', function() {
    it('should route to jobInvitation.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'jobInvitationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/job_invitations', function() {
    it('should route to jobInvitation.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'jobInvitationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/job_invitations/:id', function() {
    it('should route to jobInvitation.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'jobInvitationCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/job_invitations/:id', function() {
    it('should route to jobInvitation.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'jobInvitationCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/job_invitations/:id', function() {
    it('should route to jobInvitation.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'jobInvitationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
