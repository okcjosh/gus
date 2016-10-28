'use strict';

var app = require('../..');
import request from 'supertest';

var newLeo;

describe('Leo API:', function() {
  describe('GET /api/leos', function() {
    var leos;

    beforeEach(function(done) {
      request(app)
        .get('/api/leos')
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

    it('should respond with JSON array', function() {
      expect(leos).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/leos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/leos')
        .send({
          name: 'New Leo',
          info: 'This is the brand new leo!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLeo = res.body;
          done();
        });
    });

    it('should respond with the newly created leo', function() {
      expect(newLeo.name).to.equal('New Leo');
      expect(newLeo.info).to.equal('This is the brand new leo!!!');
    });
  });

  describe('GET /api/leos/:id', function() {
    var leo;

    beforeEach(function(done) {
      request(app)
        .get(`/api/leos/${newLeo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leo = res.body;
          done();
        });
    });

    afterEach(function() {
      leo = {};
    });

    it('should respond with the requested leo', function() {
      expect(leo.name).to.equal('New Leo');
      expect(leo.info).to.equal('This is the brand new leo!!!');
    });
  });

  describe('PUT /api/leos/:id', function() {
    var updatedLeo;

    beforeEach(function(done) {
      request(app)
        .put(`/api/leos/${newLeo._id}`)
        .send({
          name: 'Updated Leo',
          info: 'This is the updated leo!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLeo = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLeo = {};
    });

    it('should respond with the original leo', function() {
      expect(updatedLeo.name).to.equal('New Leo');
      expect(updatedLeo.info).to.equal('This is the brand new leo!!!');
    });

    it('should respond with the updated leo on a subsequent GET', function(done) {
      request(app)
        .get(`/api/leos/${newLeo._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let leo = res.body;

          expect(leo.name).to.equal('Updated Leo');
          expect(leo.info).to.equal('This is the updated leo!!!');

          done();
        });
    });
  });

  describe('PATCH /api/leos/:id', function() {
    var patchedLeo;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/leos/${newLeo._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Leo' },
          { op: 'replace', path: '/info', value: 'This is the patched leo!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLeo = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLeo = {};
    });

    it('should respond with the patched leo', function() {
      expect(patchedLeo.name).to.equal('Patched Leo');
      expect(patchedLeo.info).to.equal('This is the patched leo!!!');
    });
  });

  describe('DELETE /api/leos/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/leos/${newLeo._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when leo does not exist', function(done) {
      request(app)
        .delete(`/api/leos/${newLeo._id}`)
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
