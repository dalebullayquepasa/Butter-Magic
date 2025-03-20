"use client";

import { Button } from "@/components/ui/button";

interface RepeatOrderButtonProps {
  orderId: string;
}

export default function RepeatOrderButton({ orderId }: RepeatOrderButtonProps) {
  const handleRepeatOrder = () => {
    console.log(`Repetir pedido ${orderId}`);
    // Aquí iría la lógica para repetir el pedido
  };

  return (
    <Button 
      variant="outline" 
      className="text-sm border-[#FF90BC] text-[#FF90BC] hover:bg-pink-50"
      onClick={handleRepeatOrder}
    >
      Repetir Pedido
    </Button>
  );
} 