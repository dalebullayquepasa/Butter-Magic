"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";
import { User } from "@supabase/supabase-js";
import { ShoppingCart, Menu, Search, Heart, ChevronDown } from "lucide-react";
import CartDrawer from "./cart-drawer";
import { useCart } from "@/context/cart-context";

export default function ClientNavbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Usar el contexto del carrito
  const { cartItems, isCartOpen, setIsCartOpen, totalItems, updateCartItemQuantity, removeCartItem } = useCart();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return (
      <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="bg-[#E2BA45] text-white text-xs py-2 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div>
              <span className="mr-6">📱 Teléfono: (123) 456-7890</span>
              <span>📧 Email: info@butterandmagic.com</span>
            </div>
            <div className="flex gap-4">
              <Link href="/about" className="hover:underline">Sobre Nosotros</Link>
              <Link href="/faq" className="hover:underline">Preguntas Frecuentes</Link>
              <Link href="/contact" className="hover:underline">Contacto</Link>
            </div>
          </div>
        </div>
        
        <nav className="py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-[#E2BA45]">
              Butter & Magic
            </Link>
            <div className="flex gap-4 items-center">
              <div className="h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      {/* Top Bar with contact info */}
      <div className="bg-[#E2BA45] text-white text-xs py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <span className="mr-6">📱 Teléfono: (123) 456-7890</span>
            <span>📧 Email: info@butterandmagic.com</span>
          </div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">Sobre Nosotros</Link>
            <Link href="/faq" className="hover:underline">Preguntas Frecuentes</Link>
            <Link href="/contact" className="hover:underline">Contacto</Link>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#E2BA45]">
            Butter & Magic
          </Link>
          
          {/* Main Menu - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-800 hover:text-[#E2BA45] font-medium text-sm">
              Inicio
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-800 hover:text-[#E2BA45] font-medium text-sm">
                Categorías <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link href="/catalog?category=pasteles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Pasteles
                  </Link>
                  <Link href="/catalog?category=cupcakes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Cupcakes
                  </Link>
                  <Link href="/catalog?category=galletas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Galletas
                  </Link>
                  <Link href="/catalog?category=especiales" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Especialidades
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/catalog" className="text-gray-800 hover:text-[#E2BA45] font-medium text-sm">
              Todos los Productos
            </Link>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 items-center">
            {/* Search Button */}
            <button className="p-2 text-gray-500 hover:text-[#E2BA45]">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Wishlist - Logged in users only */}
            {user && (
              <Link href="/dashboard/favorites" className="p-2 text-gray-500 hover:text-[#E2BA45]">
                <Heart className="h-5 w-5" />
              </Link>
            )}
            
            {/* Cart */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-500 hover:text-[#E2BA45]"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-[#E2BA45] text-white rounded-full">
                {totalItems}
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button className="p-2 text-gray-500 hover:text-[#E2BA45] md:hidden">
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Account */}
            {user ? (
              <UserProfile />
            ) : (
              <div className="hidden md:flex gap-2">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Iniciar Sesión
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-[#E2BA45] hover:bg-[#C6A136]">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeCartItem}
        onCheckout={() => alert("Redirigiendo al checkout...")}
      />
    </header>
  );
}
