"use client";

import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  testimonial: string;
  stars?: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "María García",
      role: "Cliente Frecuente",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      testimonial: "Los pasteles no solo son hermosos visualmente, sino que su sabor es extraordinario. Siempre recibo cumplidos cuando comparto sus dulces en mis reuniones.",
      stars: 5
    },
    {
      name: "Carlos Rodríguez",
      role: "Comprador Recurrente",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      testimonial: "He probado muchas pastelerías en la ciudad, pero esta es sin duda la mejor. Sus cupcakes son perfectos y el servicio es impecable.",
      stars: 5
    },
    {
      name: "Laura Martínez",
      role: "Organizadora de Eventos",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      testimonial: "Siempre recurro a ellos para los eventos que organizo. La calidad es consistente y todos mis clientes quedan encantados con los postres.",
      stars: 5
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Opiniones de quienes han disfrutado de nuestra dulce experiencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(testimonial.stars || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 