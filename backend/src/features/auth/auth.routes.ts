import { Router } from 'express';

import githubAuthRoutes from './github/github.routes.js';
import otpAuthRoutes from './otp/otp.routes.js';

const router = Router();

router.use('/github', githubAuthRoutes);
router.use('/otp', otpAuthRoutes);

export default router;
