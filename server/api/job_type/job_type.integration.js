/* eslint-disable no-undef */
'use strict';

let app = require('../..');
import request from 'supertest';

let newJobType;

describe('JobType API:', function() {
  describe('GET /api/job_types', function() {
    let jobTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/job_types')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(jobTypes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/job_types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/job_types')
        .send({
          name: 'New JobType',
          info: 'This is the brand new jobType!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newJobType = res.body;
          done();
        });
    });

    it('should respond with the newly created jobType', function() {
      expect(newJobType.name).to.equal('New JobType');
      expect(newJobType.info).to.equal('This is the brand new jobType!!!');
    });
  });

  describe('GET /api/job_types/:id', function() {
    let jobType;

    beforeEach(function(done) {
      request(app)
        .get(`/api/job_types/${newJobType._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobType = res.body;
          done();
        });
    });

    afterEach(function() {
      jobType = {};
    });

    it('should respond with the requested jobType', function() {
      expect(jobType.name).to.equal('New JobType');
      expect(jobType.info).to.equal('This is the brand new jobType!!!');
    });
  });

  describe('PUT /api/job_types/:id', function() {
    let updatedJobType;

    beforeEach(function(done) {
      request(app)
        .put(`/api/job_types/${newJobType._id}`)
        .send({
          name: 'Updated JobType',
          info: 'This is the updated jobType!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedJobType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJobType = {};
    });

    it('should respond with the original jobType', function() {
      expect(updatedJobType.name).to.equal('New JobType');
      expect(updatedJobType.info).to.equal('This is the brand new jobType!!!');
    });

    it('should respond with the updated jobType on a subsequent GET', function(done) {
      request(app)
        .get(`/api/job_types/${newJobType._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let jobType = res.body;

          expect(jobType.name).to.equal('Updated JobType');
          expect(jobType.info).to.equal('This is the updated jobType!!!');

          done();
        });
    });
  });

  describe('PATCH /api/job_types/:id', function() {
    let patchedJobType;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/job_types/${newJobType._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched JobType' },
          { op: 'replace', path: '/info', value: 'This is the patched jobType!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedJobType = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedJobType = {};
    });

    it('should respond with the patched jobType', function() {
      expect(patchedJobType.name).to.equal('Patched JobType');
      expect(patchedJobType.info).to.equal('This is the patched jobType!!!');
    });
  });

  describe('DELETE /api/job_types/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/job_types/${newJobType._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when jobType does not exist', function(done) {
      request(app)
        .delete(`/api/job_types/${newJobType._id}`)
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
