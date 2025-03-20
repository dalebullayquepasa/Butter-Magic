"use client";

import { Button } from "@/components/ui/button";

interface AddressActionsProps {
  addressId: string;
  isDefault: boolean;
}

export function AddressActions({ addressId, isDefault }: AddressActionsProps) {
  const handleEdit = () => {
    console.log(`Editar dirección ${addressId}`);
    // Aquí iría la lógica para editar la dirección
  };

  const handleDelete = () => {
    console.log(`Eliminar dirección ${addressId}`);
    // Aquí iría la lógica para eliminar la dirección
  };

  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        className="text-xs h-8"
        onClick={handleEdit}
      >
        Editar
      </Button>
      {!isDefault && (
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs text-red-500 h-8 hover:bg-red-50 hover:text-red-600"
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      )}
    </div>
  );
} 