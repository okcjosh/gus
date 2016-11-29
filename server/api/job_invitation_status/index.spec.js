'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var jobInvitationStatusCtrlStub = {
  index: 'jobInvitationStatusCtrl.index',
  show: 'jobInvitationStatusCtrl.show',
  create: 'jobInvitationStatusCtrl.create',
  upsert: 'jobInvitationStatusCtrl.upsert',
  patch: 'jobInvitationStatusCtrl.patch',
  destroy: 'jobInvitationStatusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var jobInvitationStatusIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './job_invitation_status.controller': jobInvitationStatusCtrlStub
});

describe('JobInvitationStatus API Router:', function() {
  it('should return an express router instance', function() {
    expect(jobInvitationStatusIndex).to.equal(routerStub);
  });

  describe('GET /api/job_invitation_status', function() {
    it('should route to jobInvitationStatus.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'jobInvitationStatusCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/job_invitation_status/:id', function() {
    it('should route to jobInvitationStatus.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'jobInvitationStatusCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/job_invitation_status', function() {
    it('should route to jobInvitationStatus.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'jobInvitationStatusCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/job_invitation_status/:id', function() {
    it('should route to jobInvitationStatus.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'jobInvitationStatusCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/job_invitation_status/:id', function() {
    it('should route to jobInvitationStatus.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'jobInvitationStatusCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/job_invitation_status/:id', function() {
    it('should route to jobInvitationStatus.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'jobInvitationStatusCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
