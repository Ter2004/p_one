import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

// GET: Retrieve all user data
export async function GET() {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,         // Include user ID
        email: true,      // Include user email
        role: true,       // Include user role (admin or user)
        createdAt: true,  // Include account creation date
      },
    });

    // Return a success response with user data
    return NextResponse.json(
      {
        success: true,
        message: 'Users fetched successfully.',
        data: users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching users:', error);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch users.',
        error: error.message || 'An unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}

// POST: Add a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, role, password } = body; // Include password in the request body

    // Validate the request body
    if (!email || !role || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input. Email, role, and password are required.',
        },
        { status: 400 }
      );
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        role,
        password, // Include password in the Prisma create operation
      },
    });

    // Return a success response with the created user
    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully.',
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating user:', error);

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create user.',
        error: error.message || 'An unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}
