'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

let router = express.Router();

router
  .get('/', passport.authenticate('twitter', {
    failureRedirect: '/checkouts',
    session: false
  }))
  .get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/checkouts',
    session: false
  }), setTokenCookie);

export default router;
