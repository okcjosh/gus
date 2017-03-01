'use strict';

var app = require('../..');
import request from 'supertest';

var newLookup;

describe('Lookup API:', function() {
  describe('GET /api/lookups', function() {
    var lookups;

    beforeEach(function(done) {
      request(app)
        .get('/api/lookups')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lookups = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(lookups).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/lookups', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lookups')
        .send({
          name: 'New Lookup',
          info: 'This is the brand new lookup!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLookup = res.body;
          done();
        });
    });

    it('should respond with the newly created lookup', function() {
      expect(newLookup.name).to.equal('New Lookup');
      expect(newLookup.info).to.equal('This is the brand new lookup!!!');
    });
  });

  describe('GET /api/lookups/:id', function() {
    var lookup;

    beforeEach(function(done) {
      request(app)
        .get(`/api/lookups/${newLookup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lookup = res.body;
          done();
        });
    });

    afterEach(function() {
      lookup = {};
    });

    it('should respond with the requested lookup', function() {
      expect(lookup.name).to.equal('New Lookup');
      expect(lookup.info).to.equal('This is the brand new lookup!!!');
    });
  });

  describe('PUT /api/lookups/:id', function() {
    var updatedLookup;

    beforeEach(function(done) {
      request(app)
        .put(`/api/lookups/${newLookup._id}`)
        .send({
          name: 'Updated Lookup',
          info: 'This is the updated lookup!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLookup = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLookup = {};
    });

    it('should respond with the updated lookup', function() {
      expect(updatedLookup.name).to.equal('Updated Lookup');
      expect(updatedLookup.info).to.equal('This is the updated lookup!!!');
    });

    it('should respond with the updated lookup on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lookups/${newLookup._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let lookup = res.body;

          expect(lookup.name).to.equal('Updated Lookup');
          expect(lookup.info).to.equal('This is the updated lookup!!!');

          done();
        });
    });
  });

  describe('PATCH /api/lookups/:id', function() {
    var patchedLookup;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/lookups/${newLookup._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Lookup' },
          { op: 'replace', path: '/info', value: 'This is the patched lookup!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLookup = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLookup = {};
    });

    it('should respond with the patched lookup', function() {
      expect(patchedLookup.name).to.equal('Patched Lookup');
      expect(patchedLookup.info).to.equal('This is the patched lookup!!!');
    });
  });

  describe('DELETE /api/lookups/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lookups/${newLookup._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when lookup does not exist', function(done) {
      request(app)
        .delete(`/api/lookups/${newLookup._id}`)
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
