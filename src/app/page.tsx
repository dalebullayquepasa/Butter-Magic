import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import FeaturedProducts from "@/components/featured-products";
import CategorySection from "../components/category-section";
import Testimonials from "../components/testimonials";
import InstagramFeed from "../components/instagram-feed";
import Newsletter from "../components/newsletter";
import { api } from "@/lib/polar";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Cake,
  Clock,
  Truck,
  Heart,
  Instagram,
  Star,
  Gift,
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <CategorySection />

      <section className="py-24 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre por qué nuestros clientes nos eligen para sus momentos
              más dulces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cake className="w-6 h-6" />,
                title: "Ingredientes Premium",
                description: "Seleccionamos los mejores ingredientes naturales y orgánicos para nuestras creaciones."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Calidad Garantizada",
                description: "Cada producto pasa por rigurosos controles de calidad antes de llegar a tus manos."
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Recién Horneado",
                description: "Todos nuestros productos son frescos y preparados el mismo día de la entrega."
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Hecho con Amor",
                description: "Ponemos pasión en cada detalle para crear experiencias dulces memorables."
              },
              {
                icon: <Gift className="w-6 h-6" />,
                title: "Ideal para Regalar",
                description: "Opciones de empaque para regalo y tarjetas personalizadas."
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: "Entrega a Domicilio",
                description: "Llevamos nuestros productos directamente a tu puerta en perfectas condiciones."
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group"
              >
                <div className="p-3 bg-amber-50 text-[#E2BA45] rounded-full w-fit mb-6 group-hover:bg-[#E2BA45] group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#E2BA45] to-amber-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-amber-100">Variedades de Dulces</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-5xl font-bold mb-2">1,000+</div>
              <div className="text-amber-100">Clientes Satisfechos</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-amber-100">Ingredientes Naturales</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="text-5xl font-bold mb-2">5<Star className="inline w-6 h-6 ml-1 -mt-4" /></div>
              <div className="text-amber-100">Valoración Promedio</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Cómo Funciona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hacer tu pedido es rápido y sencillo
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/4 left-1/2 h-2/3 w-0.5 bg-amber-100 hidden md:block" />

            <div className="grid md:grid-cols-3 gap-16">
              {[
                {
                  number: "01",
                  title: "Elige tus Favoritos",
                  description: "Explora nuestro catálogo y selecciona los productos que deseas."
                },
                {
                  number: "02",
                  title: "Personaliza tu Pedido",
                  description: "Ajusta cantidades, añade mensajes especiales o instrucciones específicas."
                },
                {
                  number: "03",
                  title: "Disfruta de la Entrega",
                  description: "Recibe tus dulces favoritos directo en tu puerta y disfruta de la experiencia."
                }
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-[#E2BA45] text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 max-w-xs mx-auto">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <Testimonials />

      <InstagramFeed />

      <section className="py-24 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Planes de Suscripción</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para recibir nuestros dulces regularmente.
              Sin compromisos, cancela cuando quieras.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {result?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#E2BA45] to-amber-500 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para endulzar tu día?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Explora nuestro catálogo de deliciosas creaciones artesanales y
              encuentra el postre perfecto para cualquier ocasión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/catalog"
                className="inline-flex items-center px-6 py-3 text-[#E2BA45] bg-white rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Ver Catálogo
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors font-medium"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
