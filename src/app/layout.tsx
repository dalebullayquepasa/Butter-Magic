import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/cart-context";
import { FavoritesProvider } from "@/context/favorites-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Butter & Magic - Dulces Creaciones",
  description: "Descubre nuestras exquisitas creaciones de repostería artesanal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
        <TempoInit />
      </body>
    </html>
  );
}
