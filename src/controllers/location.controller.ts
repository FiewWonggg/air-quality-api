import { Request, Response } from 'express';
import { prisma } from '../config/db';

// ฟังก์ชันดึงข้อมูลสถานที่ทั้งหมด
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};

// ฟังก์ชันเพิ่มสถานที่ใหม่
export const createLocation = async (req: Request, res: Response) => {
  try {
    const { name, latitude, longitude } = req.body;
    const newLocation = await prisma.location.create({
      data: { name, latitude, longitude },
    });
    res.status(201).json(newLocation);
  } catch (error) {
    console.error("🔥 Error:", error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
};