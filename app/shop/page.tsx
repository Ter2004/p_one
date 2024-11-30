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
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [infoPopup, setInfoPopup] = useState(false); // Info pop-up state
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

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    const sizeNumber = parseInt(size);

    if (!size.trim() || isNaN(sizeNumber) || sizeNumber < 37 || sizeNumber > 46) {
      setShowPopup(true);
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
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setNotification(`${quantity} ${product.name}(s) added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Sneakers</h1>
          {/* Info Icon as Image */}
          <button
            onClick={() => setInfoPopup(true)}
            className="hover:opacity-80"
            aria-label="Info"
          >
            <img
              src="/images/info.png"
              alt="Info"
              className="w-6 h-6"
            />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <img
              src="/images/cart.jpg"
              alt="Cart"
              className="w-10 h-10 cursor-pointer"
              onClick={() => router.push('/cart')}
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full px-2">
              {totalItemsInCart}
            </span>
          </div>
          <img
            src="/images/back.png"
            alt="Back"
            className="w-10 h-10 cursor-pointer"
            onClick={() => router.push('/main')}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-lg text-gray-700"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition border border-black"
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
              type="number"
              id={`size-${product.id}`}
              placeholder="Enter size (37-46)"
              className="block mt-4 px-4 py-2 border border-black rounded-lg text-gray-700 w-full"
            />

            {/* Quantity Input */}
            <input
              type="number"
              id={`quantity-${product.id}`}
              defaultValue={1}
              min={1}
              className="block mt-4 px-4 py-2 border border-black rounded-lg text-gray-700 w-full"
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
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 border border-black"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Info Pop-up */}
      {infoPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <img
              src="/images/size.png"
              alt="Size Chart"
              className="w-full h-auto rounded-lg mb-4"
            />
            <button
              onClick={() => setInfoPopup(false)}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pop-up for invalid size */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold text-red-500 mb-4">
              Invalid Size
            </h2>
            <p className="text-gray-700">Only sizes 37-46 are allowed!</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notification for add to cart */}
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
    </div>
  );
}
