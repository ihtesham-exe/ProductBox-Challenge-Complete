"use client";

import Card from "@/components/ProductCard";
import { useProducts } from "@/controllers/productController";
import { useState, useMemo } from "react";

const CardList = () => {
  const { data, isLoading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!data || !searchTerm.trim()) return data;
    return data.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useMemo hook automatically
  };

  return (
    <div className="pt-28 px-5 sm:px-10 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-200">
          All Products
        </h1>

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-8">
          <form
            onSubmit={handleSearch}
            className="flex w-full text-gray-700 dark:text-gray-400"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products... (e.g., King Size Bed, Comfy slippers)"
              className="px-5 py-2.5 border border-emerald-200 dark:border-gray-800 border-r-0 rounded-l-md flex w-full outline-none bg-emerald-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
            <button
              type="submit"
              aria-label="search btn"
              className="outline-none text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2.5 rounded-r-md min-w-max transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
          {searchTerm && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {filteredProducts?.length || 0} product(s) found for "{searchTerm}
              "
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <span className="ml-4 text-xl text-gray-600 dark:text-gray-400">
              Loading products...
            </span>
          </div>
        ) : filteredProducts?.length ? (
          <div className="flex flex-wrap justify-center gap-6">
            {filteredProducts.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        ) : searchTerm ? (
          <div className="flex flex-col justify-center items-center h-64">
            <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
              No products found for "{searchTerm}"
            </h2>
            <button
              onClick={() => setSearchTerm("")}
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <h1 className="text-xl font-medium text-gray-600 dark:text-gray-400">
              No products found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;
