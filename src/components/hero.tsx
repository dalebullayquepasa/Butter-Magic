import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Cake, ShoppingCart, Phone } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1920&q=80" 
          alt="Background" 
          fill 
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="relative pt-32 pb-40 sm:pt-40 sm:pb-48">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-[#E2BA45] font-medium text-sm mb-6">
              Los mejores pasteles artesanales
            </span>
            
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
              Deliciosas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E2BA45] to-amber-400">
                Creaciones
              </span>{" "}
              que Cautivan tus Sentidos
            </h1>

            <p className="text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed">
              Descubre nuestra exquisita selección de pasteles y dulces
              elaborados con ingredientes premium y pasión artesanal para momentos inolvidables.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-4 text-white bg-[#E2BA45] rounded-lg hover:bg-[#C6A136] transition-colors text-lg font-medium shadow-lg shadow-amber-500/20"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Explorar Catálogo
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-gray-200 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-lg font-medium"
              >
                Contactar
                <Phone className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 text-white">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20">
                  <Check className="w-5 h-5 text-[#E2BA45]" />
                </div>
                <span>Ingredientes premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20">
                  <Check className="w-5 h-5 text-[#E2BA45]" />
                </div>
                <span>Envío a domicilio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20">
                  <Check className="w-5 h-5 text-[#E2BA45]" />
                </div>
                <span>Opciones para toda ocasión</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-1/4 right-[10%] w-32 h-32 bg-amber-300 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/3 right-[20%] w-24 h-24 bg-amber-200 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
    </div>
  );
}
