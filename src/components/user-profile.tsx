"use client";
import { UserCircle, ShoppingBag, Heart, LogOut, Home } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { createClient } from "../utils/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    };
    
    fetchUserEmail();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  // Obtener iniciales del email para mostrar en el avatar
  const getInitials = (email: string) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 relative overflow-hidden">
          {userEmail ? (
            <div className="bg-[#E2BA45] text-white flex items-center justify-center rounded-full h-full w-full font-medium">
              {getInitials(userEmail)}
            </div>
          ) : (
            <UserCircle className="h-6 w-6" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center cursor-pointer w-full">
            <Home className="h-4 w-4 mr-2" />
            Panel Principal
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/orders" className="flex items-center cursor-pointer w-full">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Mis Pedidos
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/favorites" className="flex items-center cursor-pointer w-full">
            <Heart className="h-4 w-4 mr-2" />
            Favoritos
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile" className="flex items-center cursor-pointer w-full">
            <UserCircle className="h-4 w-4 mr-2" />
            Mi Perfil
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="text-red-500 flex items-center cursor-pointer" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
