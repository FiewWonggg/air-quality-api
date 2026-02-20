import { Router } from 'express';
import { getMeasurements, createMeasurement } from '../controllers/measurement.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getMeasurements);
router.post('/', verifyToken, createMeasurement);

export default router;