"use client";

import { Button } from "@/components/ui/button";

export function AddAddressButton() {
  const handleAddAddress = () => {
    console.log("Añadir nueva dirección");
    // Aquí iría la lógica para añadir una nueva dirección
  };

  return (
    <Button 
      className="bg-[#FF90BC] hover:bg-[#FF70A6]"
      onClick={handleAddAddress}
    >
      Añadir Nueva Dirección
    </Button>
  );
} 