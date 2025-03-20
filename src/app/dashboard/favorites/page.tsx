"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Heart, ShoppingCart, Star, Trash2, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";
import { createClient } from "../../../utils/supabase";

export default function FavoritesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const router = useRouter();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  
  // Filtrar productos según búsqueda
  const filteredFavorites = favorites.filter(
    (product) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      
      if (!data.user) {
        return redirect("/sign-in");
      }
      
      setUser(data.user);
      setLoading(false);
    };
    
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse bg-gray-200 h-12 w-12 rounded-full"></div>
        </div>
      </div>
    );
  }

  const handleRemoveFromFavorites = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromFavorites(productId);
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen pb-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <Heart className="mr-2 h-6 w-6 text-[#E2BA45]" />
                Mis Favoritos
              </h1>
              <p className="text-gray-600">Productos que has guardado para más tarde</p>
            </div>
            
            {/* Filtros y Búsqueda */}
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar en favoritos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#E2BA45] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Lista de Favoritos */}
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFavorites.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
                  onClick={() => router.push(`/catalog/${product.id}`)}
                >
                  {/* Imagen del producto */}
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Botón de eliminar favoritos */}
                    <button 
                      className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
                      aria-label="Eliminar de favoritos"
                      onClick={(e) => handleRemoveFromFavorites(product.id, e)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </button>
                    
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                      {product.tags && product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/90 text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {product.isVegan && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          Vegano
                        </Badge>
                      )}
                      {product.isGlutenFree && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Sin Gluten
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Detalles del producto */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#E2BA45] transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mt-1.5 mb-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">4.5</span>
                      </div>
                      <span className="mx-1.5 text-gray-300">·</span>
                      <span className="text-sm text-gray-500">24 reseñas</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-lg text-[#E2BA45]">${product.price.toFixed(2)}</span>
                      </div>
                      
                      {/* Botón de añadir al carrito */}
                      <Button 
                        size="sm"
                        className="bg-[#E2BA45] hover:bg-[#C6A136]"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Añadir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aún no tienes favoritos</h3>
              <p className="text-gray-500 mb-6">Guarda productos para comprarlos más tarde o mantenerlos en tu lista de deseos.</p>
              <Link href="/catalog">
                <Button className="bg-[#E2BA45] hover:bg-[#C6A136]">
                  Explorar Productos
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 