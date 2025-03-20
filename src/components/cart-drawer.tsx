"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { ProductProps } from "./product-card";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";

export interface CartItem extends ProductProps {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg flex flex-col border-l border-gray-100">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-lg font-semibold">
                <ShoppingCart className="mr-2 h-5 w-5 text-[#E2BA45]" />
                Tu Carrito ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-6">
                Agrega algunos deliciosos productos para comenzar
              </p>
              <Button
                onClick={onClose}
                className="bg-[#E2BA45] hover:bg-[#C6A136]"
              >
                Explorar Productos
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex border-b border-gray-100 pb-4"
                    >
                      <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&q=80"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-red-500"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-[#E2BA45] font-medium">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              onUpdateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 bg-gray-50 p-4 mt-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">Calculado al finalizar</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full bg-[#E2BA45] hover:bg-[#C6A136] text-white py-6"
                    onClick={onCheckout}
                  >
                    Proceder al Pago
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={onClose}
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
