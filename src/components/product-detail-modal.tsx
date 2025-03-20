"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Heart, 
  ShoppingCart, 
  Clock, 
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Truck,
  ShieldCheck,
  Star
} from "lucide-react";
import { ProductProps } from "./product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useFavorites } from "@/context/favorites-context";

interface ProductDetailModalProps {
  product: ProductProps | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: ProductProps, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) return null;

  // Mock additional images - in a real app, these would come from the product data
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
  ];

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Add to cart with correct quantity
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  // Calculate discount for promotional display - just for UI purposes
  const originalPrice = product.price * 1.2;
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const productIsFavorite = isFavorite(product.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#E2BA45] hover:bg-[#C6A136]">
                {product.category}
              </Badge>
              
              {product.isGlutenFree && (
                <Badge variant="outline" className="text-amber-800 border-amber-300">
                  Sin Gluten
                </Badge>
              )}
              
              {product.isVegan && (
                <Badge variant="outline" className="text-green-800 border-green-300">
                  Vegano
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
              >
                <Heart className={`h-5 w-5 ${productIsFavorite ? 'fill-[#E2BA45] text-[#E2BA45]' : 'text-gray-400'}`} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
              >
                <Share2 className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold mt-4">{product.name}</DialogTitle>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(24 valoraciones)</span>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Product Image Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {productImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative overflow-hidden rounded-xl">
                      <Image 
                        src={img} 
                        alt={`${product.name} - imagen ${index + 1}`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{discountPercentage}%
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {discountPercentage > 0 && (
                <span className="text-lg text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
              )}
            </div>

            <DialogDescription className="text-gray-700 mb-6">
              {product.description}
            </DialogDescription>
            
            {/* Product Availability */}
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-700">En stock - Entrega en 24-48 horas</span>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Cantidad</p>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseQuantity} 
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-l-lg rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-10 px-4 flex items-center justify-center border-y border-gray-200 bg-white">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseQuantity}
                  className="h-10 w-10 rounded-r-lg rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Etiquetas</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              <Button 
                className="bg-[#E2BA45] hover:bg-[#C6A136] py-6 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al Carrito
              </Button>
              
              <Button 
                variant="secondary"
                className="bg-amber-100 hover:bg-amber-200 text-[#E2BA45] border border-amber-200 py-6"
              >
                Comprar Ahora
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
            <TabsTrigger value="reviews">Valoraciones</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-[#E2BA45] mr-4" />
                  <div>
                    <h4 className="font-medium">Envío Gratis</h4>
                    <p className="text-sm text-gray-500">En pedidos superiores a $50</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-[#E2BA45] mr-4" />
                  <div>
                    <h4 className="font-medium">Garantía de Calidad</h4>
                    <p className="text-sm text-gray-500">Ingredientes de primera calidad</p>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium mt-4">Descripción del Producto</h4>
              <p className="text-gray-700">
                {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nullam in sem vel magna feugiat commodo. Integer vitae lacus vel lectus tempor 
                elementum. Praesent eleifend, est vel hendrerit commodo, velit urna vulputate 
                magna, at consequat turpis turpis vel arcu.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-4">
            <h4 className="font-medium mb-2">Ingredientes</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Harina de trigo</li>
              <li>Azúcar</li>
              <li>Mantequilla</li>
              <li>Huevos</li>
              <li>Chocolate belga</li>
              <li>Frutos secos (pueden contener trazas de gluten)</li>
              <li>Vainilla natural</li>
            </ul>
            
            <h4 className="font-medium mt-4 mb-2">Información Nutricional</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Calorías: 320 kcal</div>
                <div>Grasas: 16g</div>
                <div>Carbohidratos: 42g</div>
                <div>Proteínas: 4g</div>
                <div>Azúcares: 28g</div>
                <div>Fibra: 2g</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="mb-4 pb-4 border-b">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Valoraciones de Clientes</h4>
                <Button variant="outline">Escribir valoración</Button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold">4.8</div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-yellow-400' : ''}`} />
                  ))}
                </div>
                <div className="text-sm text-gray-500">24 valoraciones</div>
              </div>
            </div>
            
            {/* Example Reviews */}
            <div className="space-y-6">
              {[
                {
                  name: "María García",
                  date: "12 Agosto, 2023",
                  rating: 5,
                  comment: "¡Delicioso! El pastel estaba perfectamente horneado y el sabor era increíble. Definitivamente volveré a comprar."
                },
                {
                  name: "José Martínez",
                  date: "3 Julio, 2023",
                  rating: 4,
                  comment: "Muy buen producto, aunque la entrega tardó un poco más de lo esperado. El sabor compensa la espera."
                }
              ].map((review, index) => (
                <div key={index} className="pb-4 border-b last:border-0">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400' : ''}`} />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products - Optional */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-bold text-lg mb-4">También te puede gustar</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Show 4 mock related products */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="cursor-pointer group">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-2">
                  <Image 
                    src={`https://images.unsplash.com/photo-155550${i + 4000}?w=400&q=80`} 
                    alt={`Producto relacionado ${i}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h5 className="font-medium text-sm">Producto relacionado {i}</h5>
                <p className="text-[#E2BA45] font-medium text-sm">${(20 + i).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 