import { NextResponse } from 'next/server';

// Mock product data
let mockProducts = [
  {
    id: 1,
    name: 'Rick Owens Geobasket Leather Sneaker In Black Milk',
    price: 140.0,
    image: '/images/totepack.jpg',
  },
  {
    id: 2,
    name: 'Rick Owens DRKSHDW Canvas Low Top Black Milk',
    price: 200.0,
    image: '/images/backpack.jpg',
  },
  {
    id: 3,
    name: 'Rick Owens DRKSHDW Lido Vintage Low Black Milk',
    price: 180.0,
    image: '/images/messenger.jpg',
  },
];

// **GET handler**: Fetch all products
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

// **POST handler**: Add a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input fields
    const { name, price, image } = body;
    if (!name || typeof name !== 'string' || !price || typeof price !== 'number' || !image || typeof image !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid input. All fields (name, price, image) are required.',
        },
        { status: 400 }
      );
    }

    // Create a new product
    const newProduct = {
      id: mockProducts.length ? mockProducts[mockProducts.length - 1].id + 1 : 1,
      name,
      price: parseFloat(price.toString()),
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

// **DELETE handler**: Delete a product
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    // Validate input
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Invalid product ID.' },
        { status: 400 }
      );
    }

    // Remove product from the mock data
    const filteredProducts = mockProducts.filter((product) => product.id !== id);

    if (filteredProducts.length === mockProducts.length) {
      return NextResponse.json(
        { success: false, message: 'Product not found.' },
        { status: 404 }
      );
    }

    mockProducts = filteredProducts;

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

// **PATCH handler**: Update a product
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, price, image } = body;

    // Validate input
    if (
      !id ||
      typeof id !== 'number' ||
      !name ||
      typeof name !== 'string' ||
      !price ||
      typeof price !== 'number' ||
      !image ||
      typeof image !== 'string'
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid input. All fields are required for update.' },
        { status: 400 }
      );
    }

    // Find and update the product
    const productIndex = mockProducts.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Product not found.' },
        { status: 404 }
      );
    }

    const updatedProduct = {
      ...mockProducts[productIndex],
      name,
      price: parseFloat(price.toString()),
      image,
    };
    mockProducts[productIndex] = updatedProduct;

    return NextResponse.json(
      {
        success: true,
        data: updatedProduct,
        message: 'Product updated successfully.',
      },
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
