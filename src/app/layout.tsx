import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProviders from "@/_context/query_context";
import { Toaster } from "@/components/ui/toaster";
import AuthContextProvider from "@/_context/AuthContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

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
      <body className={roboto.className}>
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
