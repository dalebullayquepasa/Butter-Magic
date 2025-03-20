'use client'

import Link from 'next/link'
import { createClient } from '../utils/supabase'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { 
  UserCircle, 
  Home, 
  ShoppingBag, 
  Heart, 
  Settings, 
  CreditCard, 
  LogOut,
  Cake
} from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export default function DashboardNavbar() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const navItems = [
    { name: 'Resumen', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Mis Pedidos', href: '/dashboard/orders', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'Favoritos', href: '/dashboard/favorites', icon: <Heart className="h-5 w-5" /> },
    { name: 'Mi Perfil', href: '/dashboard/profile', icon: <UserCircle className="h-5 w-5" /> },
  ]

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-xl font-bold text-[#E2BA45] flex items-center">
            <Cake className="mr-2 h-6 w-6" />
            Butter & Magic
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/catalog" className="hidden md:block">
              <Button variant="outline" size="sm">
                Ver Catálogo
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-[#E2BA45] text-white font-medium' 
                    : 'text-gray-600 hover:bg-amber-50 hover:text-[#E2BA45]'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
