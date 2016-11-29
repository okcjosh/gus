'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seniorityClassCtrlStub = {
  index: 'seniorityClassCtrl.index',
  show: 'seniorityClassCtrl.show',
  create: 'seniorityClassCtrl.create',
  upsert: 'seniorityClassCtrl.upsert',
  patch: 'seniorityClassCtrl.patch',
  destroy: 'seniorityClassCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seniorityClassIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './seniority_class.controller': seniorityClassCtrlStub
});

describe('SeniorityClass API Router:', function() {
  it('should return an express router instance', function() {
    expect(seniorityClassIndex).to.equal(routerStub);
  });

  describe('GET /api/seniority_classes', function() {
    it('should route to seniorityClass.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seniorityClassCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/seniority_classes/:id', function() {
    it('should route to seniorityClass.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seniorityClassCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/seniority_classes', function() {
    it('should route to seniorityClass.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seniorityClassCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/seniority_classes/:id', function() {
    it('should route to seniorityClass.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seniorityClassCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/seniority_classes/:id', function() {
    it('should route to seniorityClass.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seniorityClassCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/seniority_classes/:id', function() {
    it('should route to seniorityClass.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seniorityClassCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
