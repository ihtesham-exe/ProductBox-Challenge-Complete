"use client";

import { useCreateProduct } from "@/controllers/productController";
import React, { useState } from "react";
import { toast } from "sonner";
import { addProductSchema } from "@/utils/inputValidation";

function AddItem() {
  const { mutate, isPending, isSuccess } = useCreateProduct();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    img: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate using Yup schema
      await addProductSchema.validate(formData, { abortEarly: false });

      // Prepare data for submission
      const itemData = {
        name: formData.name,
        price: parseFloat(formData.price),
        img: formData.img,
      };

      // Submit using mutate function
      mutate(itemData, {
        onSuccess: () => {
          toast.success("Item added successfully!");
          // Reset form
          setFormData({
            name: "",
            price: "",
            img: "",
          });
          setErrors({});
        },
        onError: (error) => {
          toast.error("Failed to add item");
          console.error("Error adding item:", error);
        },
      });
    } catch (validationError) {
      // Handle Yup validation errors
      if (validationError.inner) {
        const newErrors = {};
        validationError.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        toast.error("Please fix the validation errors");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-28 px-6 pb-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Item</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name (3-25 characters)"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price (e.g., 100)"
            min="0"
            step="0.01"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
              errors.price
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isPending}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
            placeholder="Enter full image URL (e.g., https://example.com/image.jpg)"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
              errors.img
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isPending}
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter a full URL starting with http:// or https://
          </p>
          {errors.img && (
            <p className="text-red-500 text-sm mt-1">{errors.img}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 px-4 rounded-lg font-medium ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          } text-white transition duration-200`}
        >
          {isPending ? "Adding Item..." : "Add Item"}
        </button>
      </form>

      {/* Preview section */}
      {(formData.name || formData.price || formData.img) && (
        <div className="mt-8 p-4 bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-white">Preview:</h3>
          <div className="text-sm space-y-1">
            <p className="text-white">
              <strong className="text-gray-300">Name:</strong>{" "}
              {formData.name || "Not specified"}
            </p>
            <p className="text-white">
              <strong className="text-gray-300">Price:</strong> $
              {formData.price || "0"}
            </p>
            <p className="text-white">
              <strong className="text-gray-300">Image:</strong>{" "}
              {formData.img || "No image"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddItem;
