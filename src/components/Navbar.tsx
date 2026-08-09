"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, profile, loading, logout } = useAuth();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Hide/show navbar on scroll up/down (always stay visible if mobile menu is open)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            // Always visible when menu is open, scrolling UP, or near top (< 60px)
            const visible = mobileMenuOpen || prevScrollPos > currentScrollPos || currentScrollPos < 60;

            setPrevScrollPos(currentScrollPos);
            setIsVisible(visible);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, mobileMenuOpen]);

    // Close mobile menu when switching routes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    let dashboardLink = "/client/dashboard";
    if (profile) {
        if (profile.role === "admin") dashboardLink = "/admin/dashboard";
        else if (profile.role === "doctor") dashboardLink = "/doctor/dashboard";
    }

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/#services", isAnchor: true },
        { name: "About", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Join as a Doctor", href: "/doctor/register" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        if (href.startsWith("/#")) return false;
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Dark Mobile Backdrop Overlay when Menu is Open */}
            <div
                onClick={() => setMobileMenuOpen(false)}
                className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden="true"
            />

            <header
                className={`fixed top-10 sm:top-12 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[94%] max-w-7xl overflow-hidden rounded-[26px] sm:rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-900/5 transition-all duration-300 ease-out ${
                    isVisible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0 pointer-events-none"
                }`}
            >
                <div className="mx-auto flex h-15 sm:h-18 items-center justify-between px-4 sm:px-7">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
                        <div className="relative h-9 w-9 sm:h-11 sm:w-11 overflow-hidden rounded-xl bg-accent/60 border border-secondary/20 p-1 transition-transform duration-300 group-hover:scale-105 shadow-xs">
                            <Image
                                src="/logo111.png"
                                alt="Health Link Logo"
                                width={44}
                                height={44}
                                className="object-contain"
                                unoptimized
                            />
                        </div>
                        <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-primary transition-colors duration-300 group-hover:text-secondary">
                            Health Link
                        </span>
                    </Link>

                    {/* Center Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((link) => {
                            if (link.isAnchor) {
                                return (
                                    <button
                                        key={link.name}
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
                                        {link.name}
                                    </button>
                                );
                            }
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-xs sm:text-sm font-bold transition-colors tracking-wide relative py-1 ${
                                        active
                                            ? "text-secondary after:w-full"
                                            : "text-slate-700 hover:text-primary"
                                    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-secondary after:transition-all hover:after:w-full`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {loading ? (
                            <div className="h-5 w-5 animate-spin border-2 border-secondary border-t-transparent rounded-full" />
                        ) : user ? (
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Link
                                    href={dashboardLink}
                                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent border border-secondary/25 text-secondary hover:bg-secondary hover:text-white text-xs font-bold transition-all shadow-xs"
                                >
                                    Dashboard ➔
                                </Link>
                                <button
                                    onClick={() => logout()}
                                    className="hidden sm:inline-flex rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 px-3.5 py-1.5 text-xs font-bold transition-all border border-slate-200 cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <Link
                                    href="/signin"
                                    className="hidden sm:inline-flex px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-primary transition-colors"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="rounded-full bg-secondary hover:bg-secondary/90 text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 text-xs font-extrabold shadow-md shadow-secondary/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    Register <span className="hidden sm:inline">now</span> ↗
                                </Link>
                            </div>
                        )}

                        {/* Mobile Hamburger / Close Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden text-slate-700 hover:text-primary p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-slate-100 transition-all cursor-pointer"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            <svg
                                className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? "rotate-90 text-slate-900" : "rotate-0"}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Smooth CSS Accordion Drawer for Mobile Menu */}
                <div
                    className={`grid transition-all duration-300 ease-in-out lg:hidden overflow-hidden ${
                        mobileMenuOpen
                            ? "grid-rows-[1fr] opacity-100 border-t border-slate-200/80 pt-2 pb-4"
                            : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                >
                    <div className="min-h-0 flex flex-col gap-2 px-5">
                        <div className="flex flex-col gap-1 pb-3 border-b border-slate-100">
                            {navLinks.map((link) => {
                                if (link.isAnchor) {
                                    return (
                                        <button
                                            key={link.name}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                const el = document.getElementById("services");
                                                if (el) {
                                                    el.scrollIntoView({ behavior: "smooth" });
                                                } else {
                                                    window.location.href = "/#services";
                                                }
                                            }}
                                            className="text-left text-sm font-bold text-slate-700 hover:text-secondary hover:bg-slate-50 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
                                        >
                                            {link.name}
                                        </button>
                                    );
                                }
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`text-sm font-bold px-3.5 py-2.5 rounded-xl transition-all ${
                                            active
                                                ? "text-secondary bg-accent/60 font-extrabold"
                                                : "text-slate-700 hover:text-secondary hover:bg-slate-50"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Authentication Actions */}
                        <div className="pt-2 flex flex-col gap-2">
                            {user ? (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={dashboardLink}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full text-center py-2.5 rounded-xl bg-accent text-secondary font-bold text-sm border border-secondary/20 shadow-xs"
                                    >
                                        Go to Dashboard ➔
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            logout();
                                        }}
                                        className="w-full text-center py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm border border-rose-200 cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 pt-1">
                                    <Link
                                        href="/signin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex-1 text-center py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 hover:bg-slate-200 transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex-1 text-center py-2.5 rounded-xl bg-secondary text-white font-extrabold text-sm shadow-md shadow-secondary/20 hover:bg-secondary/90 transition-colors"
                                    >
                                        Register Now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
