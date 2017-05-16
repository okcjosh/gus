'use strict';

let app = require('../..');
import request from 'supertest';

let newLeoScheduling;

describe('LeoScheduling API:', function() {
  describe('GET /api/leo_scheduling', function() {
    let leoSchedulings;

    beforeEach(function(done) {
      request(app)
        .get('/api/leo_scheduling')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leoSchedulings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(leoSchedulings).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/leo_scheduling', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/leo_scheduling')
        .send({
          name: 'New LeoScheduling',
          info: 'This is the brand new leoScheduling!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLeoScheduling = res.body;
          done();
        });
    });

    it('should respond with the newly created leoScheduling', function() {
      expect(newLeoScheduling.name).to.equal('New LeoScheduling');
      expect(newLeoScheduling.info).to.equal('This is the brand new leoScheduling!!!');
    });
  });

  describe('GET /api/leo_scheduling/:id', function() {
    let leoScheduling;

    beforeEach(function(done) {
      request(app)
        .get(`/api/leo_scheduling/${newLeoScheduling._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          leoScheduling = res.body;
          done();
        });
    });

    afterEach(function() {
      leoScheduling = {};
    });

    it('should respond with the requested leoScheduling', function() {
      expect(leoScheduling.name).to.equal('New LeoScheduling');
      expect(leoScheduling.info).to.equal('This is the brand new leoScheduling!!!');
    });
  });

  describe('PUT /api/leo_scheduling/:id', function() {
    let updatedLeoScheduling;

    beforeEach(function(done) {
      request(app)
        .put(`/api/leo_scheduling/${newLeoScheduling._id}`)
        .send({
          name: 'Updated LeoScheduling',
          info: 'This is the updated leoScheduling!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLeoScheduling = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLeoScheduling = {};
    });

    it('should respond with the original leoScheduling', function() {
      expect(updatedLeoScheduling.name).to.equal('New LeoScheduling');
      expect(updatedLeoScheduling.info).to.equal('This is the brand new leoScheduling!!!');
    });

    it('should respond with the updated leoScheduling on a subsequent GET', function(done) {
      request(app)
        .get(`/api/leo_scheduling/${newLeoScheduling._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let leoScheduling = res.body;

          expect(leoScheduling.name).to.equal('Updated LeoScheduling');
          expect(leoScheduling.info).to.equal('This is the updated leoScheduling!!!');

          done();
        });
    });
  });

  describe('PATCH /api/leo_scheduling/:id', function() {
    let patchedLeoScheduling;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/leo_scheduling/${newLeoScheduling._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched LeoScheduling' },
          { op: 'replace', path: '/info', value: 'This is the patched leoScheduling!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLeoScheduling = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLeoScheduling = {};
    });

    it('should respond with the patched leoScheduling', function() {
      expect(patchedLeoScheduling.name).to.equal('Patched LeoScheduling');
      expect(patchedLeoScheduling.info).to.equal('This is the patched leoScheduling!!!');
    });
  });

  describe('DELETE /api/leo_scheduling/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/leo_scheduling/${newLeoScheduling._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when leoScheduling does not exist', function(done) {
      request(app)
        .delete(`/api/leo_scheduling/${newLeoScheduling._id}`)
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
