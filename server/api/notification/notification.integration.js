/* eslint-disable no-undef */
'use strict';

let app = require('../..');
import request from 'supertest';

let newNotification;

describe('Notification API:', function() {
  describe('GET /api/notifications', function() {
    let notifications;

    beforeEach(function(done) {
      request(app)
        .get('/api/notifications')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          notifications = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(notifications).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/notifications', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/notifications')
        .send({
          name: 'New Notification',
          info: 'This is the brand new notification!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNotification = res.body;
          done();
        });
    });

    it('should respond with the newly created notification', function() {
      expect(newNotification.name).to.equal('New Notification');
      expect(newNotification.info).to.equal('This is the brand new notification!!!');
    });
  });

  describe('GET /api/notifications/:id', function() {
    let notification;

    beforeEach(function(done) {
      request(app)
        .get(`/api/notifications/${newNotification._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          notification = res.body;
          done();
        });
    });

    afterEach(function() {
      notification = {};
    });

    it('should respond with the requested notification', function() {
      expect(notification.name).to.equal('New Notification');
      expect(notification.info).to.equal('This is the brand new notification!!!');
    });
  });

  describe('PUT /api/notifications/:id', function() {
    let updatedNotification;

    beforeEach(function(done) {
      request(app)
        .put(`/api/notifications/${newNotification._id}`)
        .send({
          name: 'Updated Notification',
          info: 'This is the updated notification!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNotification = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNotification = {};
    });

    it('should respond with the original notification', function() {
      expect(updatedNotification.name).to.equal('New Notification');
      expect(updatedNotification.info).to.equal('This is the brand new notification!!!');
    });

    it('should respond with the updated notification on a subsequent GET', function(done) {
      request(app)
        .get(`/api/notifications/${newNotification._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let notification = res.body;

          expect(notification.name).to.equal('Updated Notification');
          expect(notification.info).to.equal('This is the updated notification!!!');

          done();
        });
    });
  });

  describe('PATCH /api/notifications/:id', function() {
    let patchedNotification;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/notifications/${newNotification._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Notification' },
          { op: 'replace', path: '/info', value: 'This is the patched notification!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNotification = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNotification = {};
    });

    it('should respond with the patched notification', function() {
      expect(patchedNotification.name).to.equal('Patched Notification');
      expect(patchedNotification.info).to.equal('This is the patched notification!!!');
    });
  });

  describe('DELETE /api/notifications/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/notifications/${newNotification._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when notification does not exist', function(done) {
      request(app)
        .delete(`/api/notifications/${newNotification._id}`)
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
