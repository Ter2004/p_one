import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import bcrypt from 'bcrypt';


export async function POST(req: Request) {
  const { email, password } = await req.json();

  // ค้นหา User จากฐานข้อมูล
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 });
  }

  // ตรวจสอบ Password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid password.' }, { status: 401 });
  }

  // ส่งข้อมูล Role และ ID กลับไป
  return NextResponse.json({ id: user.id, role: user.role }, { status: 200 });
}
