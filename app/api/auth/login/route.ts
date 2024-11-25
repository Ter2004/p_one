import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ค้นหา User จากฐานข้อมูล
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password.' }, { status: 401 });
    }

    // Return user data พร้อม role
    return NextResponse.json(
      { id: user.id, role: user.role, message: 'Login successful.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
