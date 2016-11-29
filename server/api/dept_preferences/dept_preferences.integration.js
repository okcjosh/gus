'use strict';

var app = require('../..');
import request from 'supertest';

var newDeptPreferences;

describe('DeptPreferences API:', function() {
  describe('GET /dept_preferences', function() {
    var deptPreferencess;

    beforeEach(function(done) {
      request(app)
        .get('/dept_preferences')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          deptPreferencess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(deptPreferencess).to.be.instanceOf(Array);
    });
  });

  describe('POST /dept_preferences', function() {
    beforeEach(function(done) {
      request(app)
        .post('/dept_preferences')
        .send({
          name: 'New DeptPreferences',
          info: 'This is the brand new deptPreferences!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDeptPreferences = res.body;
          done();
        });
    });

    it('should respond with the newly created deptPreferences', function() {
      expect(newDeptPreferences.name).to.equal('New DeptPreferences');
      expect(newDeptPreferences.info).to.equal('This is the brand new deptPreferences!!!');
    });
  });

  describe('GET /dept_preferences/:id', function() {
    var deptPreferences;

    beforeEach(function(done) {
      request(app)
        .get(`/dept_preferences/${newDeptPreferences._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          deptPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      deptPreferences = {};
    });

    it('should respond with the requested deptPreferences', function() {
      expect(deptPreferences.name).to.equal('New DeptPreferences');
      expect(deptPreferences.info).to.equal('This is the brand new deptPreferences!!!');
    });
  });

  describe('PUT /dept_preferences/:id', function() {
    var updatedDeptPreferences;

    beforeEach(function(done) {
      request(app)
        .put(`/dept_preferences/${newDeptPreferences._id}`)
        .send({
          name: 'Updated DeptPreferences',
          info: 'This is the updated deptPreferences!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDeptPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDeptPreferences = {};
    });

    it('should respond with the original deptPreferences', function() {
      expect(updatedDeptPreferences.name).to.equal('New DeptPreferences');
      expect(updatedDeptPreferences.info).to.equal('This is the brand new deptPreferences!!!');
    });

    it('should respond with the updated deptPreferences on a subsequent GET', function(done) {
      request(app)
        .get(`/dept_preferences/${newDeptPreferences._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let deptPreferences = res.body;

          expect(deptPreferences.name).to.equal('Updated DeptPreferences');
          expect(deptPreferences.info).to.equal('This is the updated deptPreferences!!!');

          done();
        });
    });
  });

  describe('PATCH /dept_preferences/:id', function() {
    var patchedDeptPreferences;

    beforeEach(function(done) {
      request(app)
        .patch(`/dept_preferences/${newDeptPreferences._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched DeptPreferences' },
          { op: 'replace', path: '/info', value: 'This is the patched deptPreferences!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDeptPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDeptPreferences = {};
    });

    it('should respond with the patched deptPreferences', function() {
      expect(patchedDeptPreferences.name).to.equal('Patched DeptPreferences');
      expect(patchedDeptPreferences.info).to.equal('This is the patched deptPreferences!!!');
    });
  });

  describe('DELETE /dept_preferences/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/dept_preferences/${newDeptPreferences._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when deptPreferences does not exist', function(done) {
      request(app)
        .delete(`/dept_preferences/${newDeptPreferences._id}`)
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
