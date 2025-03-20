import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  isGlutenFree?: boolean;
  isVegan?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: {
  product: ProductProps;
  onAddToCart?: (product: ProductProps) => void;
  onViewDetails?: (product: ProductProps) => void;
}) {
  const { name, description, price, image, isGlutenFree, isVegan, tags } = product;
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const isFavorited = isFavorite(product.id);

  return (
    <Card 
      className="h-full overflow-hidden group transition-all duration-300 hover:shadow-md border border-gray-100 bg-white cursor-pointer"
      onClick={() => onViewDetails && onViewDetails(product)}
    >
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80"
          }
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {isGlutenFree && (
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
              Sin Gluten
            </Badge>
          )}
          {isVegan && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              Vegano
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 left-2 bg-white/80 hover:bg-white rounded-full h-8 w-8 transition-colors ${
            isFavorited ? 'text-[#E2BA45]' : 'text-gray-500'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-[#E2BA45]' : ''}`} />
        </Button>

        {/* Add discount badge if needed */}
        {Math.random() > 0.5 && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            -{Math.floor(Math.random() * 25) + 5}%
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400' : ''}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(24)</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-lg font-semibold text-[#E2BA45]">
            ${price.toFixed(2)}
          </p>
          {Math.random() > 0.5 && (
            <p className="text-sm text-gray-400 line-through">
              ${(price * 1.2).toFixed(2)}
            </p>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-1.5 py-0 text-xs border-gray-200 text-gray-600"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge 
                variant="outline" 
                className="px-1.5 py-0 text-xs border-gray-200 text-gray-600"
                onClick={(e) => e.stopPropagation()}
              >
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-[#E2BA45] hover:bg-[#C6A136] text-white transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
