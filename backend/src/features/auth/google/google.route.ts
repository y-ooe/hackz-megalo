import { Router } from 'express';
import passport from 'passport';

import { googleFailureHandler, googleSuccessHandler } from './google.controller.js';

const router = Router();

router.get('/', passport.authenticate(
    'google', 
    { scope: ['email', 'profile'] }
));

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/failure' }),
  googleSuccessHandler,
);

router.get('/failure', googleFailureHandler);

export default router;
