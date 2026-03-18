import { Router} from 'express';
import { faceRecognitionHandler } from './faceRekognition.controller.js';

const router = Router();

router.post('/send', faceRecognitionHandler);

export default router;