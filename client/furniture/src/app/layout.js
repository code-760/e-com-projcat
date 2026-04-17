import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./comen/Header";
import Footer from "./comen/footer";
import ProviderLayout from "@/ProviderLayout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// 1. Font initialize zaroor karein (Ye shayad delete ho gaya tha)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MONSTA | Premium Furniture Store",
  description: "Shop premium furniture for your home and office at MONSTA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        {/* 2. Razorpay Script yahan rahegi */}
        

        <ProviderLayout>
          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
          <ToastContainer 
            position="bottom-right"
            theme="dark"
          />
        </ProviderLayout>
      </body>
    </html>
  );
}