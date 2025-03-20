import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Cake,
  Users,
  HeartHandshake,
  Leaf,
  Award,
  ThumbsUp,
  CheckCircle 
} from "lucide-react";

export default function AboutPage() {
  // Equipo de la pastelería
  const team = [
    {
      name: "María Rodríguez",
      role: "Fundadora & Chef Pastelera",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
      bio: "Con más de 15 años de experiencia en repostería de lujo, María fundó Dulce Pastelería para combinar técnicas tradicionales con innovación creativa."
    },
    {
      name: "Carlos Mendoza",
      role: "Chef Pastelero",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
      bio: "Especialista en chocolate y postres artísticos, Carlos aporta su experiencia internacional para crear sabores únicos y presentaciones impecables."
    },
    {
      name: "Laura Torres",
      role: "Diseñadora de Pasteles",
      image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&q=80",
      bio: "Con un ojo artístico excepcional, Laura transforma conceptos en creaciones visuales impresionantes para ocasiones especiales."
    },
    {
      name: "Javier Sánchez",
      role: "Gerente de Operaciones",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: "Javier asegura que cada pedido se entregue puntualmente y con la máxima calidad, manteniendo la eficiencia operativa de nuestro negocio."
    }
  ];

  // Valores de la empresa
  const values = [
    {
      icon: <Cake className="w-6 h-6" />,
      title: "Artesanía",
      description: "Elaboramos cada producto a mano con técnicas tradicionales y una atención meticulosa al detalle."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sostenibilidad",
      description: "Utilizamos ingredientes orgánicos y locales siempre que es posible, con empaques eco-amigables."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excelencia",
      description: "Nos comprometemos con los más altos estándares de calidad en cada creación que sale de nuestra cocina."
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Comunidad",
      description: "Apoyamos a productores locales y participamos activamente en iniciativas comunitarias."
    }
  ];

  // Historia de la empresa por años
  const timeline = [
    {
      year: 2015,
      title: "Nuestros inicios",
      description: "Dulce Pastelería comenzó como un pequeño local con una visión clara: crear los mejores pasteles artesanales de la ciudad."
    },
    {
      year: 2017,
      title: "Expansión",
      description: "Ampliamos nuestro menú para incluir una línea completa de productos de repostería fina y comenzamos a ofrecer servicios de catering."
    },
    {
      year: 2019,
      title: "Reconocimiento",
      description: "Fuimos galardonados como la 'Mejor Pastelería Artesanal' en los premios gastronómicos locales, consolidando nuestra reputación."
    },
    {
      year: 2022,
      title: "Innovación",
      description: "Lanzamos nuestra tienda online y un programa de suscripción para llevar nuestras creaciones a más hogares."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-[#FF90BC]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559622214-f4a29c302d44?w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Sobre Nosotros</h1>
          <p className="text-xl max-w-2xl mx-auto text-white">
            Conozca la historia, el equipo y la pasión detrás de nuestras dulces creaciones
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Nuestra Historia</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Dulce Pastelería nació en 2015 de la pasión por crear experiencias memorables a través de la repostería artesanal. Fundada por María Rodríguez, una chef pastelera con formación internacional, nuestra pastelería comenzó como un pequeño local con grandes ambiciones.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A lo largo de los años, hemos crecido manteniendo siempre nuestra esencia: el compromiso con la calidad, la innovación en sabores y el servicio personalizado. Cada postre que creamos lleva consigo horas de dedicación, ingredientes cuidadosamente seleccionados y el toque especial que nos caracteriza.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Hoy, Dulce Pastelería es reconocida no solo por sus exquisitos productos, sino también por crear momentos de felicidad en cada celebración de nuestros clientes. Desde un cumpleaños íntimo hasta una boda elegante, estamos presentes en los momentos más dulces de la vida.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {timeline.map((item, index) => (
                <div key={index} className="bg-pink-50 p-6 rounded-xl hover:shadow-md transition-all">
                  <div className="text-[#FF90BC] font-bold text-2xl mb-2">{item.year}</div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estos principios guían cada decisión que tomamos y cada postre que creamos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 text-center"
              >
                <div className="mx-auto bg-pink-100 text-[#FF90BC] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas apasionadas que hacen posible cada creación
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="aspect-square relative">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-[#FF90BC] text-sm mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por Qué Elegirnos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lo que nos distingue y nos hace especiales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-4">Calidad Inigualable</h3>
              <p className="text-gray-600 mb-4">
                Utilizamos solo los mejores ingredientes y técnicas artesanales para cada creación, garantizando un sabor excepcional y una presentación impecable.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Ingredientes premium</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Elaboración artesanal</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Control de calidad riguroso</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Personalización</h3>
              <p className="text-gray-600 mb-4">
                Entendemos que cada celebración es única. Trabajamos estrechamente con nuestros clientes para crear diseños personalizados que reflejen perfectamente la ocasión.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Diseños a medida</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Opciones para todas las dietas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Consulta personalizada</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Servicio Excepcional</h3>
              <p className="text-gray-600 mb-4">
                Desde el momento en que nos contactas hasta la entrega de tu pedido, nos dedicamos a proporcionar una experiencia sin complicaciones y completamente satisfactoria.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Atención personalizada</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Entregas puntuales</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">Seguimiento de pedidos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visítanos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visítanos</h2>
              <p className="text-gray-700 mb-8">
                Te invitamos a visitar nuestra pastelería para disfrutar de nuestras creaciones en un ambiente acogedor. También puedes pasar a recoger tus pedidos o solicitar entrega a domicilio.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#FF90BC] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Dirección</h3>
                    <p className="text-gray-600">Calle Dulzura 123, Colonia Centro, Ciudad de México</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-[#FF90BC] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Horario</h3>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sábados: 10:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Domingos: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-[#FF90BC] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Contacto</h3>
                    <p className="text-gray-600">Teléfono: (123) 456-7890</p>
                    <p className="text-gray-600">Email: info@dulcepasteleria.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-[#FF90BC] text-white rounded-lg hover:bg-[#FF70A6] transition-colors font-medium"
                >
                  Contactar
                </Link>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg h-[400px] relative">
              {/* Esta sería una imagen de mapa o de la pastelería */}
              <Image 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" 
                alt="Nuestra pastelería" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 