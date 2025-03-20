"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CategorySection() {
  const categories = [
    {
      title: "Pasteles",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      link: "/catalog?category=pasteles",
      description: "Pasteles para celebraciones"
    },
    {
      title: "Cupcakes",
      image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80",
      link: "/catalog?category=cupcakes",
      description: "Pequeños bocados de felicidad"
    },
    {
      title: "Galletas",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      link: "/catalog?category=galletas",
      description: "Crujientes y deliciosas"
    },
    {
      title: "Especiales",
      image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
      link: "/catalog?category=especiales",
      description: "Creaciones únicas"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestras Categorías</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra deliciosa variedad de dulces y pasteles para cualquier ocasión
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-80"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm text-white/80 mb-4">{category.description}</p>
                <Link
                  href={category.link}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
                >
                  Explorar
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 