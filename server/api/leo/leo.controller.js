/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/leos              ->  index
 * POST    /api/leos              ->  create
 * GET     /api/leos/:id          ->  show
 * PUT     /api/leos/:id          ->  upsert
 * PATCH   /api/leos/:id          ->  patch
 * DELETE  /api/leos/:id          ->  destroy
 */

'use strict';

import braintree from 'braintree';

import jsonpatch from 'fast-json-patch';

import gateway from './../../gateway';

import {Leo, Event, Department} from './../../sqldb';
import {signToken} from './../../auth/auth.service';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Create SubMerchant Account with leo
function createSubMerchantAccount(leo) {
  return new Promise((resolve, reject) => {
    let merchantAccountParams = {
      individual: {
        firstName: leo.firstName,
        lastName: leo.lastName,
        email: leo.email,
        // TODO: verify validity of phone number
        phone: leo.phone,
        dateOfBirth: '1981-11-19',
        // ssn: "456-45-4567",
        address: {
          streetAddress: leo.address,
          locality: leo.city,
          region: leo.state,
          postalCode: leo.zip
        }
      },
      // business: {
      //   legalName: leo.name,
      //   dbaName: leo.name + " ES4 Funding",
      //   taxId: "98-7654321",
      //   address: {
      //     streetAddress: leo.address,
      //     locality: leo.city,
      //     region: leo.state,
      //     postalCode: leo.zip
      //   }
      // },
      funding: {
        descriptor: leo.name,
        destination: braintree.MerchantAccount.FundingDestination.Bank,
        email: leo.email,
        // TODO: verify validity of phone number
        mobilePhone: leo.phone,
        routingNumber: leo.routingNumber,
        accountNumber: leo.accountNumber
      },
      tosAccepted: true,
      masterMerchantAccountId: 'americanhustlersyndicate',
      id: leo.merchantId,
    };

    gateway.merchantAccount.create(merchantAccountParams, function(err, result) {
      console.log(err, result);
      if(err) {
        return reject(err);
      }

      result.success ? resolve(result) : reject(result);
    });
  });
}

// Gets a list of Leos
export function index(req, res) {
  return Leo.findAll({order: 'lastGig ASC', include: [Department]})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Leo from the DB
export function show(req, res) {
  return Leo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function showCompatibleEvents(req, res) {
  Leo.findOne({
    where: {
      _id: req.params.id
    }
  })
  .then(leo => {
    if(leo) {
      return leo.dislikes.split(',');
    }
  })
  .then(dislikes => {
    return Event.findAll({
      where: {
        JobTypeId:{
          $notIn: dislikes
        }
      }
    });
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Leo in the DB
export function create(req, res) {
  let leo = req.body;

  leo.phone = leo.phone || '5555555555';
  leo.state && (leo.state = leo.state.toUpperCase());
  leo.routingNumber = leo.routingNumber || '071101307';

  leo.dislikes = leo.dislikes.join(',');

  return Leo.create(leo)
    .then(newLeo => {
      return createSubMerchantAccount(newLeo)
        .then(() => Promise.resolve(newLeo))
        .catch(err => {
          newLeo.destroy();
          return Promise.reject(err);
        });
    })
    .then(respondWithResult(res, 201))
    .catch(err => res.status(400).json(err));
}

// Upserts the given Leo in the DB at the specified ID
export function upsert(req, res) {
  req.body.dislikes = req.body.dislikes.join(',');

  if(req.body._id) {
    delete req.body._id;
  }

  return Leo.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Leo in the DB
export function patch(req, res) {
  req.body.dislikes = req.body.dislikes.join(',');

  if(req.body._id) {
    delete req.body._id;
  }
  return Leo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Leo from the DB
export function destroy(req, res) {
  return Leo.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Login for a leo
export function login(req, res) {
  Leo.find({
    where: {
      email: req.body.email
    }
  })
  .then(leo => {
    if (leo) {
      if (leo.password === req.body.password) {
        let token = signToken(leo._id, leo.role);
        res.json({ token, leo_id: leo._id });
      } else {
        res.status(400).json({ message: 'Wrong password'});
      }
    } else {
      res.status(404).json({ message: 'Leo Not found'});
    }
  })
}
