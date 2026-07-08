"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TelemedicineRegistration() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();

    const [agreed, setAgreed] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [consultationReason, setConsultationReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName || "");
            setEmail(profile.email || "");
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!user || !profile) {
            setError("You must be logged in to submit an inquiry.");
            return;
        }

        if (!agreed) {
            alert("Please agree to the Terms of Service & Informed Consent to proceed.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Create a reference for the new inquiry document to get an ID
            const inquiryColRef = collection(db, "inquiries");
            const newInquiryDocRef = doc(inquiryColRef);
            const inquiryId = newInquiryDocRef.id;

            // 2. Write Inquiry to Firestore
            await setDoc(newInquiryDocRef, {
                id: inquiryId,
                clientId: user.uid,
                clientName: fullName,
                clientEmail: email,
                phoneNumber: phoneNumber,
                dateOfBirth: dob,
                subject: "Telemedicine Consultation",
                message: consultationReason,
                status: "pending",
                doctorId: null,
                doctorName: null,
                documents: [],
                createdAt: serverTimestamp(),
                assignedAt: null,
                answeredAt: null,
            });

            // 4. Redirect to Client Dashboard
            router.push("/client/dashboard");
        } catch (err: any) {
            console.error("Error submitting inquiry:", err);
            setError(err.message || "Failed to submit inquiry. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <section className="relative pt-24 sm:pt-32 pb-16 lg:pb-0 flex-grow flex items-stretch">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                    <div className="bg-white rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row ring-1 ring-slate-200/50">
                        
                        {/* Left Side: Brand & Visuals */}
                        <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-full p-10 sm:p-14 flex flex-col justify-between overflow-hidden">
                            <div className="absolute inset-0 bg-slate-900 z-0">
                                <Image 
                                    src="/telemedicinehero.png" 
                                    alt="Telemedicine Care" 
                                    fill 
                                    className="object-cover opacity-60 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                                <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            </div>

                            <div className="relative z-10">
                                <Link href="/" className="inline-flex items-center text-sm font-semibold tracking-wide text-sky-300 hover:text-sky-200 mb-8 transition-colors">
                                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                                
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-6">
                                    Begin Your <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-100">Care Journey</span>
                                </h1>
                                <p className="text-lg text-slate-300 font-light leading-relaxed">
                                    Register now for 24/7 on-demand telemedical consulting. Instant access to western medicine, referrals, and precise care.
                                </p>
                            </div>

                            <div className="relative z-10 mt-12">
                                <div className="glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold tracking-wide">100% Confidential</h3>
                                            <p className="text-slate-400 text-sm">HIPAA-compliant portal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold tracking-wide">Licensed Professionals</h3>
                                            <p className="text-slate-400 text-sm">Top-tier medical network</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="lg:w-3/5 p-8 sm:p-14 lg:p-20 bg-white">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Client Registration</h2>
                            <p className="text-slate-500 mb-10">Please fill out your details to schedule your consultation.</p>

                            {loading ? (
                                <div className="py-12 flex items-center justify-center">
                                    <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
                                </div>
                            ) : !user ? (
                                <div className="border border-slate-200 bg-slate-50 rounded-3xl p-8 text-center">
                                    <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Authentication Required</h3>
                                    <p className="text-slate-600 mb-6 font-light">Please sign in or create an account to submit inquiries and connect with doctors.</p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link href="/signin" className="px-6 py-3 bg-slate-900 hover:bg-sky-600 text-white rounded-2xl font-bold transition-all shadow-md">
                                            Sign In
                                        </Link>
                                        <Link href="/signup" className="px-6 py-3 border border-slate-350 hover:bg-slate-50 text-slate-900 rounded-2xl font-bold transition-all">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {error && (
                                        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl">
                                            {error}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900">Full Name</label>
                                            <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900">Email Address</label>
                                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900">Phone Number</label>
                                            <input type="tel" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" placeholder="+1 (555) 000-0000" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900">Date of Birth</label>
                                            <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Reason for Consultation & Inquiry details</label>
                                        <textarea required rows={3} value={consultationReason} onChange={(e) => setConsultationReason(e.target.value)} className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none resize-none" placeholder="Briefly describe your symptoms or request..."></textarea>
                                    </div>

                                    {/* Document upload removed */}

                                    {/* Agreement Section */}
                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <h3 className="text-lg font-bold text-slate-900">Terms of Service & Informed Consent</h3>
                                        <p className="text-sm text-slate-500">Please scroll and read the complete agreement below before proceeding.</p>
                                        
                                        <div className="h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-sm text-slate-600 prose prose-sm prose-slate max-w-none shadow-inner">
                                            <h4 className="font-bold text-slate-900 text-base mb-2">Terms of Service & Informed Consent for Health Link Pvt Ltd</h4>
                                            <p className="mb-4 text-xs">Last Updated: March 2026</p>
                                            <p className="font-semibold text-slate-900">1. Acceptance of Terms</p>
                                            <p className="mb-4">By accessing or using the services, website, and mobile application (collectively, the &quot;Services&quot;) provided by Health Link Pvt Ltd (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
                                            <p className="font-semibold text-slate-900">2. Services Description</p>
                                            <p className="mb-4">Our Services provide a platform that connects users with: a) Licensed Medical Professionals who provide diagnosis, treatment, and consultation via telemedicine. b) Holistic Wellness Practitioners who provide education and wellness planning.</p>
                                            <p className="font-semibold text-rose-600">3. Not for Emergencies</p>
                                            <p className="mb-4 uppercase font-semibold text-rose-600">The Services are not for medical emergencies.</p>
                                            <p className="mb-4">If you believe you are experiencing a medical emergency, you must call 911 (or local emergency numbers) immediately.</p>
                                        </div>

                                        <label className="flex items-start gap-3 mt-6 cursor-pointer group">
                                            <div className="relative flex items-center justify-center mt-0.5">
                                                <input 
                                                    type="checkbox" 
                                                    checked={agreed}
                                                    onChange={(e) => setAgreed(e.target.checked)}
                                                    className="peer appearance-none w-5 h-5 rounded border-2 border-slate-300 checked:border-sky-500 checked:bg-sky-500 transition-colors cursor-pointer"
                                                />
                                                <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                                                I have read, understood, and agree to the <span className="text-sky-600">Terms of Service and Informed Consent</span>.
                                            </span>
                                        </label>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full rounded-2xl bg-slate-900 py-4 px-8 text-lg font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-sky-600 hover:shadow-sky-600/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
                                        disabled={!agreed || isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                                Submitting Intake...
                                            </>
                                        ) : "Complete Registration & Submit Inquiry"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
