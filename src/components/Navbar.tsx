"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, profile, loading, logout } = useAuth();

    let dashboardLink = "/patient/dashboard";
    if (profile) {
        if (profile.role === "admin") dashboardLink = "/admin/dashboard";
        else if (profile.role === "doctor") dashboardLink = "/doctor/dashboard";
    }

    return (
        <nav className="fixed top-14 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl rounded-full bg-white/90 backdrop-blur-xl shadow-md shadow-black/2 border border-[#002B9A]/10 transition-all duration-300">
            <div className="mx-auto flex h-20 items-center justify-between px-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative h-11 w-11 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Health Link Logo"
                            width={44}
                            height={44}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-primary transition-colors duration-300 group-hover:text-secondary">
                        Health Link
                    </span>
                </Link>

                {/* Center Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'About Us', path: '/about' },
                        { name: 'Community', path: '/community' },
                        { name: 'Contact Us', path: '/contact' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="relative text-sm font-semibold text-slate-600 hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {loading ? (
                        <div className="h-5 w-5 animate-spin border-2 border-slate-900 border-t-transparent rounded-full" />
                    ) : user ? (
                        <>
                            <Link 
                                href={dashboardLink} 
                                className="text-sm font-bold text-slate-800 hover:text-primary transition-colors"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="rounded-full bg-slate-950 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-rose-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                                Sign in
                            </Link>
                            <Link
                                href="/services/telemedicine/register"
                                className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-md shadow-secondary/10 hover:shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-all duration-300"
                            >
                                Register now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
