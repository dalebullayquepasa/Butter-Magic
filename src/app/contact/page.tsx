"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Check,
  AlertCircle,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      // En una implementación real, aquí se enviaría el formulario al backend
      console.log("Form submitted:", data);
      
      // Simular una espera de servidor
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-[#FF90BC]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Contacto
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-white">
            Estamos aquí para atender tus consultas, recibir tus pedidos y escuchar tus comentarios
          </p>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Información de Contacto</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-[#FF90BC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ubicación</h3>
                    <p className="text-gray-600 mb-1">Calle Dulzura 123</p>
                    <p className="text-gray-600 mb-1">Colonia Centro</p>
                    <p className="text-gray-600">Ciudad de México, CP 12345</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-[#FF90BC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Teléfono</h3>
                    <p className="text-gray-600 mb-1">
                      <a 
                        href="tel:+521234567890" 
                        className="hover:text-[#FF90BC] transition-colors"
                      >
                        (123) 456-7890
                      </a>
                    </p>
                    <p className="text-gray-600 mb-1">
                      <a 
                        href="tel:+521234567891" 
                        className="hover:text-[#FF90BC] transition-colors"
                      >
                        (123) 456-7891
                      </a> 
                      <span className="text-gray-500 text-sm ml-2">(Pedidos)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-[#FF90BC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <p className="text-gray-600 mb-1">
                      <a 
                        href="mailto:info@dulcepasteleria.com" 
                        className="hover:text-[#FF90BC] transition-colors"
                      >
                        info@dulcepasteleria.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a 
                        href="mailto:pedidos@dulcepasteleria.com" 
                        className="hover:text-[#FF90BC] transition-colors"
                      >
                        pedidos@dulcepasteleria.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-[#FF90BC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Horario</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-gray-600">Lunes - Viernes:</p>
                      <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                      
                      <p className="text-gray-600">Sábado:</p>
                      <p className="text-gray-600">10:00 AM - 6:00 PM</p>
                      
                      <p className="text-gray-600">Domingo:</p>
                      <p className="text-gray-600">10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-100 hover:bg-pink-200 text-[#FF90BC] p-3 rounded-full transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-100 hover:bg-pink-200 text-[#FF90BC] p-3 rounded-full transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-100 hover:bg-pink-200 text-[#FF90BC] p-3 rounded-full transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Envíanos un mensaje</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                  <p className="mb-4">
                    Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo más pronto posible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-[#FF90BC] text-white rounded-lg hover:bg-[#FF70A6] transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center mb-4">
                      <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                      <p>Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.</p>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#FF90BC]'} focus:outline-none focus:ring-2 focus:border-transparent`}
                        placeholder="Tu nombre"
                        {...register("name", { required: "El nombre es requerido" })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#FF90BC]'} focus:outline-none focus:ring-2 focus:border-transparent`}
                        placeholder="tu@email.com"
                        {...register("email", { 
                          required: "El email es requerido",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email inválido"
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#FF90BC] focus:outline-none focus:ring-2 focus:border-transparent"
                        placeholder="(123) 456-7890"
                        {...register("phone")}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Asunto *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#FF90BC]'} focus:outline-none focus:ring-2 focus:border-transparent`}
                        placeholder="¿En qué podemos ayudarte?"
                        {...register("subject", { required: "El asunto es requerido" })}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-[#FF90BC]'} focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="Escribe tu mensaje aquí..."
                      {...register("message", { 
                        required: "El mensaje es requerido",
                        minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" }
                      })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 w-full bg-[#FF90BC] text-white rounded-lg hover:bg-[#FF70A6] transition-colors font-medium flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" /> Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Visítanos</h2>
          <div className="rounded-xl overflow-hidden shadow-lg h-[400px] relative">
            {/* Esta sería una etiqueta iframe de Google Maps en una implementación real */}
            {/* Aquí usamos una imagen estática como placeholder */}
            <Image 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80" 
              alt="Mapa de ubicación de la pastelería" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                <h3 className="font-bold text-lg mb-2">Dulce Pastelería</h3>
                <p className="text-gray-600 mb-4">Calle Dulzura 123, Colonia Centro, Ciudad de México</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-[#FF90BC] text-white rounded-lg hover:bg-[#FF70A6] transition-colors text-sm font-medium"
                >
                  <MapPin className="mr-2 h-4 w-4" /> Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Tienes más preguntas?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Consulta nuestra sección de preguntas frecuentes donde podrás encontrar respuestas a las dudas más comunes sobre nuestros productos y servicios.
          </p>
          <Link
            href="/faq"
            className="px-6 py-3 bg-[#FF90BC] text-white rounded-lg hover:bg-[#FF70A6] transition-colors font-medium inline-flex items-center"
          >
            Ver preguntas frecuentes
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
} 