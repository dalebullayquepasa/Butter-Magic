import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import FeaturedProducts from "@/components/featured-products";
import { api } from "@/lib/polar";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Cake,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  const result = plans?.items;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestras Especialidades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre por qué nuestros clientes nos eligen para sus momentos
              más dulces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Cake className="w-6 h-6" />,
                title: "Pasteles Artesanales",
                description: "Elaborados con ingredientes frescos y naturales",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Calidad Premium",
                description: "Seleccionamos los mejores ingredientes",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Pedidos Personalizados",
                description: "Creamos el postre perfecto para tu ocasión",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Opciones Especiales",
                description: "Alternativas sin gluten y veganas disponibles",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-[#FF90BC] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#FF90BC] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-pink-100">Variedades de Dulces</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-pink-100">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-pink-100">Ingredientes Naturales</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Planes de Suscripción</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para recibir nuestros dulces regularmente.
              Sin compromisos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {result?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para endulzar tu día?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explora nuestro catálogo de deliciosas creaciones artesanales y
            encuentra el postre perfecto.
          </p>
          <a
            href="/catalog"
            className="inline-flex items-center px-6 py-3 text-white bg-[#FF90BC] rounded-lg hover:bg-[#FF70A6] transition-colors"
          >
            Ver Catálogo
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
