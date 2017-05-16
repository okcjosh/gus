'use strict';

let app = require('../..');
import request from 'supertest';

let newDepartment;

describe('Department API:', function() {
  describe('GET /api/departments', function() {
    let departments;

    beforeEach(function(done) {
      request(app)
        .get('/api/departments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          departments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(departments).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/departments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/departments')
        .send({
          name: 'New Department',
          info: 'This is the brand new department!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDepartment = res.body;
          done();
        });
    });

    it('should respond with the newly created department', function() {
      expect(newDepartment.name).to.equal('New Department');
      expect(newDepartment.info).to.equal('This is the brand new department!!!');
    });
  });

  describe('GET /api/departments/:id', function() {
    let department;

    beforeEach(function(done) {
      request(app)
        .get(`/api/departments/${newDepartment._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          department = res.body;
          done();
        });
    });

    afterEach(function() {
      department = {};
    });

    it('should respond with the requested department', function() {
      expect(department.name).to.equal('New Department');
      expect(department.info).to.equal('This is the brand new department!!!');
    });
  });

  describe('PUT /api/departments/:id', function() {
    let updatedDepartment;

    beforeEach(function(done) {
      request(app)
        .put(`/api/departments/${newDepartment._id}`)
        .send({
          name: 'Updated Department',
          info: 'This is the updated department!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDepartment = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDepartment = {};
    });

    it('should respond with the original department', function() {
      expect(updatedDepartment.name).to.equal('New Department');
      expect(updatedDepartment.info).to.equal('This is the brand new department!!!');
    });

    it('should respond with the updated department on a subsequent GET', function(done) {
      request(app)
        .get(`/api/departments/${newDepartment._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let department = res.body;

          expect(department.name).to.equal('Updated Department');
          expect(department.info).to.equal('This is the updated department!!!');

          done();
        });
    });
  });

  describe('PATCH /api/departments/:id', function() {
    let patchedDepartment;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/departments/${newDepartment._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Department' },
          { op: 'replace', path: '/info', value: 'This is the patched department!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDepartment = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDepartment = {};
    });

    it('should respond with the patched department', function() {
      expect(patchedDepartment.name).to.equal('Patched Department');
      expect(patchedDepartment.info).to.equal('This is the patched department!!!');
    });
  });

  describe('DELETE /api/departments/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/departments/${newDepartment._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when department does not exist', function(done) {
      request(app)
        .delete(`/api/departments/${newDepartment._id}`)
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
