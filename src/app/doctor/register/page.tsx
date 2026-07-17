"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountryList from "country-list-with-dial-code-and-flag";

export default function DoctorRegistration() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();

    const [agreed, setAgreed] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [countryCode, setCountryCode] = useState("+94");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const countries = React.useMemo(() => {
        const list = CountryList.getAll();
        const lk = list.find((c) => c.code === "LK");
        const rest = list.filter((c) => c.code !== "LK").sort((a, b) => a.name.localeCompare(b.name));
        return [lk, ...rest].filter((c): c is any => !!c);
    }, []);

    // If user is already logged in, redirect them
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

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (!agreed) {
            setError("Please agree to the Terms of Service and Practitioner Agreement.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Create doctor user credentials in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // 2. Create the Doctor's profile document in Firestore (with approved: false)
            await setDoc(doc(db, "users", firebaseUser.uid), {
                uid: firebaseUser.uid,
                fullName: fullName,
                email: email,
                role: "doctor",
                approved: false, // Set to false to trigger pending approval workflow
                specialization: specialization,
                licenseNumber: licenseNumber,
                phoneNumber: `${countryCode} ${phoneNumber}`,
                createdAt: serverTimestamp(),
            });

            // 3. Navigate to doctor dashboard (will show the pending screen)
            router.push("/doctor/dashboard");
        } catch (err: any) {
            console.error("Doctor registration error:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("This email address is already in use.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError(err.message || "Failed to submit registration. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
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

            <section className="relative pt-36 sm:pt-44 pb-16 lg:pb-0 flex-grow flex items-stretch">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                    <div className="bg-white rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row ring-1 ring-slate-200/50">
                        
                        {/* Left Side: Brand & Visuals */}
                        <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-full p-10 sm:p-14 flex flex-col justify-between overflow-hidden">
                            <div className="absolute inset-0 bg-slate-900 z-0">
                                <Image 
                                    src="/doctorscaring.jpg" 
                                    alt="Medical Care Partnership" 
                                    fill 
                                    className="object-cover opacity-50 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            </div>

                            <div className="relative z-10">
                                <Link href="/" className="inline-flex items-center text-sm font-semibold tracking-wide text-indigo-300 hover:text-indigo-200 mb-8 transition-colors">
                                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Home
                                </Link>
                                
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-6 font-serif">
                                    Join the <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-100">Medical Network</span>
                                </h1>
                                <p className="text-lg text-slate-300 font-light leading-relaxed">
                                    Register as an approved practitioner with Health Link. Reach patients across Sri Lanka, coordinate care, and manage consultations online.
                                </p>
                            </div>

                            <div className="relative z-10 mt-12">
                                <div className="glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-xl bg-slate-950/40">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold tracking-wide">SLMC Verification</h3>
                                            <p className="text-slate-400 text-sm">Required for practice validation</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold tracking-wide">Secure Consultations</h3>
                                            <p className="text-slate-400 text-sm">HIPAA-compliant channels</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="lg:w-3/5 p-8 sm:p-14 lg:p-20 bg-white">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Doctor Registration</h2>
                            <p className="text-slate-500 mb-10">Provide your credentials to register. Admin verification is required prior to dashboard access.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl">
                                        {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Full Name</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={fullName} 
                                            onChange={(e) => setFullName(e.target.value)} 
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
                                            placeholder="Dr. Sithika Perera" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Email Address</label>
                                        <input 
                                            type="email" 
                                            required 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
                                            placeholder="doctor@healthlink.lk" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Password</label>
                                        <input 
                                            type="password" 
                                            required 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
                                            placeholder="••••••••" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            required 
                                            value={confirmPassword} 
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
                                            placeholder="••••••••" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Specialization</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={specialization} 
                                            onChange={(e) => setSpecialization(e.target.value)} 
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
                                            placeholder="Cardiologist, Ayurvedic, etc." 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">SLMC Registration Number</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={licenseNumber} 
                                            onChange={(e) => setLicenseNumber(e.target.value)} 
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none" 
                                            placeholder="SLMC-XXXXX" 
                                        />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-semibold text-slate-900">Phone Number</label>
                                        <div className="flex rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                                            <select 
                                                value={countryCode} 
                                                onChange={(e) => setCountryCode(e.target.value)} 
                                                className="bg-transparent pl-4 pr-1 text-slate-800 font-semibold outline-none border-r border-slate-200 cursor-pointer text-sm shrink-0 max-w-[120px]"
                                            >
                                                {countries.map((c, idx) => (
                                                    <option key={`${c.code}-${c.dialCode}-${idx}`} value={c.dialCode}>
                                                        {c.flag} {c.dialCode} ({c.code})
                                                    </option>
                                                ))}
                                            </select>
                                            <input 
                                                type="tel" 
                                                required 
                                                value={phoneNumber} 
                                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                                className="w-full bg-transparent px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none border-none text-sm" 
                                                placeholder="77 123 4567" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Terms Section */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900">Practitioner Terms & Conditions</h3>
                                    
                                    <div className="h-44 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-sm text-slate-600 prose prose-sm prose-slate max-w-none shadow-inner">
                                        <h4 className="font-bold text-slate-900 text-base mb-2">Practitioner Registration & Credential Verification Agreement</h4>
                                        <p className="mb-4 text-xs">Last Updated: March 2026</p>
                                        <p className="font-semibold text-slate-900">1. Verification of Credentials</p>
                                        <p className="mb-4">By ticking this checkbox and submitting, you verify that you are a medical professional currently licensed and registered with the Sri Lanka Medical Council (SLMC). You represent that all credentials, license numbers, and specialization details provided are true, complete, and accurate.</p>
                                        <p className="font-semibold text-slate-900">2. Professional Standards & Ethics</p>
                                        <p className="mb-4">You agree to render consultations, diagnoses, and medical guidelines in a professional manner, adhering to the standard medical codes of conduct. You assume full civil and professional liability for any advice given on this platform.</p>
                                        <p className="font-semibold text-rose-600">3. Audit, Rejection, and Termination</p>
                                        <p className="mb-4 uppercase font-semibold text-rose-600">Health Link performs mandatory audits on SLMC numbers.</p>
                                        <p className="mb-4">If it is found that the SLMC number provided is fake, expired, or registered to another individual, Health Link reserves the right to immediately decline or delete the account, block future access, and file reports with relevant legal and medical governing bodies.</p>
                                        <p className="font-semibold text-slate-900">4. Administrative Access</p>
                                        <p className="mb-4">You acknowledge and agree that system administrators have read-only access to view your practitioner dashboard and clinical metrics for auditing and system maintenance purposes. Administrators cannot edit, write, or modify any medical records or prescribe on your behalf.</p>
                                    </div>

                                    <label className="flex items-start gap-3 mt-6 cursor-pointer group">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input 
                                                type="checkbox" 
                                                checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)}
                                                className="peer appearance-none w-5 h-5 rounded border-2 border-slate-300 checked:border-indigo-500 checked:bg-indigo-500 transition-colors cursor-pointer"
                                            />
                                            <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                                            I agree to the <span className="text-indigo-600">Practitioner Terms & Conditions</span> and verify my SLMC license.
                                        </span>
                                    </label>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full rounded-2xl bg-slate-900 py-4 px-8 text-lg font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-indigo-600 hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
                                    disabled={!agreed || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                            Submitting Registration...
                                        </>
                                    ) : "Register & Submit for Approval"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
