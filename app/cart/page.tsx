'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleRemoveFromCart = (id: string, size: string) => {
    const updatedCart = cart
      .map((product) =>
        product.id === id && product.size === size
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
      .filter((product) => product.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const goToShop = () => {
    router.push('/shop');
  };

  const handlePurchase = () => {
    setConfirmPurchase(true);
  };

  const confirmClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setShowSuccessModal(true);
    setConfirmPurchase(false);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
          <button
            onClick={goToShop}
            className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Back to Shop
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((product) => (
              <div
                key={`${product.id}-${product.size}`}
                className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 gap-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex flex-col flex-1">
                  <p className="font-medium text-lg">{product.name}</p>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Quantity: {product.quantity}</p>
                  <p className="font-semibold text-lg">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product.id, product.size)}
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-semibold text-center sm:text-left">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handlePurchase}
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
              >
                Purchase
              </button>
              <button
                onClick={goToShop}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Purchase Successful!</h2>
            <p className="text-gray-700 mb-4">
              Thank you for your purchase. Your cart has been cleared.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmPurchase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to proceed with this purchase?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmClearCart}
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmPurchase(false)}
                className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
