import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRequest, deleteRequest, fetchRequest } from "../utils";

// Fetch all products
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchRequest("items"),
  });
}

export function useProductDetail(id) {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => fetchRequest(`items/${id}`),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProductData) => createRequest("items", newProductData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate, data, isSuccess, isError, isPending } = useMutation({
    mutationFn: (id) => deleteRequest(`items/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { mutate, data, isSuccess, isError, isPending };
}
