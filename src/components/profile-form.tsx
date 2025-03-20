"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  preferences: {
    newsletter: boolean;
    smsNotifications: boolean;
    orderUpdates: boolean;
    promotions: boolean;
  };
}

interface ProfileFormProps {
  initialData: UserProfileData;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfileData>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [name]: checked,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardando cambios:", formData);
    // Aquí iría la lógica para guardar los cambios
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">Nombre completo</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF90BC] focus:border-transparent"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">Correo electrónico</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF90BC] focus:border-transparent"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 block mb-2">Teléfono</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF90BC] focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="newsletter" 
            name="newsletter"
            checked={formData.preferences.newsletter}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-[#FF90BC] focus:ring-[#FF90BC]"
          />
          <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
            Recibir newsletter con novedades y recetas
          </label>
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="sms" 
            name="smsNotifications"
            checked={formData.preferences.smsNotifications}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-[#FF90BC] focus:ring-[#FF90BC]"
          />
          <label htmlFor="sms" className="ml-2 text-sm text-gray-700">
            Recibir notificaciones por SMS
          </label>
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="orderUpdates" 
            name="orderUpdates"
            checked={formData.preferences.orderUpdates}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-[#FF90BC] focus:ring-[#FF90BC]"
          />
          <label htmlFor="orderUpdates" className="ml-2 text-sm text-gray-700">
            Actualizaciones sobre mis pedidos
          </label>
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="promotions" 
            name="promotions"
            checked={formData.preferences.promotions}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-[#FF90BC] focus:ring-[#FF90BC]"
          />
          <label htmlFor="promotions" className="ml-2 text-sm text-gray-700">
            Ofertas y promociones especiales
          </label>
        </div>
      </div>
      
      <div className="flex justify-end border-t border-gray-100 pt-6">
        <Button type="submit" className="bg-[#FF90BC] hover:bg-[#FF70A6] flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
} 