"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";

interface FavoriteActionProps {
  productId: string;
}

export function RemoveFavoriteButton({ productId }: FavoriteActionProps) {
  const handleRemoveFavorite = () => {
    console.log(`Eliminar de favoritos: ${productId}`);
    // Aquí iría la lógica para eliminar de favoritos
  };

  return (
    <button 
      className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
      aria-label="Eliminar de favoritos"
      onClick={handleRemoveFavorite}
    >
      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
    </button>
  );
}

export function AddToCartButton({ productId }: FavoriteActionProps) {
  const handleAddToCart = () => {
    console.log(`Añadir al carrito: ${productId}`);
    // Aquí iría la lógica para añadir al carrito
  };

  return (
    <Button 
      size="sm"
      className="bg-[#FF90BC] hover:bg-[#FF70A6]"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-4 w-4 mr-1" />
      Añadir
    </Button>
  );
} 