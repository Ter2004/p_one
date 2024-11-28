'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define Type for Product Data
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  size: string;
  quantity: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]); // Product data state
  const [cart, setCart] = useState<CartItem[]>([]); // Cart items state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          throw new Error(result.message || 'Unexpected API response');
        }
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Add product to cart with size and quantity
  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    if (!size.trim()) {
      alert('Please enter a size!');
      return;
    }
    if (quantity <= 0) {
      alert('Quantity must be greater than zero!');
      return;
    }

    const existingProduct = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, size, quantity }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save cart to localStorage
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sneakers</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/cart')}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
          >
            Cart ({totalItemsInCart})
          </button>
          <img
            src="/images/back.png"
            alt="Back"
            className="w-10 h-10 cursor-pointer"
            onClick={() => router.push('/main')}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-contain rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-600">${product.price.toFixed(2)}</p>

            {/* Size Input */}
            <input
              type="text"
              id={`size-${product.id}`}
              placeholder="Enter size (e.g., EU 42)"
              className="block mt-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
            />

            {/* Quantity Input */}
            <input
              type="number"
              id={`quantity-${product.id}`}
              defaultValue={1}
              min={1}
              className="block mt-4 px-4 py-2 border rounded-lg text-gray-700 w-full"
            />

            <button
              onClick={() => {
                const size = (document.getElementById(`size-${product.id}`) as HTMLInputElement)
                  ?.value.trim();
                const quantity = parseInt(
                  (document.getElementById(`quantity-${product.id}`) as HTMLInputElement)?.value
                );
                handleAddToCart(product, size, quantity);
              }}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
