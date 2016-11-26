'use strict';

var app = require('../..');
import request from 'supertest';

var newStaffing;

describe('Staffing API:', function() {
  describe('GET /api/staffings', function() {
    var staffings;

    beforeEach(function(done) {
      request(app)
        .get('/api/staffings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          staffings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(staffings).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/staffings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/staffings')
        .send({
          name: 'New Staffing',
          info: 'This is the brand new staffing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStaffing = res.body;
          done();
        });
    });

    it('should respond with the newly created staffing', function() {
      expect(newStaffing.name).to.equal('New Staffing');
      expect(newStaffing.info).to.equal('This is the brand new staffing!!!');
    });
  });

  describe('GET /api/staffings/:id', function() {
    var staffing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/staffings/${newStaffing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          staffing = res.body;
          done();
        });
    });

    afterEach(function() {
      staffing = {};
    });

    it('should respond with the requested staffing', function() {
      expect(staffing.name).to.equal('New Staffing');
      expect(staffing.info).to.equal('This is the brand new staffing!!!');
    });
  });

  describe('PUT /api/staffings/:id', function() {
    var updatedStaffing;

    beforeEach(function(done) {
      request(app)
        .put(`/api/staffings/${newStaffing._id}`)
        .send({
          name: 'Updated Staffing',
          info: 'This is the updated staffing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStaffing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStaffing = {};
    });

    it('should respond with the original staffing', function() {
      expect(updatedStaffing.name).to.equal('New Staffing');
      expect(updatedStaffing.info).to.equal('This is the brand new staffing!!!');
    });

    it('should respond with the updated staffing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/staffings/${newStaffing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let staffing = res.body;

          expect(staffing.name).to.equal('Updated Staffing');
          expect(staffing.info).to.equal('This is the updated staffing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/staffings/:id', function() {
    var patchedStaffing;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/staffings/${newStaffing._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Staffing' },
          { op: 'replace', path: '/info', value: 'This is the patched staffing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStaffing = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStaffing = {};
    });

    it('should respond with the patched staffing', function() {
      expect(patchedStaffing.name).to.equal('Patched Staffing');
      expect(patchedStaffing.info).to.equal('This is the patched staffing!!!');
    });
  });

  describe('DELETE /api/staffings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/staffings/${newStaffing._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when staffing does not exist', function(done) {
      request(app)
        .delete(`/api/staffings/${newStaffing._id}`)
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
