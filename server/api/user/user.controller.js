'use strict';

import {User} from '../../sqldb';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.findAll({
    attributes: [
      '_id',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  let newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  return newUser.save()
    .then(function(user) {
      let token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      sendPhoneVerification(user._id);
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  let userId = req.params.id;

  return User.find({
    where: {
      _id: userId
    }
  })
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.destroy({ where: { _id: req.params.id } })
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  let userId = req.user._id;
  let oldPass = String(req.body.oldPassword);
  let newPass = String(req.body.newPassword);

  return User.find({
    where: {
      _id: userId
    }
  })
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  let userId = req.user._id;

  return User.find({
    where: {
      _id: userId
    },
    attributes: [
      '_id',
      'phone_verified',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

function sendPhoneVerification(userId) {
  // Twilio Credentials
  let accountSid = 'AC9ce0d28ee69cd6ff89fdc1b8d0139099';
  let authToken = '4890e088921ee4039f79b22d44d0ebb1';

  //require the Twilio module and create a REST client
  let client = require('twilio')(accountSid, authToken);


  User.find({where: {
    _id: userId
  }}).then(function(u) {
    let verificationCode = Math.random().toString(36).slice(3, 9).toUpperCase();

    u.phone_verification_code = verificationCode;
    u.save();

    client.messages.create({
      to: u.phone,
      from: '+13102542363',
      body: verificationCode
    }, function(err, message) {
      if(err) {
        console.log(err);
      } else {
        console.log(message.sid);
      }
    });
  });

}

export function generatePhoneCode(req, res, next) {
  sendPhoneVerification(req.user._id);
  res.json({message: 'Verification code requested'});
}

export function verifyPhone(req, res, next) {
  let userId = req.user._id;

  return User.find({
    where: {
      _id: userId
    }
  })
    .then(user => { // don't ever give out the password or salt
      if (user.phone_verification_code === req.body.code.toUpperCase()) {
        user.phone_verified = true;
        user.save();

        res.json({message: 'Phone number successfully verified!'});
      } else {
        res.status(400).json({message: 'Verification Code is not correct!'});
      }
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
