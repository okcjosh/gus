'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newBtWebhook;

describe('BtWebhook API:', function() {
  describe('GET /api/bt_webhooks', function() {
    var btWebhooks;

    beforeEach(function(done) {
      request(app)
        .get('/api/bt_webhooks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          btWebhooks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(btWebhooks).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/bt_webhooks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bt_webhooks')
        .send({
          name: 'New BtWebhook',
          info: 'This is the brand new btWebhook!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBtWebhook = res.body;
          done();
        });
    });

    it('should respond with the newly created btWebhook', function() {
      expect(newBtWebhook.name).to.equal('New BtWebhook');
      expect(newBtWebhook.info).to.equal('This is the brand new btWebhook!!!');
    });
  });

  describe('GET /api/bt_webhooks/:id', function() {
    var btWebhook;

    beforeEach(function(done) {
      request(app)
        .get(`/api/bt_webhooks/${newBtWebhook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          btWebhook = res.body;
          done();
        });
    });

    afterEach(function() {
      btWebhook = {};
    });

    it('should respond with the requested btWebhook', function() {
      expect(btWebhook.name).to.equal('New BtWebhook');
      expect(btWebhook.info).to.equal('This is the brand new btWebhook!!!');
    });
  });

  describe('PUT /api/bt_webhooks/:id', function() {
    var updatedBtWebhook;

    beforeEach(function(done) {
      request(app)
        .put(`/api/bt_webhooks/${newBtWebhook._id}`)
        .send({
          name: 'Updated BtWebhook',
          info: 'This is the updated btWebhook!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBtWebhook = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBtWebhook = {};
    });

    it('should respond with the updated btWebhook', function() {
      expect(updatedBtWebhook.name).to.equal('Updated BtWebhook');
      expect(updatedBtWebhook.info).to.equal('This is the updated btWebhook!!!');
    });

    it('should respond with the updated btWebhook on a subsequent GET', function(done) {
      request(app)
        .get(`/api/bt_webhooks/${newBtWebhook._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let btWebhook = res.body;

          expect(btWebhook.name).to.equal('Updated BtWebhook');
          expect(btWebhook.info).to.equal('This is the updated btWebhook!!!');

          done();
        });
    });
  });

  describe('PATCH /api/bt_webhooks/:id', function() {
    var patchedBtWebhook;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/bt_webhooks/${newBtWebhook._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched BtWebhook' },
          { op: 'replace', path: '/info', value: 'This is the patched btWebhook!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBtWebhook = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBtWebhook = {};
    });

    it('should respond with the patched btWebhook', function() {
      expect(patchedBtWebhook.name).to.equal('Patched BtWebhook');
      expect(patchedBtWebhook.info).to.equal('This is the patched btWebhook!!!');
    });
  });

  describe('DELETE /api/bt_webhooks/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/bt_webhooks/${newBtWebhook._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when btWebhook does not exist', function(done) {
      request(app)
        .delete(`/api/bt_webhooks/${newBtWebhook._id}`)
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
