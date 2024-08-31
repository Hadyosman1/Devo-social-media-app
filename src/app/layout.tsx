import type { Metadata } from "next";
import { Inter } from "next/font/google";

// libraries
import { ToastContainer } from "react-toastify";

//styles
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

//components
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Next ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto flex min-h-svh flex-col">
          <Header />
          <ToastContainer />
          <main className="grid flex-grow bg-slate-100">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
