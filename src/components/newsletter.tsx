"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    
    // Here you would typically send the email to your backend or newsletter service
    // Simulating API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Suscríbete a Nuestro Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Recibe nuestras novedades, promociones exclusivas y consejos deliciosos directamente en tu bandeja de entrada.
          </p>
          
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">¡Gracias por suscribirte!</h3>
              <p className="text-gray-600">
                Pronto recibirás nuestras deliciosas novedades y ofertas exclusivas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E2BA45] focus:border-transparent"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className={`bg-[#E2BA45] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#C6A136] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  "Suscribirme"
                )}
              </button>
            </form>
          )}
          
          <p className="text-xs text-gray-500 mt-4">
            Al suscribirte, aceptas recibir emails de marketing. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
} 