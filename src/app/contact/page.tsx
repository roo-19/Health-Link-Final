"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/contactbanner.png"
                        alt="Contact Us Hero"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-300 mb-8 backdrop-blur-sm self-center">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        We&apos;re here to help
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mx-auto max-w-4xl mb-6 leading-tight">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Touch</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg sm:text-xl leading-8 text-slate-300 font-light">
                        Have questions about our services or need support? Reach out to our compassionate team today.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 sm:py-32 relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        
                        {/* Left Side: Contact Info & WhatsApp */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contact Information</h2>
                                <p className="mt-4 text-lg leading-relaxed text-slate-600 font-light">
                                    Choose the most convenient way to reach us. Our team is available to assist you with any inquiries.
                                </p>
                            </div>

                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                                {/* WhatsApp Option - Highlighted */}
                                <Link 
                                    href="https://wa.me/94762515494"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-6 p-6 rounded-3xl bg-emerald-50 border border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-200/40 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.031 2.016c-5.509 0-9.984 4.475-9.984 9.985 0 1.758.455 3.473 1.32 4.99L2 22l5.12-1.343a9.92 9.92 0 004.911 1.297h.003c5.508 0 9.983-4.475 9.983-9.986s-4.475-9.953-9.983-9.953zm5.49 14.331c-.244.686-1.41 1.343-1.956 1.408-.519.062-1.129.13-3.218-.737-2.515-1.042-4.144-3.612-4.269-3.778-.125-.165-1.018-1.353-1.018-2.583 0-1.23.639-1.834.869-2.083.23-.249.502-.311.668-.311.166 0 .332-.005.476 0 .151.005.356-.057.545.4.195.466.666 1.625.726 1.748.06.124.1.269.015.435-.085.166-.13.269-.255.414-.125.145-.264.316-.381.435-.13.13-.266.273-.11.543.155.269.691 1.143 1.484 1.848.97.863 1.815 1.134 2.08 1.258.265.124.42.103.575-.072.155-.175.666-.775.845-1.04.18-.264.36-.217.595-.134.235.083 1.483.7 1.737.825.254.124.425.186.485.29.06.104.06.605-.184 1.291z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">WhatsApp Us</h3>
                                        <p className="text-emerald-700 font-semibold">+94 76 251 5494</p>
                                        <p className="text-slate-500 text-sm mt-1 leading-none">Instant response available</p>
                                    </div>
                                </Link>

                                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Email Address</h3>
                                        <p className="text-slate-600">support@healthlink.lk</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Our Location</h3>
                                        <p className="text-slate-600">Colombo, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                                        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h2>
                                    <p className="text-slate-600 text-lg mb-8">
                                        Thank you for reaching out. Our team will get back to you shortly.
                                    </p>
                                    <button 
                                        onClick={() => setSubmitted(false)}
                                        className="rounded-full bg-slate-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-sky-600 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900">Your Name</label>
                                            <input 
                                                type="text" 
                                                name="name"
                                                required 
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" 
                                                placeholder="John Doe" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-900">Email Address</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                required 
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" 
                                                placeholder="john@example.com" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Subject</label>
                                        <input 
                                            type="text" 
                                            name="subject"
                                            required 
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" 
                                            placeholder="How can we help?" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Message</label>
                                        <textarea 
                                            name="message"
                                            required 
                                            rows={5} 
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none resize-none" 
                                            placeholder="Your message details..."
                                        ></textarea>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full rounded-2xl bg-slate-900 py-4 px-8 text-lg font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-sky-600 hover:shadow-sky-600/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : "Send Message"}
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
