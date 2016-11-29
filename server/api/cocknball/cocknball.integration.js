'use strict';

var app = require('../..');
import request from 'supertest';

var newCocknball;

describe('Cocknball API:', function() {
  describe('GET /api/cocknballs', function() {
    var cocknballs;

    beforeEach(function(done) {
      request(app)
        .get('/api/cocknballs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          cocknballs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(cocknballs).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/cocknballs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cocknballs')
        .send({
          name: 'New Cocknball',
          info: 'This is the brand new cocknball!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCocknball = res.body;
          done();
        });
    });

    it('should respond with the newly created cocknball', function() {
      expect(newCocknball.name).to.equal('New Cocknball');
      expect(newCocknball.info).to.equal('This is the brand new cocknball!!!');
    });
  });

  describe('GET /api/cocknballs/:id', function() {
    var cocknball;

    beforeEach(function(done) {
      request(app)
        .get(`/api/cocknballs/${newCocknball._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          cocknball = res.body;
          done();
        });
    });

    afterEach(function() {
      cocknball = {};
    });

    it('should respond with the requested cocknball', function() {
      expect(cocknball.name).to.equal('New Cocknball');
      expect(cocknball.info).to.equal('This is the brand new cocknball!!!');
    });
  });

  describe('PUT /api/cocknballs/:id', function() {
    var updatedCocknball;

    beforeEach(function(done) {
      request(app)
        .put(`/api/cocknballs/${newCocknball._id}`)
        .send({
          name: 'Updated Cocknball',
          info: 'This is the updated cocknball!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCocknball = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCocknball = {};
    });

    it('should respond with the original cocknball', function() {
      expect(updatedCocknball.name).to.equal('New Cocknball');
      expect(updatedCocknball.info).to.equal('This is the brand new cocknball!!!');
    });

    it('should respond with the updated cocknball on a subsequent GET', function(done) {
      request(app)
        .get(`/api/cocknballs/${newCocknball._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let cocknball = res.body;

          expect(cocknball.name).to.equal('Updated Cocknball');
          expect(cocknball.info).to.equal('This is the updated cocknball!!!');

          done();
        });
    });
  });

  describe('PATCH /api/cocknballs/:id', function() {
    var patchedCocknball;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/cocknballs/${newCocknball._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Cocknball' },
          { op: 'replace', path: '/info', value: 'This is the patched cocknball!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCocknball = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCocknball = {};
    });

    it('should respond with the patched cocknball', function() {
      expect(patchedCocknball.name).to.equal('Patched Cocknball');
      expect(patchedCocknball.info).to.equal('This is the patched cocknball!!!');
    });
  });

  describe('DELETE /api/cocknballs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/cocknballs/${newCocknball._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cocknball does not exist', function(done) {
      request(app)
        .delete(`/api/cocknballs/${newCocknball._id}`)
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
