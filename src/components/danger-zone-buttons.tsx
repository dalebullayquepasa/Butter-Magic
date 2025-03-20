"use client";

import { Button } from "@/components/ui/button";

export function DangerZoneButtons() {
  const handleDeleteAccount = () => {
    console.log("Eliminar cuenta");
    // Aquí iría la lógica para eliminar la cuenta
  };

  const handleDeleteData = () => {
    console.log("Eliminar datos");
    // Aquí iría la lógica para eliminar los datos
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button 
        variant="outline" 
        className="text-red-500 border-red-200 hover:bg-red-100"
        onClick={handleDeleteAccount}
      >
        Eliminar mi cuenta
      </Button>
      <Button 
        variant="outline" 
        className="text-red-500 border-red-200 hover:bg-red-100"
        onClick={handleDeleteData}
      >
        Eliminar mis datos
      </Button>
    </div>
  );
} 