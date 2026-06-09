"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItemType {
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  brand: string;
  rating: number;
}

interface WishlistState {
  items: WishlistItemType[];
  addItem: (item: WishlistItemType) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          if (state.items.find((i) => i.productId === item.productId)) return state;
          return { items: [...state.items, item] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      },
      isInWishlist: (productId) => get().items.some((i) => i.productId === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: "empty-chart-wishlist" }
  )
);
