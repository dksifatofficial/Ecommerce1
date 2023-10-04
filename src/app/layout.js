"use client";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import GlobalState from "@/context";
import { Inter } from "next/font/google";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./globals.css";
// import { NextAuthProviders } from './Providers'
// import "slick-carousel/slick/slick.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`w-full ${inter.className}`}>
        {/* <NextAuthProviders> */}
        <HelmetProvider>
          <GlobalState>
            <main className="flex flex-col mt-[64px] w-full">
              <Helmet>
                <title>Online Shopping in Bangladesh: Order Now from</title>
                <meta
                  name="description"
                  content="Most common methods for designing websites that work well on desktop is responsive and adaptive design"
                />
              </Helmet>
              <Navbar />
              {children}
              <Footer />
            </main>
          </GlobalState>
        </HelmetProvider>
        {/* </NextAuthProviders> */}
      </body>
    </html>
  );
}
