'use strict';

let app = require('../..');
import request from 'supertest';

let newNewAppt;

describe('NewAppt API:', function() {
  describe('GET /api/new_appts', function() {
    let newAppts;

    beforeEach(function(done) {
      request(app)
        .get('/api/new_appts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAppts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(newAppts).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/new_appts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/new_appts')
        .send({
          name: 'New NewAppt',
          info: 'This is the brand new newAppt!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNewAppt = res.body;
          done();
        });
    });

    it('should respond with the newly created newAppt', function() {
      expect(newNewAppt.name).to.equal('New NewAppt');
      expect(newNewAppt.info).to.equal('This is the brand new newAppt!!!');
    });
  });

  describe('GET /api/new_appts/:id', function() {
    let newAppt;

    beforeEach(function(done) {
      request(app)
        .get(`/api/new_appts/${newNewAppt._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAppt = res.body;
          done();
        });
    });

    afterEach(function() {
      newAppt = {};
    });

    it('should respond with the requested newAppt', function() {
      expect(newAppt.name).to.equal('New NewAppt');
      expect(newAppt.info).to.equal('This is the brand new newAppt!!!');
    });
  });

  describe('PUT /api/new_appts/:id', function() {
    let updatedNewAppt;

    beforeEach(function(done) {
      request(app)
        .put(`/api/new_appts/${newNewAppt._id}`)
        .send({
          name: 'Updated NewAppt',
          info: 'This is the updated newAppt!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNewAppt = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNewAppt = {};
    });

    it('should respond with the original newAppt', function() {
      expect(updatedNewAppt.name).to.equal('New NewAppt');
      expect(updatedNewAppt.info).to.equal('This is the brand new newAppt!!!');
    });

    it('should respond with the updated newAppt on a subsequent GET', function(done) {
      request(app)
        .get(`/api/new_appts/${newNewAppt._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let newAppt = res.body;

          expect(newAppt.name).to.equal('Updated NewAppt');
          expect(newAppt.info).to.equal('This is the updated newAppt!!!');

          done();
        });
    });
  });

  describe('PATCH /api/new_appts/:id', function() {
    let patchedNewAppt;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/new_appts/${newNewAppt._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched NewAppt' },
          { op: 'replace', path: '/info', value: 'This is the patched newAppt!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNewAppt = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNewAppt = {};
    });

    it('should respond with the patched newAppt', function() {
      expect(patchedNewAppt.name).to.equal('Patched NewAppt');
      expect(patchedNewAppt.info).to.equal('This is the patched newAppt!!!');
    });
  });

  describe('DELETE /api/new_appts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/new_appts/${newNewAppt._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when newAppt does not exist', function(done) {
      request(app)
        .delete(`/api/new_appts/${newNewAppt._id}`)
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
