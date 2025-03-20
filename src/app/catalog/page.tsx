"use client";

import { useState, useEffect } from "react";
import ClientNavbar from "@/components/client-navbar";
import Footer from "@/components/footer";
import ProductCard, { ProductProps } from "@/components/product-card";
import ProductFilter, { FilterOptions } from "@/components/product-filter";
import CartDrawer from "@/components/cart-drawer";
import ProductDetailModal from "@/components/product-detail-modal";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Filter as FilterIcon } from "lucide-react";
import { useCart } from "@/context/cart-context";

// Sample product data - in a real app, this would come from an API
const SAMPLE_PRODUCTS: ProductProps[] = [
  {
    id: "1",
    name: "Pastel de Chocolate",
    description: "Delicioso pastel de chocolate con ganache y fresas frescas",
    price: 35.99,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    category: "Pasteles",
    tags: ["chocolate", "bestseller"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "2",
    name: "Cupcakes de Vainilla",
    description: "Pack de 6 cupcakes de vainilla con frosting de colores",
    price: 18.5,
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
    category: "Cupcakes",
    tags: ["vainilla", "kids"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "3",
    name: "Macarons Surtidos",
    description: "Caja de 12 macarons en sabores variados",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80",
    category: "Macarons",
    tags: ["colorful", "gift"],
    isGlutenFree: true,
    isVegan: false,
  },
  {
    id: "4",
    name: "Tarta de Fresas",
    description: "Tarta fresca con crema pastelera y fresas de temporada",
    price: 28.75,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    category: "Tartas",
    tags: ["fruit", "seasonal"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "5",
    name: "Donas Glaseadas",
    description: "Pack de 6 donas con diferentes glaseados y toppings",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    category: "Donas",
    tags: ["colorful", "kids"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "6",
    name: "Galletas de Chocolate",
    description: "Docena de galletas con trozos de chocolate belga",
    price: 12.5,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    category: "Galletas",
    tags: ["chocolate", "classic"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "7",
    name: "Cheesecake de Frambuesa",
    description: "Cremoso cheesecake con coulis de frambuesa",
    price: 32.99,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    category: "Pasteles",
    tags: ["fruit", "creamy"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "8",
    name: "Croissants de Mantequilla",
    description: "Pack de 4 croissants artesanales de mantequilla",
    price: 14.75,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
    category: "Bollería",
    tags: ["breakfast", "classic"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "9",
    name: "Brownie Vegano",
    description: "Brownie de chocolate intenso sin productos animales",
    price: 16.5,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    category: "Brownies",
    tags: ["chocolate", "vegan"],
    isGlutenFree: false,
    isVegan: true,
  },
  {
    id: "10",
    name: "Muffins Sin Gluten",
    description: "Pack de 4 muffins de arándanos sin gluten",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80",
    category: "Muffins",
    tags: ["fruit", "gluten-free"],
    isGlutenFree: true,
    isVegan: false,
  },
  {
    id: "11",
    name: "Éclair de Café",
    description: "Éclair relleno de crema de café y chocolate",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1530016555861-3d1f3f5ca94b?w=800&q=80",
    category: "Éclairs",
    tags: ["coffee", "chocolate"],
    isGlutenFree: false,
    isVegan: false,
  },
  {
    id: "12",
    name: "Tarta de Limón",
    description: "Tarta de limón con merengue italiano",
    price: 26.5,
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=800&q=80",
    category: "Tartas",
    tags: ["citrus", "tangy"],
    isGlutenFree: false,
    isVegan: false,
  },
];

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductProps[]>(SAMPLE_PRODUCTS);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductProps[]>(SAMPLE_PRODUCTS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  // Usar el contexto del carrito
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    updateCartItemQuantity,
    removeCartItem,
    totalItems
  } = useCart();

  // Extract all unique categories
  const uniqueCategories: string[] = [];
  SAMPLE_PRODUCTS.forEach((product) => {
    if (!uniqueCategories.includes(product.category)) {
      uniqueCategories.push(product.category);
    }
  });
  const allCategories = uniqueCategories;

  // Find max price for the price range filter
  const maxPrice = Math.max(...SAMPLE_PRODUCTS.map((product) => product.price));

  // Apply filters
  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    );

    // Filter by dietary restrictions
    if (filters.isGlutenFree) {
      filtered = filtered.filter((product) => product.isGlutenFree);
    }

    if (filters.isVegan) {
      filtered = filtered.filter((product) => product.isVegan);
    }

    setFilteredProducts(filtered);
  };

  // Función para redirigir al checkout
  const handleCheckout = () => {
    alert("Redirigiendo al proceso de pago...");
  };

  // View product details
  const viewProductDetails = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  // Add to cart with quantity from product detail
  const addToCartWithQuantity = (product: ProductProps, quantity: number) => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />

      {/* Hero Banner */}
      <div className="relative bg-[#E2BA45] text-white py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros Dulces Creaciones
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Descubre nuestra selección de pasteles y dulces artesanales
            elaborados con los mejores ingredientes
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtros
            {filteredProducts.length !== products.length && (
              <span className="ml-2 bg-[#E2BA45] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                !
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Mobile Collapsible, Desktop Sidebar */}
          <div
            className={`md:w-64 ${isMobileFilterOpen ? "block" : "hidden md:block"}`}
          >
            <ProductFilter
              allCategories={allCategories}
              maxPrice={maxPrice}
              onFilterChange={handleFilterChange}
              isMobile={true}
              className="sticky top-4"
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 mb-4">Intenta con otros filtros</p>
                <Button
                  onClick={() =>
                    handleFilterChange({
                      categories: [],
                      priceRange: [0, maxPrice],
                      isGlutenFree: false,
                      isVegan: false,
                    })
                  }
                  className="bg-[#E2BA45] hover:bg-[#C6A136]"
                >
                  Ver todos los productos
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={viewProductDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsCartOpen(true)}
          className="h-14 w-14 rounded-full bg-[#E2BA45] hover:bg-[#C6A136] shadow-lg flex items-center justify-center relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#E2BA45] rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeCartItem}
        onCheckout={handleCheckout}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={() => {
          setIsProductDetailOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={addToCartWithQuantity}
      />

      <Footer />
    </div>
  );
}
