'use strict';

var app = require('../..');
import request from 'supertest';

var newDefDeptPreferences;

describe('DefDeptPreferences API:', function() {
  describe('GET /def_dept_preferences', function() {
    var defDeptPreferencess;

    beforeEach(function(done) {
      request(app)
        .get('/def_dept_preferences')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          defDeptPreferencess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(defDeptPreferencess).to.be.instanceOf(Array);
    });
  });

  describe('POST /def_dept_preferences', function() {
    beforeEach(function(done) {
      request(app)
        .post('/def_dept_preferences')
        .send({
          name: 'New DefDeptPreferences',
          info: 'This is the brand new defDeptPreferences!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDefDeptPreferences = res.body;
          done();
        });
    });

    it('should respond with the newly created defDeptPreferences', function() {
      expect(newDefDeptPreferences.name).to.equal('New DefDeptPreferences');
      expect(newDefDeptPreferences.info).to.equal('This is the brand new defDeptPreferences!!!');
    });
  });

  describe('GET /def_dept_preferences/:id', function() {
    var defDeptPreferences;

    beforeEach(function(done) {
      request(app)
        .get(`/def_dept_preferences/${newDefDeptPreferences._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          defDeptPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      defDeptPreferences = {};
    });

    it('should respond with the requested defDeptPreferences', function() {
      expect(defDeptPreferences.name).to.equal('New DefDeptPreferences');
      expect(defDeptPreferences.info).to.equal('This is the brand new defDeptPreferences!!!');
    });
  });

  describe('PUT /def_dept_preferences/:id', function() {
    var updatedDefDeptPreferences;

    beforeEach(function(done) {
      request(app)
        .put(`/def_dept_preferences/${newDefDeptPreferences._id}`)
        .send({
          name: 'Updated DefDeptPreferences',
          info: 'This is the updated defDeptPreferences!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDefDeptPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDefDeptPreferences = {};
    });

    it('should respond with the original defDeptPreferences', function() {
      expect(updatedDefDeptPreferences.name).to.equal('New DefDeptPreferences');
      expect(updatedDefDeptPreferences.info).to.equal('This is the brand new defDeptPreferences!!!');
    });

    it('should respond with the updated defDeptPreferences on a subsequent GET', function(done) {
      request(app)
        .get(`/def_dept_preferences/${newDefDeptPreferences._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let defDeptPreferences = res.body;

          expect(defDeptPreferences.name).to.equal('Updated DefDeptPreferences');
          expect(defDeptPreferences.info).to.equal('This is the updated defDeptPreferences!!!');

          done();
        });
    });
  });

  describe('PATCH /def_dept_preferences/:id', function() {
    var patchedDefDeptPreferences;

    beforeEach(function(done) {
      request(app)
        .patch(`/def_dept_preferences/${newDefDeptPreferences._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched DefDeptPreferences' },
          { op: 'replace', path: '/info', value: 'This is the patched defDeptPreferences!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDefDeptPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDefDeptPreferences = {};
    });

    it('should respond with the patched defDeptPreferences', function() {
      expect(patchedDefDeptPreferences.name).to.equal('Patched DefDeptPreferences');
      expect(patchedDefDeptPreferences.info).to.equal('This is the patched defDeptPreferences!!!');
    });
  });

  describe('DELETE /def_dept_preferences/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/def_dept_preferences/${newDefDeptPreferences._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when defDeptPreferences does not exist', function(done) {
      request(app)
        .delete(`/def_dept_preferences/${newDefDeptPreferences._id}`)
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
