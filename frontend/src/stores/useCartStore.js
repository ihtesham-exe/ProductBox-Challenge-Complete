import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],

      // Actions
      addToCart: (item) => {
        set((state) => ({
          items: [...state.items, item]
        }));
      },

      removeFromCart: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId)
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      setCart: (items) => {
        set({ items });
      },

      // Helper method to get cart item count
      getCartItemCount: () => {
        return get().items.length;
      },

      // Helper method to get grouped cart items with quantities
      getGroupedCartItems: () => {
        const items = get().items;
        return items.reduce((acc, item) => {
          const existingItem = acc.find((i) => i.id === item.id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            acc.push({ ...item, quantity: 1 });
          }
          return acc;
        }, []);
      },

      // Helper method to get total price
      getTotalPrice: () => {
        const groupedItems = get().getGroupedCartItems();
        return groupedItems.reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cartItems', // localStorage key
      getStorage: () => localStorage, // use localStorage
    }
  )
);

export default useCartStore;