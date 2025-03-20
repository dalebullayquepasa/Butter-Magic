"use client";

import { Instagram } from "lucide-react";

export default function InstagramFeed() {
  const instagramPosts = [
    "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&q=80",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=80",
    "https://images.unsplash.com/photo-1455099229380-7b52707e356a?w=400&q=80",
    "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400&q=80",
    "https://images.unsplash.com/photo-1563778084459-859099e7b1dd?w=400&q=80"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center text-[#E2BA45] mb-4">
            <Instagram className="w-5 h-5 mr-2" /> @butterandmagic
          </div>
          <h2 className="text-3xl font-bold mb-4">Síguenos en Instagram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comparte tus momentos dulces etiquetándonos #ButterAndMagic
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {instagramPosts.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg group relative">
              <img 
                src={image} 
                alt={`Instagram post ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-[#E2BA45]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-lg hover:from-amber-700 hover:to-yellow-600 transition-colors font-medium"
          >
            Ver Más en Instagram
            <Instagram className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
} 