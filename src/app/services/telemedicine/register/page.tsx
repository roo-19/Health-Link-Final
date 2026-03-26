"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TelemedicineRegistration() {
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            alert("Please agree to the Terms of Service & Informed Consent to proceed.");
            return;
        }
        // Handle form submission...
        alert("Registration submitted successfully!");
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <section className="relative pt-24 sm:pt-32 pb-16 lg:pb-0 flex-grow flex items-stretch">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                    <div className="bg-white rounded-[2.5rem] sm:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row ring-1 ring-slate-200/50">
                        
                        {/* Left Side: Brand & Visuals */}
                        <div className="lg:w-2/5 relative min-h-[400px] lg:min-h-full p-10 sm:p-14 flex flex-col justify-between overflow-hidden">
                            {/* Deep rich dynamic background */}
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
                                <Link href="/services/telemedicine" className="inline-flex items-center text-sm font-semibold tracking-wide text-sky-300 hover:text-sky-200 mb-8 transition-colors">
                                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Telemedicine
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
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Patient Registration</h2>
                            <p className="text-slate-500 mb-10">Please fill out your details to schedule your consultation.</p>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Full Name</label>
                                        <input type="text" required className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Email Address</label>
                                        <input type="email" required className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Phone Number</label>
                                        <input type="tel" required className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-900">Date of Birth</label>
                                        <input type="date" required className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">Reason for Consultation</label>
                                    <textarea required rows={3} className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none resize-none" placeholder="Briefly describe your symptoms or request..."></textarea>
                                </div>

                                {/* Agreement Section */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900">Terms of Service & Informed Consent</h3>
                                    <p className="text-sm text-slate-500">Please scroll and read the complete agreement below before proceeding.</p>
                                    
                                    <div className="h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-sm text-slate-600 prose prose-sm prose-slate max-w-none shadow-inner">
                                        <h4 className="font-bold text-slate-900 text-base mb-2">Terms of Service & Informed Consent for Health Link Pvt Ltd</h4>
                                        <p className="mb-4 text-xs">Last Updated: March 2026</p>

                                        <p className="font-semibold text-slate-900">1. Acceptance of Terms</p>
                                        <p className="mb-4">By accessing or using the services, website, and mobile application (collectively, the &quot;Services&quot;) provided by Health Link Pvt Ltd (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you (&quot;Patient,&quot; &quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) acknowledge that you have read, understood, and agree to be bound by these Terms of Service and Informed Consent (&quot;Agreement&quot;). If you do not agree to these terms, you may not use our Services.</p>

                                        <p className="font-semibold text-slate-900">2. Services Description</p>
                                        <p className="mb-4">Our Services provide a platform that connects users with: a) Licensed Medical Professionals (e.g., Physicians, Nurse Practitioners) who provide diagnosis, treatment, and consultation via telemedicine (&quot;Medical Services&quot;). b) Holistic Wellness Practitioners (e.g., Ayurvedic Consultants, Yoga Therapists, Energy Healers, Astrology Guides) who provide education, guidance, and wellness planning (&quot;Holistic Services&quot;).<br/><br/>Company is a technology platform, not a healthcare provider. The independent medical professionals and holistic practitioners (collectively, &quot;Providers&quot;) are solely responsible for the clinical and guidance services they provide to you. Company does not practice medicine or any licensed profession.</p>

                                        <p className="font-semibold text-slate-900">3. Not for Emergencies</p>
                                        <p className="mb-4 uppercase font-semibold text-rose-600">The Services are not for medical emergencies.</p>
                                        <p className="mb-4">You agree and acknowledge that the Services are not intended to support or replace treatment for medical emergencies. If you believe you are experiencing a medical emergency, you must call 911 or your local emergency number immediately and proceed to the nearest emergency room. Examples of emergencies include, but are not limited to: chest pain, difficulty breathing, severe bleeding, sudden paralysis or weakness, suicidal or homicidal thoughts, and trauma.</p>

                                        <p className="font-semibold text-slate-900">4. Informed Consent for Telemedicine</p>
                                        <p className="mb-4">You understand and consent to the use of telemedicine as part of your care.<br/>a) Inherent Limitations: You acknowledge that telemedicine has limitations compared to an in-person visit, including but not limited to: the inability to conduct a full physical examination, potential for technology failures, and possible delays in evaluation and treatment due to these factors.<br/>b) Security: We use encrypted, HIPAA-compliant video conferencing technology. However, you understand that no data transmission over the internet can be guaranteed to be 100% secure. You are responsible for ensuring a private environment on your end to protect your own confidentiality.<br/>c) Alternative Options: You understand you have the right to withdraw consent to telemedicine at any time and seek in-person care. Withdrawing consent will not affect any care provided prior to the withdrawal.</p>

                                        <p className="font-semibold text-slate-900">5. Scope of Practice & Disclaimer for Holistic Services</p>
                                        <p className="mb-4">You expressly acknowledge and agree that:<br/>a) Not Medical Advice: Holistic Services provided are for wellness, educational, and personal development purposes only. They are not a substitute for licensed medical care, diagnosis, or treatment.<br/>b) No Guarantees: Providers do not diagnose, treat, or claim to cure any medical disease or condition. Any information, suggestions, or plans provided are not guaranteed to produce any specific result.<br/>c) Your Responsibility: You are solely responsible for your choices in implementing any wellness suggestions and for seeking standard medical care for any known or suspected medical condition.</p>

                                        <p className="font-semibold text-slate-900">6. User Responsibilities & Account Security</p>
                                        <p className="mb-4">a) You agree to provide accurate, current, and complete information during registration and in all interactions.<br/>b) You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.<br/>c) You agree to use the Services only for yourself, unless you are a legally authorized representative for a minor or dependent.</p>

                                        <p className="font-semibold text-slate-900">7. Fees and Payment</p>
                                        <p className="mb-4">You agree to pay all fees associated with the Services you select. All fees are due at the time of service. We use a secure third-party payment processor. All sales are final, and refunds are provided only at the sole discretion of the Company and in accordance with our Refund Policy.</p>

                                        <p className="font-semibold text-slate-900">8. Intellectual Property</p>
                                        <p className="mb-4">All content, trademarks, and data on our platform, including but not limited to software, algorithms, text, graphics, and logos, are the property of the Company or its licensors and are protected by intellectual property laws. You are granted a limited license to use the Services for personal, non-commercial use.</p>

                                        <p className="font-semibold text-slate-900">9. Privacy</p>
                                        <p className="mb-4">Our use of your personal and health information is governed by our Privacy Policy and Notice of Privacy Practices, which are incorporated into this Agreement by reference. We adhere to the Health Insurance Portability and Accountability Act (HIPAA) and other applicable privacy laws.</p>

                                        <p className="font-semibold text-slate-900">10. Limitation of Liability</p>
                                        <p className="mb-4">TO THE FULLEST EXTENT PERMITTED BY LAW:<br/>a) Company, its affiliates, and its Providers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or use, arising out of or related to your use of the Services.<br/>b) The total aggregate liability of Company and its Providers for any and all claims arising from this Agreement or your use of the Services shall not exceed the total amount of fees you have paid to Company in the six (6) months prior to the event giving rise to the claim.<br/>c) These limitations apply even if Company has been advised of the possibility of such damages.</p>

                                        <p className="font-semibold text-slate-900">11. Disclaimer of Warranties</p>
                                        <p className="mb-4">The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, express or implied. Company expressly disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Company does not warrant that the Services will be uninterrupted, secure, or error-free.</p>

                                        <p className="font-semibold text-slate-900">12. Indemnification</p>
                                        <p className="mb-4">You agree to indemnify, defend, and hold harmless Company, its officers, directors, employees, agents, and Providers from and against any and all claims, damages, losses, liabilities, suits, and costs (including reasonable attorneys&apos; fees) arising from or relating to: (a) your use of the Services; (b) your violation of this Agreement; or (c) your violation of any third-party right.</p>

                                        <p className="font-semibold text-slate-900">13. Governing Law and Dispute Resolution</p>
                                        <p className="mb-4">a) Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles.<br/>b) Mandatory Arbitration: Any dispute, claim, or controversy arising out of or relating to this Agreement shall be resolved by binding arbitration administered by the American Arbitration Association (&quot;AAA&quot;) under its Commercial Arbitration Rules. The arbitration shall take place in New York, NY. YOU AND COMPANY AGREE TO WAIVE THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.<br/>c) Exceptions: This arbitration clause does not preclude either party from seeking injunctive or other equitable relief in a court of competent jurisdiction to prevent actual or threatened misuse of intellectual property or confidential information.</p>

                                        <p className="font-semibold text-slate-900">14. Modifications and Termination</p>
                                        <p className="mb-4">We reserve the right to modify this Agreement at any time. We will notify you of material changes. Your continued use of the Services after such notice constitutes your acceptance of the new terms. We reserve the right to terminate or suspend your access to the Services at any time, without notice, for conduct we believe violates this Agreement or is harmful to other users.</p>

                                        <p className="font-semibold text-slate-900">15. Severability</p>
                                        <p className="mb-4">If any provision of this Agreement is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will remain in full force and effect.</p>

                                        <p className="font-semibold text-slate-900">16. Acknowledgement</p>
                                        <p className="mb-4 uppercase">BY CLICKING &quot;I AGREE,&quot; USING THE SERVICES, OR SCHEDULING AN APPOINTMENT, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS ENTIRE AGREEMENT, UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS. YOU CONFIRM YOU ARE OF LEGAL AGE AND HAVE THE LEGAL CAPACITY TO ENTER INTO THIS AGREEMENT.</p>
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
                                    className="w-full rounded-2xl bg-slate-900 py-4 px-8 text-lg font-bold text-white shadow-xl shadow-slate-900/10 hover:bg-sky-600 hover:shadow-sky-600/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                    disabled={!agreed}
                                >
                                    Complete Registration
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
