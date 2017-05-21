/* eslint-disable no-undef */
'use strict';

let app = require('../..');
import request from 'supertest';

let newJobTypePreference;

describe('JobTypePreference API:', function() {
  describe('GET /api/job_type_preferences', function() {
    let jobTypePreferences;

    beforeEach(function(done) {
      request(app)
        .get('/api/job_type_preferences')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobTypePreferences = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(jobTypePreferences).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/job_type_preferences', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/job_type_preferences')
        .send({
          name: 'New JobTypePreference',
          info: 'This is the brand new jobTypePreference!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newJobTypePreference = res.body;
          done();
        });
    });

    it('should respond with the newly created jobTypePreference', function() {
      expect(newJobTypePreference.name).to.equal('New JobTypePreference');
      expect(newJobTypePreference.info).to.equal('This is the brand new jobTypePreference!!!');
    });
  });

  describe('GET /api/job_type_preferences/:id', function() {
    let jobTypePreference;

    beforeEach(function(done) {
      request(app)
        .get(`/api/job_type_preferences/${newJobTypePreference._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          jobTypePreference = res.body;
          done();
        });
    });

    afterEach(function() {
      jobTypePreference = {};
    });

    it('should respond with the requested jobTypePreference', function() {
      expect(jobTypePreference.name).to.equal('New JobTypePreference');
      expect(jobTypePreference.info).to.equal('This is the brand new jobTypePreference!!!');
    });
  });

  describe('PUT /api/job_type_preferences/:id', function() {
    let updatedJobTypePreference;

    beforeEach(function(done) {
      request(app)
        .put(`/api/job_type_preferences/${newJobTypePreference._id}`)
        .send({
          name: 'Updated JobTypePreference',
          info: 'This is the updated jobTypePreference!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedJobTypePreference = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJobTypePreference = {};
    });

    it('should respond with the original jobTypePreference', function() {
      expect(updatedJobTypePreference.name).to.equal('New JobTypePreference');
      expect(updatedJobTypePreference.info).to.equal('This is the brand new jobTypePreference!!!');
    });

    it('should respond with the updated jobTypePreference on a subsequent GET', function(done) {
      request(app)
        .get(`/api/job_type_preferences/${newJobTypePreference._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let jobTypePreference = res.body;

          expect(jobTypePreference.name).to.equal('Updated JobTypePreference');
          expect(jobTypePreference.info).to.equal('This is the updated jobTypePreference!!!');

          done();
        });
    });
  });

  describe('PATCH /api/job_type_preferences/:id', function() {
    let patchedJobTypePreference;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/job_type_preferences/${newJobTypePreference._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched JobTypePreference' },
          { op: 'replace', path: '/info', value: 'This is the patched jobTypePreference!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedJobTypePreference = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedJobTypePreference = {};
    });

    it('should respond with the patched jobTypePreference', function() {
      expect(patchedJobTypePreference.name).to.equal('Patched JobTypePreference');
      expect(patchedJobTypePreference.info).to.equal('This is the patched jobTypePreference!!!');
    });
  });

  describe('DELETE /api/job_type_preferences/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/job_type_preferences/${newJobTypePreference._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when jobTypePreference does not exist', function(done) {
      request(app)
        .delete(`/api/job_type_preferences/${newJobTypePreference._id}`)
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
