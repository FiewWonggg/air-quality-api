import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// 1. ฟังก์ชันสมัครสมาชิก (Register)
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // เข้ารหัสผ่านก่อนเซฟลง Database
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        passwordHash, // เซฟรหัสที่ถูกแปลงโฉมแล้ว
      },
    });

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ!", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: "ชื่อผู้ใช้นี้อาจมีคนใช้แล้ว หรือเกิดข้อผิดพลาด" });
  }
};

// 2. ฟังก์ชันเข้าสู่ระบบ (Login)
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // หา User ใน Database
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(401).json({ error: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง" });
      return;
    }

    // เทียบรหัสผ่านที่ส่งมา กับรหัสผ่านที่ถูก Hash ไว้ใน Database
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง" });
      return;
    }

    // ถ้ารหัสถูกเป๊ะ! ให้ออกบัตรผ่าน (Token) มีอายุ 1 วัน
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: "เข้าสู่ระบบสำเร็จ!", token });
  } catch (error) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
};