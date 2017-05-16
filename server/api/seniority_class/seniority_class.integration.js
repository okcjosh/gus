'use strict';

let app = require('../..');
import request from 'supertest';

let newSeniorityClass;

describe('SeniorityClass API:', function() {
  describe('GET /api/seniority_classes', function() {
    let seniorityClasss;

    beforeEach(function(done) {
      request(app)
        .get('/api/seniority_classes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          seniorityClasss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seniorityClasss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/seniority_classes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seniority_classes')
        .send({
          name: 'New SeniorityClass',
          info: 'This is the brand new seniorityClass!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSeniorityClass = res.body;
          done();
        });
    });

    it('should respond with the newly created seniorityClass', function() {
      expect(newSeniorityClass.name).to.equal('New SeniorityClass');
      expect(newSeniorityClass.info).to.equal('This is the brand new seniorityClass!!!');
    });
  });

  describe('GET /api/seniority_classes/:id', function() {
    let seniorityClass;

    beforeEach(function(done) {
      request(app)
        .get(`/api/seniority_classes/${newSeniorityClass._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          seniorityClass = res.body;
          done();
        });
    });

    afterEach(function() {
      seniorityClass = {};
    });

    it('should respond with the requested seniorityClass', function() {
      expect(seniorityClass.name).to.equal('New SeniorityClass');
      expect(seniorityClass.info).to.equal('This is the brand new seniorityClass!!!');
    });
  });

  describe('PUT /api/seniority_classes/:id', function() {
    let updatedSeniorityClass;

    beforeEach(function(done) {
      request(app)
        .put(`/api/seniority_classes/${newSeniorityClass._id}`)
        .send({
          name: 'Updated SeniorityClass',
          info: 'This is the updated seniorityClass!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSeniorityClass = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeniorityClass = {};
    });

    it('should respond with the original seniorityClass', function() {
      expect(updatedSeniorityClass.name).to.equal('New SeniorityClass');
      expect(updatedSeniorityClass.info).to.equal('This is the brand new seniorityClass!!!');
    });

    it('should respond with the updated seniorityClass on a subsequent GET', function(done) {
      request(app)
        .get(`/api/seniority_classes/${newSeniorityClass._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let seniorityClass = res.body;

          expect(seniorityClass.name).to.equal('Updated SeniorityClass');
          expect(seniorityClass.info).to.equal('This is the updated seniorityClass!!!');

          done();
        });
    });
  });

  describe('PATCH /api/seniority_classes/:id', function() {
    let patchedSeniorityClass;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/seniority_classes/${newSeniorityClass._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched SeniorityClass' },
          { op: 'replace', path: '/info', value: 'This is the patched seniorityClass!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSeniorityClass = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSeniorityClass = {};
    });

    it('should respond with the patched seniorityClass', function() {
      expect(patchedSeniorityClass.name).to.equal('Patched SeniorityClass');
      expect(patchedSeniorityClass.info).to.equal('This is the patched seniorityClass!!!');
    });
  });

  describe('DELETE /api/seniority_classes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/seniority_classes/${newSeniorityClass._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seniorityClass does not exist', function(done) {
      request(app)
        .delete(`/api/seniority_classes/${newSeniorityClass._id}`)
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
