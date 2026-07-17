"use client";

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");
    const [isResetting, setIsResetting] = useState(false);

    const router = useRouter();
    const { user, profile, loading } = useAuth();

    // If user is already logged in, redirect them to their appropriate dashboard
    useEffect(() => {
        if (!loading && user && profile) {
            if (profile.role === "admin") {
                router.push("/admin/dashboard");
            } else if (profile.role === "doctor") {
                router.push("/doctor/dashboard");
            } else {
                router.push("/client/dashboard");
            }
        }
    }, [user, profile, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Fetch profile to verify role and navigate
            const userDocSnap = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.role === "admin") {
                    router.push("/admin/dashboard");
                } else if (userData.role === "doctor") {
                    router.push("/doctor/dashboard");
                } else {
                    router.push("/client/dashboard");
                }
            } else {
                setError("User profile document not found. Please contact support.");
            }
        } catch (err: any) {
            console.error("Sign in error:", err);
            if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
                setError("Invalid email or password.");
            } else {
                setError(err.message || "An error occurred during sign in.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setResetSuccess("");
        setIsResetting(true);

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setResetSuccess("A password reset link has been sent to your email address.");
            setResetEmail("");
        } catch (err: any) {
            console.error("Password reset error:", err);
            if (err.code === "auth/user-not-found") {
                setError("No user found with this email address.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError(err.message || "Failed to send password reset email.");
            }
        } finally {
            setIsResetting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-slate-900 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <section className="relative pt-40 sm:pt-48 pb-16 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Visual Background Elements */}
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 ring-1 ring-slate-200/50 relative z-10">
                    <div className="text-center mb-8">
                        <div className="relative h-14 w-14 mx-auto mb-4 overflow-hidden rounded-2xl">
                            <Image
                                src="/logo.png"
                                alt="Health Link Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                            {isForgotPassword ? "Reset Password" : "Welcome Back"}
                        </h1>
                        <p className="text-slate-500 mt-2">
                            {isForgotPassword 
                                ? "Enter your email to receive a password reset link" 
                                : "Sign in to your Health Link portal"}
                        </p>
                    </div>

                    {resetSuccess && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-2xl flex items-center gap-3">
                            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{resetSuccess}</span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl flex items-center gap-3">
                            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {isForgotPassword ? (
                        <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-900">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isResetting}
                                className="w-full rounded-2xl bg-slate-900 py-4 px-8 text-lg font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-sky-600 hover:shadow-sky-600/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {isResetting ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                        Sending Link...
                                    </>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsForgotPassword(false);
                                    setError("");
                                    setResetSuccess("");
                                }}
                                className="w-full text-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mt-4 block cursor-pointer"
                            >
                                Back to Sign In
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-900">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-slate-900">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsForgotPassword(true);
                                            setError("");
                                            setResetSuccess("");
                                        }}
                                        className="text-xs font-bold text-sky-600 hover:underline cursor-pointer"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-2xl bg-slate-900 py-4 px-8 text-lg font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-sky-600 hover:shadow-sky-600/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-sky-600 font-bold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
