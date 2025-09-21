"use client";

import React from "react";
import { useStore } from "@/hooks/useStore";
import { getImageSrc } from "@/utils";
import { toast } from "sonner";

function Cart() {
  const { state, dispatch } = useStore();
  const rawCartItems = state.items || [];

  // Group items by ID and calculate quantities
  const cartItems = rawCartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Calculate total price with quantities
  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const handleRemoveItem = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    toast.success("Item removed from cart");
  };

  const handleIncreaseQuantity = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success("Quantity increased");
  };

  const handleDecreaseQuantity = (item) => {
    const currentCount = rawCartItems.filter((i) => i.id === item.id).length;
    if (currentCount > 1) {
      // Remove one instance of the item
      const itemIndex = rawCartItems.findIndex((i) => i.id === item.id);
      const updatedItems = [...rawCartItems];
      updatedItems.splice(itemIndex, 1);

      // Update localStorage manually
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      }

      // Dispatch a custom action to update state
      dispatch({ type: "SET_CART", payload: updatedItems });
      toast.success("Quantity decreased");
    } else {
      handleRemoveItem(item.id);
    }
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared successfully");
  };

  const handleCheckout = () => {
    toast.info("Checkout functionality is not implemented yet");
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-28 px-5 sm:px-10 md:px-12 lg:px-20 pb-10 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-100">
            Shopping Cart
          </h1>
          <div className="bg-gray-700 border border-gray-600 rounded-lg shadow-xl p-8">
            <div className="text-center">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 8l1.8 7h8.4m-5-7v4h4v-4m-4 0H9m0 0V9a3 3 0 016 0v4m-6 0h6"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-300 mb-6">
                Add some products to your cart to get started
              </p>
              <a
                href="/products"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                </svg>
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-28 px-5 sm:px-10 md:px-12 lg:px-20 pb-10 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">
            Shopping Cart ({rawCartItems.length} item
            {rawCartItems.length !== 1 ? "s" : ""})
          </h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-400 hover:text-red-300 underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${Math.random()}`}
                className="bg-gray-700 border border-gray-600 rounded-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getImageSrc(item.img)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          Product ID: {item.id}
                        </p>
                        <div className="flex items-center gap-4 mb-2">
                          <p className="text-emerald-400 font-semibold text-xl">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-gray-300 text-sm">
                              × {item.quantity} = $
                              {(parseFloat(item.price) * item.quantity).toFixed(
                                2
                              )}
                            </p>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-gray-300 text-sm">Qty:</span>
                          <div className="flex items-center bg-gray-600 rounded-lg">
                            <button
                              onClick={() => handleDecreaseQuantity(item)}
                              className="w-8 h-8 flex items-center justify-center text-gray-200 hover:text-white hover:bg-gray-500 rounded-l-lg transition-colors"
                              title="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-12 h-8 flex items-center justify-center text-gray-100 font-medium text-sm bg-gray-600">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncreaseQuantity(item)}
                              className="w-8 h-8 flex items-center justify-center text-gray-200 hover:text-white hover:bg-gray-500 rounded-r-lg transition-colors"
                              title="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-gray-600 transition-colors ml-4"
                        title="Remove from cart"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-700 border border-gray-600 rounded-lg p-6 sticky top-32">
              <h2 className="text-xl font-semibold text-gray-100 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">
                    Items ({rawCartItems.length})
                  </span>
                  <span className="text-gray-100">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-gray-100">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax</span>
                  <span className="text-gray-100">$0.00</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-100">Total</span>
                  <span className="text-emerald-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                * Checkout functionality is not implemented yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
