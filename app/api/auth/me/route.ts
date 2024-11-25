import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

// Placeholder function to decode and verify a token (replace with actual JWT logic if needed)
function decodeToken(token: string): string | null {
  // Replace with your JWT decoding and verification logic
  // For simplicity, assume token is the user ID
  return token; 
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized: Missing or invalid token' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const userId = decodeToken(token); // Replace with real JWT verification logic
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in /auth/me:', error);
    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
