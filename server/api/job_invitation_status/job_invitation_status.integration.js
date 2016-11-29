'use strict';

var app = require('../..');
import request from 'supertest';

var newJobInvitationStatus;

describe('JobInvitationStatus API:', function() {
  describe('GET /api/job_invitation_status', function() {
    var jobInvitationStatuss;

    beforeEach(function(done) {
      request(app)
        .get('/api/job_invitation_status')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobInvitationStatuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(jobInvitationStatuss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/job_invitation_status', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/job_invitation_status')
        .send({
          name: 'New JobInvitationStatus',
          info: 'This is the brand new jobInvitationStatus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newJobInvitationStatus = res.body;
          done();
        });
    });

    it('should respond with the newly created jobInvitationStatus', function() {
      expect(newJobInvitationStatus.name).to.equal('New JobInvitationStatus');
      expect(newJobInvitationStatus.info).to.equal('This is the brand new jobInvitationStatus!!!');
    });
  });

  describe('GET /api/job_invitation_status/:id', function() {
    var jobInvitationStatus;

    beforeEach(function(done) {
      request(app)
        .get(`/api/job_invitation_status/${newJobInvitationStatus._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobInvitationStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      jobInvitationStatus = {};
    });

    it('should respond with the requested jobInvitationStatus', function() {
      expect(jobInvitationStatus.name).to.equal('New JobInvitationStatus');
      expect(jobInvitationStatus.info).to.equal('This is the brand new jobInvitationStatus!!!');
    });
  });

  describe('PUT /api/job_invitation_status/:id', function() {
    var updatedJobInvitationStatus;

    beforeEach(function(done) {
      request(app)
        .put(`/api/job_invitation_status/${newJobInvitationStatus._id}`)
        .send({
          name: 'Updated JobInvitationStatus',
          info: 'This is the updated jobInvitationStatus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedJobInvitationStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJobInvitationStatus = {};
    });

    it('should respond with the original jobInvitationStatus', function() {
      expect(updatedJobInvitationStatus.name).to.equal('New JobInvitationStatus');
      expect(updatedJobInvitationStatus.info).to.equal('This is the brand new jobInvitationStatus!!!');
    });

    it('should respond with the updated jobInvitationStatus on a subsequent GET', function(done) {
      request(app)
        .get(`/api/job_invitation_status/${newJobInvitationStatus._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let jobInvitationStatus = res.body;

          expect(jobInvitationStatus.name).to.equal('Updated JobInvitationStatus');
          expect(jobInvitationStatus.info).to.equal('This is the updated jobInvitationStatus!!!');

          done();
        });
    });
  });

  describe('PATCH /api/job_invitation_status/:id', function() {
    var patchedJobInvitationStatus;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/job_invitation_status/${newJobInvitationStatus._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched JobInvitationStatus' },
          { op: 'replace', path: '/info', value: 'This is the patched jobInvitationStatus!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedJobInvitationStatus = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedJobInvitationStatus = {};
    });

    it('should respond with the patched jobInvitationStatus', function() {
      expect(patchedJobInvitationStatus.name).to.equal('Patched JobInvitationStatus');
      expect(patchedJobInvitationStatus.info).to.equal('This is the patched jobInvitationStatus!!!');
    });
  });

  describe('DELETE /api/job_invitation_status/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/job_invitation_status/${newJobInvitationStatus._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when jobInvitationStatus does not exist', function(done) {
      request(app)
        .delete(`/api/job_invitation_status/${newJobInvitationStatus._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
