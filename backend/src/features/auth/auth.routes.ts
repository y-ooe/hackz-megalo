import { Router } from 'express';

import amazonAuthRoutes from './amazon/amazon.route.js';
import faceRecognitionRoutes from './facerRekognition/faceRekognition.routes.js';
import githubAuthRoutes from './github/github.routes.js';
import googleAuthRoutes from './google/google.route.js';
import otpAuthRoutes from './otp/otp.routes.js';

const router = Router();

router.use('/amazon', amazonAuthRoutes);
router.use('/face', faceRecognitionRoutes);
router.use('/github', githubAuthRoutes);
router.use('/google', googleAuthRoutes);
router.use('/otp', otpAuthRoutes);

export default router;
