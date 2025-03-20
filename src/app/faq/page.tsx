"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { SearchIcon, HelpCircle, Cake, Truck, CreditCard, ShoppingBag, Clock, Package } from "lucide-react";
import { useState } from "react";

// Definimos los tipos para nuestras preguntas frecuentes
interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategories {
  [key: string]: FAQ[];
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Categorías de preguntas frecuentes
  const faqCategories = [
    {
      id: "products",
      name: "Productos",
      icon: <Cake className="w-5 h-5" />,
    },
    {
      id: "orders",
      name: "Pedidos",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      id: "delivery",
      name: "Envíos",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: "payment",
      name: "Pagos",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "special-orders",
      name: "Pedidos Especiales",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: "time",
      name: "Tiempos de Entrega",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  // Preguntas frecuentes por categoría
  const faqItems: FAQCategories = {
    products: [
      {
        question: "¿Qué ingredientes utilizan en sus productos?",
        answer: "Utilizamos ingredientes de la más alta calidad, seleccionados cuidadosamente de proveedores confiables. Trabajamos con harinas premium, mantequilla real, chocolate belga, frutas frescas y productos lácteos de granjas locales. Evitamos conservantes artificiales y colorantes sintéticos, priorizando lo natural."
      },
      {
        question: "¿Ofrecen opciones para personas con restricciones alimentarias?",
        answer: "Sí, contamos con una variedad de opciones para diferentes necesidades. Ofrecemos productos sin gluten, opciones veganas, sin azúcar añadida y adaptamos nuestras recetas para alergias específicas. Recomendamos mencionar cualquier restricción al realizar su pedido para garantizar que podamos atenderle correctamente."
      },
      {
        question: "¿Cuánto tiempo se mantienen frescos sus productos?",
        answer: "Nuestros productos se elaboran sin conservantes artificiales, por lo que recomendamos consumirlos en las primeras 24-48 horas para disfrutar de su máxima frescura. Los pasteles pueden refrigerarse hasta 3-4 días. Incluimos instrucciones específicas de conservación con cada pedido."
      },
      {
        question: "¿Puedo ver el catálogo completo de productos?",
        answer: "Puede explorar nuestro catálogo completo en la sección 'Catálogo' de nuestra página web. Allí encontrará fotos, descripciones detalladas, precios y opciones disponibles. También puede visitar nuestra pastelería para ver nuestras creaciones en persona."
      }
    ],
    orders: [
      {
        question: "¿Cómo puedo realizar un pedido?",
        answer: "Puede realizar su pedido de varias formas: a través de nuestra página web en la sección 'Catálogo', llamándonos al (123) 456-7890, enviándonos un email a pedidos@dulcepasteleria.com, o visitando nuestra tienda física. Para pedidos personalizados, recomendamos contactarnos directamente para discutir los detalles."
      },
      {
        question: "¿Con cuánta anticipación debo hacer mi pedido?",
        answer: "Para productos estándar de nuestro catálogo, recomendamos hacer el pedido con al menos 48 horas de anticipación. Para pasteles personalizados o pedidos grandes para eventos, sugerimos contactarnos con 1-2 semanas de anticipación, especialmente en temporadas de alta demanda."
      },
      {
        question: "¿Cómo puedo modificar o cancelar mi pedido?",
        answer: "Para modificaciones o cancelaciones, contáctenos lo antes posible. Las modificaciones están sujetas a disponibilidad y tiempo. Las cancelaciones son posibles sin costo hasta 48 horas antes de la fecha de entrega. Cancelaciones con menos tiempo pueden estar sujetas a un cargo parcial, especialmente en pedidos personalizados."
      },
      {
        question: "¿Ofrecen servicio para eventos?",
        answer: "Sí, ofrecemos servicios completos para eventos como bodas, cumpleaños, eventos corporativos y celebraciones especiales. Podemos proporcionar mesas de postres, pasteles para ocasiones especiales y opciones de catering dulce. Contáctenos para una consulta personalizada."
      }
    ],
    delivery: [
      {
        question: "¿Cuál es su área de cobertura para entregas?",
        answer: "Realizamos entregas en toda la zona metropolitana de la Ciudad de México. Para zonas fuera de nuestra área habitual, podemos evaluar opciones especiales con un costo adicional. Consulte nuestro mapa de cobertura en la sección de 'Contacto' para verificar si su ubicación está incluida."
      },
      {
        question: "¿Cuál es el costo de envío?",
        answer: "El costo de envío varía según la distancia y el tamaño del pedido. Ofrecemos envío gratuito para pedidos superiores a $500 dentro de nuestra zona principal. Para otras áreas, el costo oscila entre $80 y $150. Al finalizar su compra, podrá ver el costo exacto de envío para su ubicación."
      },
      {
        question: "¿Cómo garantizan que los productos lleguen en perfecto estado?",
        answer: "Utilizamos empaques especiales diseñados para proteger nuestros productos durante el transporte. Los pasteles van en cajas refrigeradas cuando es necesario, y contamos con vehículos acondicionados para mantener la temperatura adecuada. Nuestros repartidores están capacitados para manipular productos delicados."
      },
      {
        question: "¿Puedo elegir la hora exacta de entrega?",
        answer: "Trabajamos con franjas horarias de entrega (mañana: 9am-12pm, tarde: 1pm-5pm) para garantizar flexibilidad operativa. Si necesita una hora específica, haremos lo posible por acomodar su solicitud, aunque no podemos garantizar entregas en horas exactas debido a factores de tráfico y logística."
      }
    ],
    payment: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos diversas formas de pago: tarjetas de crédito/débito (Visa, Mastercard, American Express), transferencias bancarias, PayPal, y efectivo (solo en tienda o contra entrega). Para pedidos grandes o personalizados, solicitamos un anticipo del 50% para confirmar la reserva."
      },
      {
        question: "¿Es seguro pagar en línea?",
        answer: "Sí, nuestra plataforma de pago en línea está protegida con encriptación SSL de 256 bits, garantizando que sus datos estén seguros. Trabajamos con procesadores de pago reconocidos internacionalmente que cumplen con los estándares PCI DSS de seguridad para transacciones con tarjeta."
      },
      {
        question: "¿Emiten facturas?",
        answer: "Sí, emitimos facturas para todas las compras. Si requiere factura, por favor proporcione sus datos fiscales al momento de realizar el pedido o solicítela posteriormente enviando un correo a facturacion@dulcepasteleria.com dentro del mismo mes de la compra."
      },
      {
        question: "¿Tienen política de devoluciones?",
        answer: "Nos comprometemos con la calidad de nuestros productos. Si no está satisfecho con su compra por problemas de calidad, contáctenos dentro de las 24 horas siguientes a la recepción. Evaluaremos cada caso y ofreceremos reembolso o reemplazo cuando corresponda, siguiendo nuestras políticas detalladas en la sección 'Términos y Condiciones'."
      }
    ],
    "special-orders": [
      {
        question: "¿Pueden crear diseños personalizados para pasteles?",
        answer: "Absolutamente. Nos especializamos en pasteles personalizados para cualquier ocasión. Podemos crear diseños basados en sus ideas, fotografías o temas específicos. Recomendamos una consulta previa para discutir detalles, posibilidades y presupuesto."
      },
      {
        question: "¿Qué información necesitan para un pedido personalizado?",
        answer: "Para pedidos personalizados, necesitamos: fecha del evento, número de personas/porciones, sabores preferidos, restricciones alimentarias, detalles del diseño/tema, y presupuesto aproximado. Referencias visuales o imágenes de inspiración son muy útiles para entender exactamente lo que desea."
      },
      {
        question: "¿Crean pasteles de boda?",
        answer: "Sí, somos especialistas en pasteles de boda. Ofrecemos consultas y degustaciones personalizadas para parejas. Nuestro servicio incluye diseño, elaboración, entrega e instalación en el lugar del evento. Recomendamos reservar con 3-6 meses de anticipación, especialmente para temporada alta de bodas."
      },
      {
        question: "¿Hacen mesas de postres para eventos?",
        answer: "Ofrecemos servicios completos de mesas de postres que incluyen una variedad de mini pasteles, cupcakes, galletas decoradas, macarons y otras delicias. Personalizamos la selección según su evento y preferencias. Incluimos montaje, decoración temática y desmontaje posterior."
      }
    ],
    time: [
      {
        question: "¿Cuál es el horario de la pastelería?",
        answer: "Nuestro horario de atención es: Lunes a Viernes de 9:00 AM a 7:00 PM, Sábados de 10:00 AM a 6:00 PM y Domingos de 10:00 AM a 2:00 PM. Para épocas festivas, podemos tener horarios extendidos que anunciaremos en nuestras redes sociales."
      },
      {
        question: "¿Hacen entregas los fines de semana?",
        answer: "Sí, realizamos entregas los sábados en horario de 10:00 AM a 5:00 PM. Los domingos tenemos entregas limitadas hasta la 1:00 PM, sujetas a disponibilidad y con un costo adicional. Recomendamos programar las entregas de fin de semana con anticipación."
      },
      {
        question: "¿Ofrecen servicio de entregas urgentes o el mismo día?",
        answer: "Ofrecemos entregas urgentes sujetas a disponibilidad con un cargo adicional. Para entregas el mismo día, debe realizarse el pedido antes de las 10:00 AM y limitado a productos disponibles en tienda (no personalizados). Recomendamos llamar directamente para verificar esta posibilidad."
      },
      {
        question: "¿Cuánto tiempo antes debo ordenar para fechas especiales como Navidad o San Valentín?",
        answer: "Para fechas de alta demanda como Navidad, Día de las Madres, San Valentín y otras festividades, recomendamos realizar su pedido con al menos 7-10 días de anticipación. Algunos productos especiales de temporada tienen cupo limitado y pueden agotarse rápidamente."
      }
    ]
  };

  // Filtrar las preguntas basadas en la búsqueda
  const filteredFAQs: FAQCategories = searchQuery
    ? Object.entries(faqItems).reduce<FAQCategories>((acc, [category, questions]) => {
        const filteredQuestions = questions.filter(
          (q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredQuestions.length > 0) {
          acc[category] = filteredQuestions;
        }
        return acc;
      }, {})
    : faqItems;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-[#FF90BC]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Preguntas Frecuentes</h1>
          <p className="text-xl max-w-2xl mx-auto text-white">
            Encuentra respuestas a las dudas más comunes sobre nuestros productos y servicios
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar preguntas..."
                className="w-full px-12 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF90BC] focus:border-transparent text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {searchQuery ? (
            // Mostrar resultados de búsqueda
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Resultados para "{searchQuery}"
              </h2>
              {Object.keys(filteredFAQs).length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
                  <p className="text-gray-600 mb-6">
                    Intenta con otra palabra clave o consulta las categorías disponibles
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-6 py-3 bg-[#FF90BC] text-white rounded-lg hover:bg-[#FF70A6] transition-colors font-medium"
                  >
                    Ver todas las preguntas
                  </button>
                </div>
              ) : (
                // Mostrar resultados agrupados por categoría
                Object.entries(filteredFAQs).map(([categoryId, questions]) => (
                  <div key={categoryId} className="mb-12">
                    <div className="flex items-center mb-6">
                      {faqCategories.find(c => c.id === categoryId)?.icon}
                      <h3 className="text-xl font-bold ml-2">
                        {faqCategories.find(c => c.id === categoryId)?.name}
                      </h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-4">
                      {questions.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${categoryId}-${index}`}
                          className="border border-gray-100 rounded-lg shadow-sm overflow-hidden"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:bg-pink-50 hover:no-underline text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
            </div>
          ) : (
            // Mostrar todas las categorías
            <div>
              <h2 className="text-2xl font-bold mb-8 text-center">
                Selecciona una categoría
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                {faqCategories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-[#FF90BC]"
                    onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <div className="bg-pink-100 text-[#FF90BC] w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                ))}
              </div>

              <div className="max-w-3xl mx-auto space-y-16">
                {Object.entries(faqItems).map(([categoryId, questions]) => (
                  <div id={categoryId} key={categoryId} className="scroll-mt-24">
                    <div className="flex items-center mb-6">
                      {faqCategories.find(c => c.id === categoryId)?.icon}
                      <h3 className="text-xl font-bold ml-2">
                        {faqCategories.find(c => c.id === categoryId)?.name}
                      </h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-4">
                      {questions.map((faq, index) => (
                        <AccordionItem 
                          key={index} 
                          value={`${categoryId}-${index}`}
                          className="border border-gray-100 rounded-lg shadow-sm overflow-hidden"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:bg-pink-50 hover:no-underline text-left font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">¿No encontraste lo que buscabas?</h2>
            <p className="text-gray-600 mb-8">
              Si tienes alguna pregunta adicional, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#FF90BC] text-white rounded-lg hover:bg-[#FF70A6] transition-colors font-medium"
              >
                Contactar
              </Link>
              <a
                href="tel:1234567890"
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Llamar (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 