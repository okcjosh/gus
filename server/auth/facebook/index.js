'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

let router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/checkouts',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/checkouts',
    session: false
  }), setTokenCookie);

export default router;
