"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useProductDetail } from "@/controllers/productController";
import { useStore } from "@/hooks/useStore";
import { getImageSrc } from "@/utils";

function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data: product, isLoading, error } = useProductDetail(id);
  const { dispatch } = useStore();

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="pt-28 px-5 sm:px-10 md:px-12 lg:px-20 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <span className="ml-4 text-xl text-gray-300">
              Loading product details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-28 px-5 sm:px-10 md:px-12 lg:px-20 min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center h-64">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-300 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={handleGoBack}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const productImage = getImageSrc(product.img);

  return (
    <div className="pt-28 px-5 sm:px-10 md:px-12 lg:px-20 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="mb-6 flex items-center text-gray-400 hover:text-emerald-400 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </button>

        {/* Product Detail */}
        <div className="bg-gray-700 border border-gray-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8 bg-gray-800 flex items-center justify-center">
              <img
                src={productImage}
                alt={product.name}
                className="max-w-full max-h-96 object-contain rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-100 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center mb-6">
                  <span className="text-4xl font-bold text-emerald-400">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Product Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-3">
                  Product Description
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.description ||
                    "This is a high-quality product that offers great value for money. Perfect for your needs and built to last with premium materials and attention to detail."}
                </p>
              </div>

              {/* Product Details */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-100 mb-3">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 text-sm">Product ID:</span>
                    <p className="font-medium text-gray-200">{product.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Category:</span>
                    <p className="font-medium text-gray-200">
                      {product.category || "General"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Availability:</span>
                    <p className="font-medium text-emerald-400">In Stock</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">SKU:</span>
                    <p className="font-medium text-gray-200">
                      {product.sku || `SKU-${product.id}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 8l1.8 7h8.4"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button
                  onClick={() => router.push("/cart")}
                  className="flex-1 bg-gray-600 text-gray-200 py-4 px-6 rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200 flex items-center justify-center"
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
