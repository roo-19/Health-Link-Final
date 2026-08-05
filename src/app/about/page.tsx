"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const values = [
  {
    title: "Compassionate Clinical Care",
    description: "Our approach is rooted in deep medical empathy, treating every client like family, prioritizing emotional and physical well-being above all.",
    image: "/benefits_home_care.png",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-7.682-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    )
  },
  {
    title: "On-Demand Digital Telemedicine",
    description: "We harness modern digital health tools to connect you with SLMC-licensed physicians, providing seamless, confidential care anywhere.",
    image: "/doctorscaring.jpg",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    )
  },
  {
    title: "Mindful & Multifaith Wellness",
    description: "Integrating traditional medicine with sacred chaplaincy and mindfulness practices to deliver care that nourishes body, mind, and spirit.",
    image: "/benefits_integrated_healing.png",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    )
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fefcf8]">
      <Navbar />

      {/* Dedicated About Us Hero Section (Distinct 2-Column Showcase) */}
      <section className="relative pt-36 sm:pt-44 pb-16 lg:pt-44 lg:pb-24 overflow-hidden bg-[#fefcf8] border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Mission Statement & Philosophy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-extrabold text-emerald-800 mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>WHO WE ARE &amp; OUR MISSION</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-primary leading-[1.08] tracking-tight mb-6">
                Bridging Science <br />
                <span className="font-serif italic font-normal text-secondary">&amp; Empathy</span> to Transform <br />
                Human Healthcare.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-medium max-w-2xl mb-8">
                Health Link is an integrated digital care network uniting SLMC-licensed medical specialists, home care nurses, and multifaith chaplains under one unified circle of care designed around your life.
              </p>

              {/* Key Highlights Quick Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                  <span className="block text-lg sm:text-xl font-extrabold text-primary">50+</span>
                  <span className="text-[11px] font-bold text-slate-600">SLMC Doctors</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                  <span className="block text-lg sm:text-xl font-extrabold text-secondary">24/7</span>
                  <span className="text-[11px] font-bold text-slate-600">Live Care Access</span>
                </div>
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                  <span className="block text-lg sm:text-xl font-extrabold text-sky-700">100%</span>
                  <span className="text-[11px] font-bold text-slate-600">Confidential</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/signup"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-shimmer-bg px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  <span>Join Health Link Today</span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-all text-sm shadow-sm"
                >
                  Contact Clinical Team
                </Link>
              </div>
            </div>

            {/* Right Column: Distinct Framed Team Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200/80 bg-white p-3 shadow-2xl shadow-slate-900/10 group">
                <div className="relative h-[420px] sm:h-[480px] w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src="/images/about_us_team_hero.png"
                    alt="Health Link Medical & Wellness Team"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Floating SLMC Vetted Badge overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">Verified Medical Specialists</h4>
                        <p className="text-[10px] text-emerald-800 font-bold">Western Doctors &amp; Spiritual Chaplains</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Story / Mission Section */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Story Image Area - Beautiful Presentation of Logo & Badge */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent to-secondary/10 rounded-[40px] transform -rotate-2 border border-secondary/20 shadow-inner"></div>
              <div className="absolute -inset-2 bg-slate-50 rounded-[35px] transform rotate-1 backdrop-blur-sm border border-slate-200/60"></div>
              
              <div className="relative rounded-3xl bg-white shadow-xl p-8 sm:p-12 border border-slate-100 flex aspect-square items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-white z-0" />
                <Image
                  src="/logo111.png"
                  alt="Health Link Logo"
                  width={320}
                  height={320}
                  className="object-contain drop-shadow-xl transform transition-all duration-700 group-hover:scale-105 z-10"
                />
                <div className="absolute bottom-6 right-6 z-20 h-16 w-16 rounded-2xl overflow-hidden shadow-lg border border-emerald-200 animate-float-slow bg-emerald-50">
                  <Image
                    src="/images/health_vibrant_badge.png"
                    alt="Vibrant Care Badge"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Story Text Content */}
            <div className="order-1 lg:order-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-secondary block mb-2">Our Foundation</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-primary leading-tight mb-6">
                Connecting you to care that feels <span className="font-serif italic font-normal text-secondary">like home.</span>
              </h2>
              
              <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-700 font-normal">
                <p>
                  It started with a simple, unifying vision: to eliminate the logistical and geographic barriers between clients and high-quality, compassionate clinical care. We recognized a significant gap in traditional healthcare — an alarming lack of personalization and digital accessibility.
                </p>
                <p>
                  Today, Health Link stands as a premier integrated health platform offering an array of interconnected services: from primary Telemedicine and Clinical Psychology to Home Care and Multifaith Spiritual Chaplaincy.
                </p>
              </div>

              {/* Stats Overview Cards */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-accent/50 to-white rounded-2xl p-6 border border-secondary/20 shadow-sm group hover:scale-105 transition-all">
                  <div className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">10k+</div>
                  <div className="mt-2 text-xs font-bold text-slate-700">Satisfied Clients Served</div>
                </div>
                <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-6 border border-sky-200 shadow-sm group hover:scale-105 transition-all">
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-700 tracking-tight">99%</div>
                  <div className="mt-2 text-xs font-bold text-slate-700">Clinical Satisfaction Rate</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-20 sm:py-24 bg-[#fefcf8] relative border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-secondary block mb-2">Our Core Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mb-4">
              What Drives Our Mission
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              We stand by fundamental pillars that ensure every interaction enriches your journey towards complete well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
