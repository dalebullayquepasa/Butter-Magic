import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { 
  ShoppingBag, 
  Calendar, 
  Filter, 
  Search, 
  Check, 
  Package, 
  Clock, 
  Truck, 
  X, 
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import RepeatOrderButton from "@/components/repeat-order-button";

export default async function OrdersPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Ejemplo de pedidos completos (en una aplicación real, esto vendría de la base de datos)
  const orders = [
    {
      id: "ORD-1234",
      date: "23/03/2023",
      total: 78.50,
      status: "Entregado",
      items: [
        {
          id: "1",
          name: "Pastel de Chocolate",
          quantity: 1,
          price: 35.99,
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
        },
        {
          id: "3",
          name: "Galletas de Mantequilla",
          quantity: 2,
          price: 12.50,
          image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80"
        },
        {
          id: "6",
          name: "Croissant",
          quantity: 3,
          price: 5.99,
          image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80"
        }
      ]
    },
    {
      id: "ORD-1235",
      date: "15/03/2023",
      total: 45.90,
      status: "Entregado",
      items: [
        {
          id: "2",
          name: "Cupcakes (6 unidades)",
          quantity: 1,
          price: 18.99,
          image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80"
        },
        {
          id: "5",
          name: "Tarta de Frutas",
          quantity: 1,
          price: 26.90,
          image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&q=80"
        }
      ]
    }
  ];

  // Función para obtener el icono del estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregado":
        return <Check className="h-4 w-4 text-green-500" />;
      case "En camino":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "Procesando":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "Cancelado":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <SubscriptionCheck requireSubscription={false}>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen pb-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <ShoppingBag className="mr-2 h-6 w-6 text-[#FF90BC]" />
                Mis Pedidos
              </h1>
              <p className="text-gray-600">Historial completo de tus compras</p>
            </div>
            
            {/* Filtros y Búsqueda */}
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar pedido..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#FF90BC] focus:border-transparent"
                />
              </div>
              
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4 mr-1" />
                Filtrar
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Lista de Pedidos */}
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Cabecera del pedido */}
                  <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <span className="ml-3 flex items-center gap-1 text-xs bg-green-100 text-green-700 py-1 px-2 rounded-full">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        Pedido el {order.date}
                      </p>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <p className="text-xl font-semibold text-[#FF90BC]">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 text-right">{order.items.length} productos</p>
                    </div>
                  </div>
                  
                  {/* Productos del pedido */}
                  <div className="divide-y divide-gray-100">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-4 flex items-center">
                        <div className="h-16 w-16 relative rounded-md overflow-hidden mr-4 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pie del pedido */}
                  <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <Link 
                      href={`/dashboard/orders/${order.id}`} 
                      className="text-sm text-[#FF90BC] hover:underline"
                    >
                      Ver detalles completos
                    </Link>
                    <RepeatOrderButton orderId={order.id} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aún no tienes pedidos</h3>
              <p className="text-gray-500 mb-6">Cuando realices tu primer pedido, aparecerá aquí.</p>
              <Link href="/catalog">
                <Button className="bg-[#FF90BC] hover:bg-[#FF70A6]">
                  Explorar Productos
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </SubscriptionCheck>
  );
} 