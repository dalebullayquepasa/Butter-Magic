import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

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
}: {
  product: ProductProps;
  onAddToCart?: (product: ProductProps) => void;
}) {
  const { name, description, price, image, isGlutenFree, isVegan } = product;

  return (
    <Card className="h-full overflow-hidden group transition-all duration-300 hover:shadow-md border border-gray-100 bg-white">
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
          className="absolute top-2 left-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            // Favorite functionality would go here
          }}
        >
          <Heart className="h-4 w-4 text-gray-500 hover:text-pink-500" />
        </Button>
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-medium text-lg text-gray-900 line-clamp-1">
          {name}
        </h3>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        <p className="text-lg font-semibold mt-2 text-[#FF90BC]">
          ${price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-[#FF90BC] hover:bg-[#FF70A6] text-white transition-all"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
