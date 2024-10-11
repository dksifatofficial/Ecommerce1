"use client";

import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import GlobalState from "@/context";
import { Inter } from "next/font/google";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`max-w-[100vw] overflow-x-hidden bg-slate-100 ${inter.className}`}>
        <HelmetProvider>
          <GlobalState>
            <main className="flex flex-col pt-[64px] pb-[55px] lg:pb-0 w-full bg-slate-100">
              <Helmet>
                <title>Online Shopping in Bangladesh: Order Now from</title>
                <meta
                  name="description"
                  content="Most common methods for designing websites that work well on desktop is responsive and adaptive design"
                />
              </Helmet>
              <Navbar />
              {children}
              <BottomNavBar />
              <Footer />
            </main>
          </GlobalState>
        </HelmetProvider>
      </body>
    </html>
  );
}
