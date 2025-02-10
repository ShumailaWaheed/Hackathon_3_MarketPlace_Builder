import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopHeader from "@/components/Header/TopBar";
import MainHeader from "@/components/Header/MainHeader";
import Navbar from "@/components/Header/Navbar";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishListContext";
import Footer from "@/components/Footer/footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Comforty",
  description: "Explore our premium furniture collection.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <CartProvider>
            <WishlistProvider>
              <TopHeader />
              <MainHeader />
              <Navbar />
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

