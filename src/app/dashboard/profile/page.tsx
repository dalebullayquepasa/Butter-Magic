import { SubscriptionCheck } from "@/components/subscription-check";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import DashboardNavbar from "@/components/dashboard-navbar";
import { User, MapPin, Lock, Bell, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ProfileForm } from "@/components/profile-form";
import { AddressActions } from "@/components/address-actions";
import { AddAddressButton } from "@/components/add-address-button";
import { DangerZoneButtons } from "@/components/danger-zone-buttons";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Datos del usuario de ejemplo (en una aplicación real, esto vendría de la base de datos)
  const userProfile = {
    id: user.id,
    email: user.email || "ejemplo@email.com",
    name: "Ana García",
    phone: "+34 612 345 678",
    addresses: [
      {
        id: "addr1",
        type: "Principal",
        street: "Calle Serrano 123",
        city: "Madrid",
        postalCode: "28006",
        country: "España",
        isDefault: true
      },
      {
        id: "addr2",
        type: "Trabajo",
        street: "Paseo de la Castellana 45, Oficina 302",
        city: "Madrid",
        postalCode: "28046",
        country: "España",
        isDefault: false
      }
    ],
    preferences: {
      newsletter: true,
      smsNotifications: false,
      orderUpdates: true,
      promotions: true
    }
  };

  return (
    <SubscriptionCheck requireSubscription={false}>
      <DashboardNavbar />
      <main className="bg-gray-50 min-h-screen pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <User className="mr-2 h-6 w-6 text-[#FF90BC]" />
                Mi Perfil
              </h1>
              <p className="text-gray-600">Gestiona tus datos personales y preferencias</p>
            </div>
            
            {/* User Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="flex items-center p-6 border-b border-gray-100">
                <div className="relative h-20 w-20 rounded-full overflow-hidden mr-5">
                  <Image 
                    src="https://randomuser.me/api/portraits/women/12.jpg" 
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                  <p className="text-gray-500">{userProfile.email}</p>
                  <p className="text-sm text-gray-400">Cliente desde Enero 2023</p>
                </div>
                <div className="ml-auto">
                  <Button 
                    variant="outline" 
                    className="text-sm border-[#FF90BC] text-[#FF90BC] hover:bg-pink-50"
                    asChild
                  >
                    <Link href="#">Cambiar foto</Link>
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <User className="mr-2 h-5 w-5 text-[#FF90BC]" />
                  Información Personal
                </h3>
                
                <ProfileForm initialData={userProfile} />
                
                <h3 className="text-lg font-semibold flex items-center mb-4 mt-8">
                  <Lock className="mr-2 h-5 w-5 text-[#FF90BC]" />
                  Seguridad
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center text-sm h-10"
                      asChild
                    >
                      <Link href="#">Cambiar contraseña</Link>
                    </Button>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center text-sm h-10"
                      asChild
                    >
                      <Link href="#">Configurar autenticación en dos pasos</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Addresses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-[#FF90BC]" />
                  Mis Direcciones
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {userProfile.addresses.map((address) => (
                  <div key={address.id} className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="font-medium">{address.type}</span>
                        {address.isDefault && (
                          <span className="ml-3 bg-green-100 text-green-700 text-xs py-0.5 px-2 rounded-full">
                            Predeterminada
                          </span>
                        )}
                      </div>
                      <AddressActions addressId={address.id} isDefault={address.isDefault} />
                    </div>
                    <p className="text-gray-800">{address.street}</p>
                    <p className="text-gray-600">
                      {address.postalCode}, {address.city}, {address.country}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50">
                <AddAddressButton />
              </div>
            </div>
            
            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold flex items-center text-red-500">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Zona de Peligro
                </h3>
              </div>
              
              <div className="p-6 bg-red-50">
                <p className="text-gray-700 mb-4">
                  Las siguientes acciones son irreversibles y pueden afectar a tu cuenta y datos.
                </p>
                <DangerZoneButtons />
              </div>
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
} 