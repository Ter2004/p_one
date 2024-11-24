import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

// GET: ดึงข้อมูลผู้ใช้งานทั้งหมด
export async function GET() {
  try {
    const users = await prisma.user.findMany(); // ดึงข้อมูลจาก Prisma
    return NextResponse.json(users); // ส่งข้อมูลกลับในรูป JSON
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to fetch users.' },
      { status: 500 }
    );
  }
}
