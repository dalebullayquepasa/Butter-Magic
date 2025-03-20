"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { CartItem } from "@/components/cart-drawer";
import { ProductProps } from "@/components/product-card";

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: ProductProps, quantity?: number) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calcula el total de items en el carrito
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Añadir un producto al carrito
  const addToCart = (product: ProductProps, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });

    // Abrir el carrito cuando se añade el primer item
    if (cartItems.length === 0) {
      setIsCartOpen(true);
    }
  };

  // Actualizar la cantidad de un item en el carrito
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Eliminar un item del carrito
  const removeCartItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
} 