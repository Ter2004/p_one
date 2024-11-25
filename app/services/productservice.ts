const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Fetch all products from the API
 * @returns Array of products
 */
export async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch products.');
    }

    return result.data; // Return the product list
  } catch (error: any) {
    console.error('Error fetching products:', error.message || error);
    throw new Error(error.message || 'Error fetching products. Please try again.');
  }
}

/**
 * Add a new product via the API
 * @param product Object containing product details (name, price, image)
 * @returns The newly added product
 */
export async function addProduct(product: { name: string; price: number; image: string }) {
  try {
    // Validate input fields before making API call
    if (!product.name || typeof product.name !== 'string' || !product.price || typeof product.price !== 'number' || !product.image || typeof product.image !== 'string') {
      throw new Error('Invalid input. Please provide valid product details.');
    }

    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to add product.');
    }

    return result.data; // Return the added product
  } catch (error: any) {
    console.error('Error adding product:', error.message || error);
    throw new Error(error.message || 'Error adding product. Please try again.');
  }
}

/**
 * Delete a product via the API
 * @param productId ID of the product to delete
 * @returns Success message
 */
export async function deleteProduct(productId: number) {
  try {
    // Validate productId
    if (!productId || typeof productId !== 'number') {
      throw new Error('Invalid product ID. Please provide a valid ID.');
    }

    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId }), // Pass the product ID in the request body
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete product.');
    }

    return result.message; // Return success message
  } catch (error: any) {
    console.error('Error deleting product:', error.message || error);
    throw new Error(error.message || 'Error deleting product. Please try again.');
  }
}

/**
 * Update a product via the API
 * @param productId ID of the product to update
 * @param updatedData Object containing updated product details (name, price, image)
 * @returns The updated product
 */
export async function updateProduct(productId: number, updatedData: { name?: string; price?: number; image?: string }) {
  try {
    // Validate input fields
    if (!productId || typeof productId !== 'number') {
      throw new Error('Invalid product ID. Please provide a valid ID.');
    }
    if (updatedData.name && typeof updatedData.name !== 'string') {
      throw new Error('Invalid name. Name must be a string.');
    }
    if (updatedData.price && typeof updatedData.price !== 'number') {
      throw new Error('Invalid price. Price must be a number.');
    }
    if (updatedData.image && typeof updatedData.image !== 'string') {
      throw new Error('Invalid image URL. Image must be a string.');
    }

    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'PATCH', // PATCH is used for partial updates
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId, ...updatedData }), // Include ID and updated data
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update product.');
    }

    return result.data; // Return the updated product
  } catch (error: any) {
    console.error('Error updating product:', error.message || error);
    throw new Error(error.message || 'Error updating product. Please try again.');
  }
}
