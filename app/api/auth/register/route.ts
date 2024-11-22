import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import bcrypt from 'bcryptjs';


export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  // ตรวจสอบว่า Email ซ้ำหรือไม่
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: 'Email already registered.' }, { status: 400 });
  }

  // เข้ารหัส Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // สร้าง User ใหม่
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || 'user',
    },
  });

  return NextResponse.json(user);
}
