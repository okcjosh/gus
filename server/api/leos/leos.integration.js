'use strict';

var app = require('../..');
import request from 'supertest';

var newLeos;

describe('Leos API:', function() {
  describe('GET /api/leoss', function() {
    var leoss;

    beforeEach(function(done) {
      request(app)
        .get('/api/leoss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leoss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(leoss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/leoss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/leoss')
        .send({
          name: 'New Leos',
          info: 'This is the brand new leos!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLeos = res.body;
          done();
        });
    });

    it('should respond with the newly created leos', function() {
      expect(newLeos.name).to.equal('New Leos');
      expect(newLeos.info).to.equal('This is the brand new leos!!!');
    });
  });

  describe('GET /api/leoss/:id', function() {
    var leos;

    beforeEach(function(done) {
      request(app)
        .get(`/api/leoss/${newLeos._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leos = res.body;
          done();
        });
    });

    afterEach(function() {
      leos = {};
    });

    it('should respond with the requested leos', function() {
      expect(leos.name).to.equal('New Leos');
      expect(leos.info).to.equal('This is the brand new leos!!!');
    });
  });

  describe('PUT /api/leoss/:id', function() {
    var updatedLeos;

    beforeEach(function(done) {
      request(app)
        .put(`/api/leoss/${newLeos._id}`)
        .send({
          name: 'Updated Leos',
          info: 'This is the updated leos!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLeos = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLeos = {};
    });

    it('should respond with the original leos', function() {
      expect(updatedLeos.name).to.equal('New Leos');
      expect(updatedLeos.info).to.equal('This is the brand new leos!!!');
    });

    it('should respond with the updated leos on a subsequent GET', function(done) {
      request(app)
        .get(`/api/leoss/${newLeos._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let leos = res.body;

          expect(leos.name).to.equal('Updated Leos');
          expect(leos.info).to.equal('This is the updated leos!!!');

          done();
        });
    });
  });

  describe('PATCH /api/leoss/:id', function() {
    var patchedLeos;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/leoss/${newLeos._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Leos' },
          { op: 'replace', path: '/info', value: 'This is the patched leos!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLeos = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLeos = {};
    });

    it('should respond with the patched leos', function() {
      expect(patchedLeos.name).to.equal('Patched Leos');
      expect(patchedLeos.info).to.equal('This is the patched leos!!!');
    });
  });

  describe('DELETE /api/leoss/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/leoss/${newLeos._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when leos does not exist', function(done) {
      request(app)
        .delete(`/api/leoss/${newLeos._id}`)
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
