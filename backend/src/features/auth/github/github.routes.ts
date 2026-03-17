import { Router } from 'express';
import passport from 'passport';

import { githubFailureHandler, githubSuccessHandler } from './github.controller.js';

const router = Router();

router.get('/', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github/failure' }),
  githubSuccessHandler,
);

router.get('/failure', githubFailureHandler);

export default router;
