import { Router } from 'express';
import { getMeasurements, createMeasurement } from '../controllers/measurement.controller';

const router = Router();

router.get('/', getMeasurements);
router.post('/', createMeasurement);

export default router;