"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "1",
    name: "Pastel de Chocolate",
    description: "Delicioso pastel de chocolate con ganache y fresas frescas",
    price: 35.99,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    category: "Pasteles",
    isBestseller: true,
  },
  {
    id: "3",
    name: "Macarons Surtidos",
    description: "Caja de 12 macarons en sabores variados",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
    category: "Macarons",
    isNew: true,
  },
  {
    id: "7",
    name: "Cheesecake de Frambuesa",
    description: "Cremoso cheesecake con coulis de frambuesa",
    price: 32.99,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    category: "Pasteles",
    isBestseller: true,
  },
  {
    id: "9",
    name: "Brownie Vegano",
    description: "Brownie de chocolate intenso sin productos animales",
    price: 16.5,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    category: "Brownies",
    isNew: true,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Productos Destacados
          </h2>
          <Link
            href="/catalog"
            className="text-[#FF90BC] hover:text-[#FF70A6] font-medium flex items-center"
          >
            Ver todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <Link href={`/catalog`} key={product.id}>
              <Card className="h-full overflow-hidden group transition-all duration-300 hover:shadow-md border border-gray-100 bg-white">
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {product.isNew && (
                      <Badge className="bg-[#FF90BC] hover:bg-[#FF70A6]">
                        Nuevo
                      </Badge>
                    )}
                    {product.isBestseller && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-[#FF90BC]">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="bg-[#FF90BC] hover:bg-[#FF70A6] px-8 py-6 text-lg"
          >
            <Link href="/catalog">Ver Catálogo Completo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
