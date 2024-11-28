import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';

// **GET handler**: Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(
      {
        success: true,
        data: products,
        message: 'Products fetched successfully.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products.',
        error: error.message || 'Unknown error occurred.',
      },
      { status: 500 }
    );
  }
}

// **POST handler**: Add a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, image } = body;

    // Validate input
    if (!name || typeof name !== 'string' || !price || typeof price !== 'number' || !image || typeof image !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid input. All fields (name, price, image) are required.' },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: { name, price, image },
    });

    return NextResponse.json(
      { success: true, data: newProduct, message: 'Product added successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add product.',
        error: error.message || 'Unknown error occurred.',
      },
      { status: 500 }
    );
  }
}

// **PATCH handler**: Update a product
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, price, image } = body;

    // Validate input
    if (!id || !name || !price || !image) {
      return NextResponse.json(
        { success: false, message: 'Invalid input. All fields (id, name, price, image) are required.' },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price, image },
    });

    return NextResponse.json(
      { success: true, data: updatedProduct, message: 'Product updated successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update product.',
        error: error.message || 'Unknown error occurred.',
      },
      { status: 500 }
    );
  }
}

// **DELETE handler**: Remove a product
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required.' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Product deleted successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete product.',
        error: error.message || 'Unknown error occurred.',
      },
      { status: 500 }
    );
  }
}
