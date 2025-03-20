"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ProductProps } from "@/components/product-card";

interface FavoritesContextType {
  favorites: ProductProps[];
  addToFavorites: (product: ProductProps) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (product: ProductProps) => void;
  clearFavorites: () => void;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<ProductProps[]>([]);

  // Cargar favoritos desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Calcula el total de favoritos
  const totalFavorites = favorites.length;

  // Verificar si un producto está en favoritos
  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  // Añadir un producto a favoritos
  const addToFavorites = (product: ProductProps) => {
    if (!isFavorite(product.id)) {
      setFavorites(prevFavorites => [...prevFavorites, product]);
    }
  };

  // Eliminar un producto de favoritos
  const removeFromFavorites = (id: string) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
  };

  // Toggle de favorito (añadir si no existe, eliminar si existe)
  const toggleFavorite = (product: ProductProps) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Vaciar favoritos
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        totalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
} 