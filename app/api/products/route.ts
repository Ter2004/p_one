import { NextResponse } from 'next/server';

// Mock product data
const mockProducts = [
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
    // Simulate data fetching
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
