"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useStore } from "../hooks/useStore";
import { getImageSrc } from "../utils";
import { useDeleteProduct } from "../controllers/productController";

const Card = ({ item }) => {
  const img = getImageSrc(item?.img);
  const router = useRouter();

  const { dispatch } = useStore();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleAddToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const handleDeleteProduct = (e) => {
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(item.id, {
        onSuccess: () => {
          toast.success(`${item.name} has been deleted successfully!`);
        },
        onError: (error) => {
          toast.error("Failed to delete product");
          console.error("Delete error:", error);
        },
      });
    }
  };

  return (
    <div
      className="w-80 h-96 max-w-sm bg-gray-700 border border-gray-600 rounded-lg flex flex-col items-center relative overflow-hidden cursor-pointer hover:shadow-2xl hover:bg-gray-600 hover:scale-105 hover:-translate-y-2 transition-all duration-300 group"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/product-detail/${item?.id}`);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(item);
          toast.success("Item Added Successfully");
        }}
        className="w-[36px] h-[36px] bg-gray-600 hover:bg-gray-500 text-white rounded-full absolute top-3 right-3 cursor-pointer flex items-center justify-center text-sm shadow-lg transition-all duration-200 hover:scale-105 z-10"
        title="Add to cart"
      >
        🛒
      </div>

      <div
        onClick={handleDeleteProduct}
        className={`w-[36px] h-[36px] ${
          isDeleting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-500 cursor-pointer"
        } text-white rounded-full absolute top-3 left-3 flex items-center justify-center text-sm shadow-lg transition-all duration-200 hover:scale-105 z-10`}
        title={isDeleting ? "Deleting..." : "Delete product"}
        disabled={isDeleting}
      >
        {isDeleting ? "⏳" : "🗑️"}
      </div>
      <div className="h-60 w-full bg-gray-800 overflow-hidden">
        <img
          src={img}
          alt="img"
          className="w-full h-full object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <h4 className="text-gray-100 font-medium text-center px-2 mb-2 group-hover:text-white transition-colors duration-300">
          {item?.name}
        </h4>
        <h6 className="text-emerald-400 font-semibold text-lg group-hover:text-emerald-300 group-hover:scale-105 transition-all duration-300">
          ${item?.price}
        </h6>
      </div>
    </div>
  );
};
Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
