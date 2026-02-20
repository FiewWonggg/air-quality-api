import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // 1. ยามขอดูบัตรจาก Header ที่ชื่อว่า Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ error: "Access Denied: ไม่พบบัตรผ่าน! กรุณาเข้าสู่ระบบ" });
    return;
  }

  // 2. ดึงเอาเฉพาะตัวอักษร Token (ตัดคำว่า 'Bearer ' ข้างหน้าออก)
  const token = authHeader.replace('Bearer ', '');

  try {
    // 3. เอาเครื่องสแกนมาตรวจบัตร
    const verified = jwt.verify(token, JWT_SECRET);
    
    // 4. ถ้าบัตรจริง ให้จำข้อมูลคนๆ นั้นไว้ แล้วเปิดประตูให้ผ่านไปได้ (next)
    (req as any).user = verified; 
    next(); 
    
  } catch (error) {
    res.status(401).json({ error: "Invalid Token: บัตรผ่านปลอมหรือหมดอายุ!" });
  }
};