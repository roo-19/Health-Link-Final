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

const bannerItems = Array(6).fill("Your Trusted Wellness Partner");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {/* Top Fixed Seamless Scrolling Banner */}
        <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 text-emerald-100 py-2 z-[60] font-bold text-xs shadow-md overflow-hidden whitespace-nowrap border-b border-emerald-700/50">
          <style>{`
            @keyframes marquee-loop {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-seamless-marquee {
              display: flex;
              width: max-content;
              flex-wrap: nowrap;
              animation: marquee-loop 25s linear infinite;
            }
            .animate-seamless-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="animate-seamless-marquee flex items-center">
            {/* Primary Track Set */}
            <div className="flex items-center gap-8 shrink-0 pr-8">
              {bannerItems.map((text, i) => (
                <div key={`set1-${i}`} className="flex items-center gap-8 shrink-0">
                  <span className="inline-flex items-center gap-2 text-white font-medium">
                    <svg className="w-4 h-4 text-emerald-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {text}
                  </span>
                  <span className="text-emerald-400/40">✦</span>
                </div>
              ))}
            </div>

            {/* Identical Duplicate Track Set for Seamless Looping */}
            <div className="flex items-center gap-8 shrink-0 pr-8">
              {bannerItems.map((text, i) => (
                <div key={`set2-${i}`} className="flex items-center gap-8 shrink-0">
                  <span className="inline-flex items-center gap-2 text-white font-medium">
                    <svg className="w-4 h-4 text-emerald-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {text}
                  </span>
                  <span className="text-emerald-400/40">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AuthProvider>
          <div className="animate-page-fade-in min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}