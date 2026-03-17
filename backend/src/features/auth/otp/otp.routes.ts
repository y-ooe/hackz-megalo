import { Router } from 'express';

import { verifyOtpHandler } from './otp.controller.js';

const router = Router();

router.post('/', verifyOtpHandler);

export default router;
