'use strict';

var app = require('../..');
import request from 'supertest';

var newJobInvitation;

describe('JobInvitation API:', function() {
  describe('GET /api/job_invitations', function() {
    var jobInvitations;

    beforeEach(function(done) {
      request(app)
        .get('/api/job_invitations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobInvitations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(jobInvitations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/job_invitations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/job_invitations')
        .send({
          name: 'New JobInvitation',
          info: 'This is the brand new jobInvitation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newJobInvitation = res.body;
          done();
        });
    });

    it('should respond with the newly created jobInvitation', function() {
      expect(newJobInvitation.name).to.equal('New JobInvitation');
      expect(newJobInvitation.info).to.equal('This is the brand new jobInvitation!!!');
    });
  });

  describe('GET /api/job_invitations/:id', function() {
    var jobInvitation;

    beforeEach(function(done) {
      request(app)
        .get(`/api/job_invitations/${newJobInvitation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobInvitation = res.body;
          done();
        });
    });

    afterEach(function() {
      jobInvitation = {};
    });

    it('should respond with the requested jobInvitation', function() {
      expect(jobInvitation.name).to.equal('New JobInvitation');
      expect(jobInvitation.info).to.equal('This is the brand new jobInvitation!!!');
    });
  });

  describe('PUT /api/job_invitations/:id', function() {
    var updatedJobInvitation;

    beforeEach(function(done) {
      request(app)
        .put(`/api/job_invitations/${newJobInvitation._id}`)
        .send({
          name: 'Updated JobInvitation',
          info: 'This is the updated jobInvitation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedJobInvitation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJobInvitation = {};
    });

    it('should respond with the original jobInvitation', function() {
      expect(updatedJobInvitation.name).to.equal('New JobInvitation');
      expect(updatedJobInvitation.info).to.equal('This is the brand new jobInvitation!!!');
    });

    it('should respond with the updated jobInvitation on a subsequent GET', function(done) {
      request(app)
        .get(`/api/job_invitations/${newJobInvitation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let jobInvitation = res.body;

          expect(jobInvitation.name).to.equal('Updated JobInvitation');
          expect(jobInvitation.info).to.equal('This is the updated jobInvitation!!!');

          done();
        });
    });
  });

  describe('PATCH /api/job_invitations/:id', function() {
    var patchedJobInvitation;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/job_invitations/${newJobInvitation._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched JobInvitation' },
          { op: 'replace', path: '/info', value: 'This is the patched jobInvitation!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedJobInvitation = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedJobInvitation = {};
    });

    it('should respond with the patched jobInvitation', function() {
      expect(patchedJobInvitation.name).to.equal('Patched JobInvitation');
      expect(patchedJobInvitation.info).to.equal('This is the patched jobInvitation!!!');
    });
  });

  describe('DELETE /api/job_invitations/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/job_invitations/${newJobInvitation._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when jobInvitation does not exist', function(done) {
      request(app)
        .delete(`/api/job_invitations/${newJobInvitation._id}`)
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
