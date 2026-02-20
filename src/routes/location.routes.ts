import { Router } from 'express';
import { getLocations, createLocation } from '../controllers/location.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// เมื่อมีคนเรียก /api/locations ให้ส่งไปที่ Controller ไหน
router.get('/', getLocations);
router.post('/', verifyToken, createLocation);

export default router;