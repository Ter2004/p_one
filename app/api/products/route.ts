import { NextResponse } from 'next/server';

// Mock product data
let mockProducts = [
  {
    id: 1,
    name: 'Shibuya Totepack',
    price: 140.0,
    image: '/images/totepack.jpg',
  },
  {
    id: 2,
    name: 'Kensington Backpack',
    price: 200.0,
    image: '/images/backpack.jpg',
  },
  {
    id: 3,
    name: 'Osaka Messenger Bag',
    price: 180.0,
    image: '/images/messenger.jpg',
  },
];

// GET handler for fetching products
export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: mockProducts,
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

// POST handler for adding a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input fields
    const { name, price, image } = body;
    if (!name || !price || !image) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input. All fields are required.',
        },
        { status: 400 }
      );
    }

    // Create a new product
    const newProduct = {
      id: mockProducts.length + 1,
      name,
      price,
      image,
    };

    // Add the new product to the mock data
    mockProducts.push(newProduct);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: 'Product added successfully.',
      },
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
