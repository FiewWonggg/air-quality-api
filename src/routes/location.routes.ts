import { Router } from 'express';
import { getLocations, createLocation } from '../controllers/location.controller';

const router = Router();

// เมื่อมีคนเรียก /api/locations ให้ส่งไปที่ Controller ไหน
router.get('/', getLocations);
router.post('/', createLocation);

export default router;