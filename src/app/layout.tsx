import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProviders from "@/_context/query_context";
import { Toaster } from "@/components/ui/toaster";
import AuthContextProvider from "@/_context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VecSys | HIMATIKA Vektor Event Platform",
  description: "HIMATIKA Vektor Event Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProviders>
          <AuthContextProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </AuthContextProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
