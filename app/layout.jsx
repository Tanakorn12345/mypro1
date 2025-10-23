import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'flowbite';
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from './context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Login Page',
  description: 'Login to our website',
};

// แยก viewport เป็น export ของตัวเอง
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
       </AuthProvider>
      </body>
    </html>
  );
}
