import DashboardNavbar from "@/components/dashboard-navbar";
import ManageSubscription from "@/components/manage-subscription";
import { SubscriptionCheck } from "@/components/subscription-check";
import { InfoIcon, UserCircle, Clock, ShoppingBag, Heart, Calendar, Package, Cake, Star, AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import { manageSubscriptionAction } from "../actions";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Ejemplo de pedidos recientes (en una aplicación real, esto vendría de la base de datos)
  const recentOrders = [
    {
      id: "ORD-1234",
      date: "23/03/2023",
      total: 78.50,
      status: "Entregado",
      items: 3
    },
    {
      id: "ORD-1235",
      date: "15/03/2023",
      total: 45.90,
      status: "Entregado",
      items: 2
    }
  ];

  // Ejemplo de productos favoritos recientes
  const recentFavorites = [
    {
      id: "1",
      name: "Pastel de Chocolate",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      price: 35.99
    },
    {
      id: "3",
      name: "Galletas de Mantequilla",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      price: 12.50
    }
  ];

  return (
    <SubscriptionCheck requireSubscription={false}>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen pb-10">
        <div className="container mx-auto px-4 py-8">
          {/* Bienvenida y Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Hola, {user.email?.split('@')[0] || "Cliente"}</h1>
            <p className="text-gray-600">Bienvenido a tu panel personal de Dulce Pastelería</p>
          </div>

          {/* Tarjetas de Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <div className="p-3 rounded-full bg-pink-50 text-[#FF90BC] mr-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pedidos Totales</p>
                <h3 className="text-2xl font-bold">{recentOrders.length}</h3>
                <Link href="/dashboard/orders" className="text-xs text-[#FF90BC] hover:underline">
                  Ver historial de pedidos
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <div className="p-3 rounded-full bg-pink-50 text-[#FF90BC] mr-4">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Productos Favoritos</p>
                <h3 className="text-2xl font-bold">{recentFavorites.length}</h3>
                <Link href="/dashboard/favorites" className="text-xs text-[#FF90BC] hover:underline">
                  Ver todos mis favoritos
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start">
              <div className="p-3 rounded-full bg-pink-50 text-[#FF90BC] mr-4">
                <UserCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Mi Cuenta</p>
                <h3 className="text-2xl font-bold">Básica</h3>
                <Link href="/dashboard/profile" className="text-xs text-[#FF90BC] hover:underline">
                  Gestionar mi perfil
                </Link>
              </div>
            </div>
          </div>

          {/* Secciones Principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pedidos Recientes */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-semibold text-lg flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-[#FF90BC]" />
                  Pedidos Recientes
                </h2>
                <Link href="/dashboard/orders" className="text-sm text-[#FF90BC] hover:underline">
                  Ver todos
                </Link>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {order.date}
                        </div>
                        <div className="mt-1 flex items-center">
                          <span className="text-xs bg-green-100 text-green-700 py-0.5 px-2 rounded-full">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.items} productos</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Aún no tienes pedidos</p>
                    <Link href="/catalog" className="mt-2 inline-block text-sm text-[#FF90BC] hover:underline">
                      Explorar productos
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Favoritos Recientes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-semibold text-lg flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-[#FF90BC]" />
                  Favoritos
                </h2>
                <Link href="/dashboard/favorites" className="text-sm text-[#FF90BC] hover:underline">
                  Ver todos
                </Link>
              </div>
              
              <div className="divide-y divide-gray-100">
                {recentFavorites.length > 0 ? (
                  recentFavorites.map((product) => (
                    <div key={product.id} className="p-4 flex items-center">
                      <div className="h-14 w-14 relative rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-[#FF90BC] font-semibold">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <Heart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">No tienes favoritos</p>
                    <Link href="/catalog" className="mt-2 inline-block text-sm text-[#FF90BC] hover:underline">
                      Explorar productos
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
