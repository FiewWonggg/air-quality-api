import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getMeasurements = async (req: Request, res: Response) => {
  try {
    const measurements = await prisma.measurement.findMany({
      include: { location: true }, // ดึงชื่อสถานที่มาด้วย
    });
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลฝุ่น' });
  }
};

export const createMeasurement = async (req: Request, res: Response) => {
  try {
    const { locationId, pm25, aqi, temperature, humidity } = req.body;
    const newMeasurement = await prisma.measurement.create({
      data: { locationId, pm25, aqi, temperature, humidity },
    });
    res.status(201).json(newMeasurement);
  } catch (error) {
    console.error("🔥 Error:", error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลฝุ่น' });
  }
};