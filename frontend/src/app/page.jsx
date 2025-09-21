"use client";

import Image from "next/image";
import { useState } from "react";
import { useProducts } from "@/controllers/productController";
import ProductCard from "@/components/ProductCard";

export default function HeroSection() {
  const { data, isLoading } = useProducts();

  return (
    <div className="pt-20">
      <div className="py-8">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row lg:items-center gap-x-6">
          <div className="lg:w-1/2 py-4 lg:py-8 xl:py-12 space-y-7">
            <h1 className="text-gray-900 dark:text-white font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl">
              Let your <span className="text-emerald-600">products</span> come
              to you
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Get best prodducts online without stepping outside from your home
              at your door steps.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center items-center relative lg:h-auto">
            <div className="relative w-full max-w-lg">
              <span className="absolute top-0 left-16 w-3/5 aspect-square rounded-md -rotate-[30deg] translate-y-20 origin-center border border-emerald-200 dark:border-gray-800" />
              <span className="absolute top-1/2 right-8 w-2/5 aspect-square rounded-md rotate-12 -translate-y-1/2 origin-center border border-emerald-200 dark:border-gray-800" />
              <Image
                src="/woman-shopping.png"
                width={1001}
                height={1001}
                alt="woman with grocery"
                className="w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products at
              unbeatable prices
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <span className="ml-4 text-xl text-gray-600 dark:text-gray-400">
                Loading featured products...
              </span>
            </div>
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
              {data.slice(0, 4).map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No products available
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
