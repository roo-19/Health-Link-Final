"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, profile, loading, logout } = useAuth();
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            // Visible when scrolling UP or near top (threshold 60px)
            const visible = prevScrollPos > currentScrollPos || currentScrollPos < 60;

            setPrevScrollPos(currentScrollPos);
            setIsVisible(visible);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    let dashboardLink = "/client/dashboard";
    if (profile) {
        if (profile.role === "admin") dashboardLink = "/admin/dashboard";
        else if (profile.role === "doctor") dashboardLink = "/doctor/dashboard";
    }

    return (
        <header
            className={`fixed top-12 sm:top-14 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/70 shadow-md transition-all duration-300 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0 pointer-events-none"
            }`}
        >
            <div className="mx-auto flex h-16 sm:h-18 items-center justify-between px-6 sm:px-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl bg-accent/50 border border-secondary/15 p-1 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/logo111.png"
                            alt="Health Link Logo"
                            width={44}
                            height={44}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary transition-colors duration-300 group-hover:text-secondary">
                        Health Link
                    </span>
                </Link>

                {/* Center Navigation Links */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-xs sm:text-sm font-bold text-slate-700 hover:text-primary transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
                    >
                        Home
                    </Link>
                    <button
                        onClick={() => {
                            const el = document.getElementById("services");
                            if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                            } else {
                                window.location.href = "/#services";
                            }
                        }}
                        className="text-xs sm:text-sm font-bold text-slate-700 hover:text-primary transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full cursor-pointer"
                    >
                        Services
                    </button>
                    <Link
                        href="/about"
                        className="text-xs sm:text-sm font-bold text-slate-700 hover:text-primary transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-xs sm:text-sm font-bold text-slate-700 hover:text-primary transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
                    >
                        Contact Us
                    </Link>
                    <Link
                        href="/doctor/register"
                        className="text-xs sm:text-sm font-bold text-slate-700 hover:text-primary transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full"
                    >
                        Join as a Doctor
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {loading ? (
                        <div className="h-5 w-5 animate-spin border-2 border-secondary border-t-transparent rounded-full" />
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <Link 
                                href={dashboardLink} 
                                className="px-4 py-2 rounded-full bg-accent border border-secondary/20 text-secondary hover:bg-secondary hover:text-white text-xs font-bold transition-all shadow-sm"
                            >
                                Dashboard ➔
                            </Link>
                            <button
                                onClick={() => logout()}
                                className="rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 px-4 py-2 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link 
                                href="/signin" 
                                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 text-xs font-extrabold shadow-md shadow-secondary/20 transition-all hover:scale-105"
                            >
                                Register now ↗
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-slate-700 hover:text-primary p-2"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white/98 border-t border-slate-200 rounded-b-3xl px-6 py-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 shadow-xl">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-bold text-slate-700 hover:text-primary py-1.5"
                    >
                        Home
                    </Link>
                    <button
                        onClick={() => {
                            setMobileMenuOpen(false);
                            const el = document.getElementById("services");
                            if (el) {
                                el.scrollIntoView({ behavior: "smooth" });
                            } else {
                                window.location.href = "/#services";
                            }
                        }}
                        className="text-sm font-bold text-slate-700 hover:text-primary py-1.5 text-left cursor-pointer"
                    >
                        Services
                    </button>
                    <Link
                        href="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-bold text-slate-700 hover:text-primary py-1.5"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-bold text-slate-700 hover:text-primary py-1.5"
                    >
                        Contact Us
                    </Link>
                    <Link
                        href="/doctor/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-bold text-slate-700 hover:text-primary py-1.5"
                    >
                        Join as a Doctor
                    </Link>
                </div>
            )}
        </header>
    );
}
