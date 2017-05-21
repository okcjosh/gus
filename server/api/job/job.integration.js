/* eslint-disable no-undef */
'use strict';

let app = require('../..');
import request from 'supertest';

let newJob;

describe('Job API:', function() {
  describe('GET /api/jobs', function() {
    let jobs;

    beforeEach(function(done) {
      request(app)
        .get('/api/jobs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(jobs).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/jobs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/jobs')
        .send({
          name: 'New Job',
          info: 'This is the brand new job!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newJob = res.body;
          done();
        });
    });

    it('should respond with the newly created job', function() {
      expect(newJob.name).to.equal('New Job');
      expect(newJob.info).to.equal('This is the brand new job!!!');
    });
  });

  describe('GET /api/jobs/:id', function() {
    let job;

    beforeEach(function(done) {
      request(app)
        .get(`/api/jobs/${newJob._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          job = res.body;
          done();
        });
    });

    afterEach(function() {
      job = {};
    });

    it('should respond with the requested job', function() {
      expect(job.name).to.equal('New Job');
      expect(job.info).to.equal('This is the brand new job!!!');
    });
  });

  describe('PUT /api/jobs/:id', function() {
    let updatedJob;

    beforeEach(function(done) {
      request(app)
        .put(`/api/jobs/${newJob._id}`)
        .send({
          name: 'Updated Job',
          info: 'This is the updated job!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedJob = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJob = {};
    });

    it('should respond with the original job', function() {
      expect(updatedJob.name).to.equal('New Job');
      expect(updatedJob.info).to.equal('This is the brand new job!!!');
    });

    it('should respond with the updated job on a subsequent GET', function(done) {
      request(app)
        .get(`/api/jobs/${newJob._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let job = res.body;

          expect(job.name).to.equal('Updated Job');
          expect(job.info).to.equal('This is the updated job!!!');

          done();
        });
    });
  });

  describe('PATCH /api/jobs/:id', function() {
    let patchedJob;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/jobs/${newJob._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Job' },
          { op: 'replace', path: '/info', value: 'This is the patched job!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedJob = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedJob = {};
    });

    it('should respond with the patched job', function() {
      expect(patchedJob.name).to.equal('Patched Job');
      expect(patchedJob.info).to.equal('This is the patched job!!!');
    });
  });

  describe('DELETE /api/jobs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/jobs/${newJob._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when job does not exist', function(done) {
      request(app)
        .delete(`/api/jobs/${newJob._id}`)
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
