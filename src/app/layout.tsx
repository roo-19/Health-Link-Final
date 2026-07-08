import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Link - Empowering Healing",
  description: "Connect with the best healthcare providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <div className="fixed top-0 w-full bg-yellow-500 text-black text-center py-2 z-[60] font-bold text-sm">
          🚧 HealthLink Preview – Under Construction 🚧
        </div>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

