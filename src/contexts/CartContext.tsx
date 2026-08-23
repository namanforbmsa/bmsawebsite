/**
 * CartContext
 * Simple cart store for service selections across the site.
 */
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number; // base USD price
  unit: string;
  quantity: number;
};

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
  totalUsd: number;
  totalItems: number;
}

const noopCart: CartContextValue = {
  items: [],
  addItem: () => undefined,
  removeItem: () => undefined,
  updateQuantity: () => undefined,
  decrementItem: () => undefined,
  clearCart: () => undefined,
  totalUsd: 0,
  totalItems: 0,
};

const CartContext = createContext<CartContextValue>(noopCart);

const CART_STORAGE_KEY = "shipshape_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  const decrementItem = (id: string) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((p) => p.id !== id);
      }
      return prev.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p
      );
    });
  };

  const clearCart = () => setItems([]);

  const totalUsd = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    decrementItem,
    clearCart,
    totalUsd,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  return useContext(CartContext);
};
