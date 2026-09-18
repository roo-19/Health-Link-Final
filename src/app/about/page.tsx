"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const pillars = [
  {
    title: "Holistic Approach",
    description:
      "We bring together a skilled team of doctors, nurses, and wellness experts to care for your full physical, mental, and emotional health.",
    image: "/holistic approch.jpg",
    alt: "Holistic Approach - Whole Person Health Care",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
    ),
  },
  {
    title: "Easy Accessibility and Affordability",
    description:
      "Get medical care 24/7 whenever you need it. Our services are affordable and work with health and travel insurance.",
    image: "/aboutushero.png",
    alt: "Easy Accessibility and Affordability - 24/7 Care",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
  },
  {
    title: "Trustworthiness",
    description:
      "You are in safe hands. We work with licensed medical experts, trusted specialists, and top private hospitals to give you reliable care.",
    image: "/doctorscaring.jpg",
    alt: "Trustworthiness - Licensed Medical Professionals",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    ),
  },
  {
    title: "Outstanding Compassion, Care, and Communication",
    description:
      "We treat you like family. Our care team listens closely, communicates clearly, and stays with you every step of the way.",
    image: "/benefits_telemedicine2.png",
    alt: "Compassion Care and Communication - Dedicated Telemedicine Team",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-7.682-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    ),
  },
  {
    title: "Corporate Social Responsibility",
    description:
      "We give back to our community. Together, we help support and care for children and families in need.",
    image: "/hero_community.png",
    alt: "Corporate Social Responsibility - Community Support",
    icon: (
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457-.312-2.841-.873-4.084" />
        </svg>
      </div>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fefcf8]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-44 pb-16 lg:pt-44 lg:pb-24 overflow-hidden bg-[#fefcf8] border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Mission Statement & Philosophy */}
            <ScrollReveal className="lg:col-span-7" direction="up" delay={100}>
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
                <ScrollReveal delay={150} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <span className="block text-lg sm:text-xl font-extrabold text-primary">50+</span>
                  <span className="text-[11px] font-bold text-slate-600">SLMC Doctors</span>
                </ScrollReveal>
                <ScrollReveal delay={250} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <span className="block text-lg sm:text-xl font-extrabold text-secondary">24/7</span>
                  <span className="text-[11px] font-bold text-slate-600">Live Care Access</span>
                </ScrollReveal>
                <ScrollReveal delay={350} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <span className="block text-lg sm:text-xl font-extrabold text-sky-700">100%</span>
                  <span className="text-[11px] font-bold text-slate-600">Confidential</span>
                </ScrollReveal>
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
            </ScrollReveal>

            {/* Right Column: Framed Team Showcase */}
            <ScrollReveal className="lg:col-span-5 relative" direction="left" delay={200}>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200/80 bg-white p-3 shadow-2xl shadow-slate-900/10 group">
                <div className="relative h-[420px] sm:h-[480px] w-full rounded-[2rem] overflow-hidden">
                  <Image
                    src="/images/sri_lankan_about_team.png"
                    alt="Health Link Sri Lankan Medical & Wellness Team"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  {/* Floating SLMC Vetted Badge overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">Verified Medical Specialists</h4>
                        <p className="text-[10px] text-emerald-800 font-bold">Western Doctors &amp; Spiritual Chaplains</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Image Area */}
            <ScrollReveal className="relative order-2 lg:order-1" direction="right" delay={150}>
              <div className="absolute -inset-4 bg-gradient-to-tr from-accent to-secondary/10 rounded-[40px] transform -rotate-2 border border-secondary/20 shadow-inner"></div>
              <div className="absolute -inset-2 bg-slate-50 rounded-[35px] transform rotate-1 backdrop-blur-sm border border-slate-200/60"></div>
              
              <div className="relative rounded-3xl bg-white shadow-xl p-8 sm:p-12 border border-slate-100 flex aspect-square items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-white z-0" />
                <Image
                  src="/Your Trusted Partner.png"
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
            </ScrollReveal>

            {/* Story Text Content */}
            <ScrollReveal className="order-1 lg:order-2" direction="left" delay={200}>
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
                <ScrollReveal delay={100} className="bg-gradient-to-br from-accent/50 to-white rounded-2xl p-6 border border-secondary/20 shadow-sm group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out">
                  <div className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">10k+</div>
                  <div className="mt-2 text-xs font-bold text-slate-700">Satisfied Clients Served</div>
                </ScrollReveal>
                <ScrollReveal delay={200} className="bg-gradient-to-br from-sky-50 to-white rounded-2xl p-6 border border-sky-200 shadow-sm group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out">
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-700 tracking-tight">99%</div>
                  <div className="mt-2 text-xs font-bold text-slate-700">Clinical Satisfaction Rate</div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission Showcase Section */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden my-12 rounded-[2.5rem] sm:rounded-[3.5rem] mx-4 sm:mx-8 lg:mx-auto max-w-7xl shadow-2xl">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-12 lg:px-16">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Our Purpose &amp; Driving Force
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Guided by Purpose, Driven by Care
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <ScrollReveal delay={100} className="h-full">
              <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 flex flex-col justify-between h-full">
                <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-emerald-500 to-teal-400 text-[11px] font-black text-slate-950 uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                  The Horizon
                </div>
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-3">Our Vision</h3>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white leading-snug tracking-tight">
                    &ldquo;A world where <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">holistic well-being</span> is accessible to everyone.&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Universal Healthcare Access</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission Card */}
            <ScrollReveal delay={200} className="h-full">
              <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-sky-500/40 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-2 flex flex-col justify-between h-full">
                <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-sky-400 to-blue-500 text-[11px] font-black text-slate-950 uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                  Our Action
                </div>
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-sky-400 mb-3">Our Mission</h3>
                  <p className="text-xl sm:text-2xl font-bold text-slate-100 leading-relaxed">
                    &ldquo;To guide and support people on their journey toward healthier, more balanced lives through trusted holistic wellness solutions.&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Empowering Person-Centered Care</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Pillars Section (Centering the bottom 2 pillars) */}
      <section className="py-20 sm:py-24 bg-[#fefcf8] relative border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <ScrollReveal className="mx-auto max-w-2xl text-center mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-secondary block mb-2">Our Core Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mb-4">
              What Drives Our Mission
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              We stand by five fundamental pillars that ensure every interaction enriches your journey towards complete well-being.
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center -m-4">
            {pillars.map((pillar, idx) => (
              <ScrollReveal 
                key={idx} 
                delay={(idx + 1) * 100}
                className="p-4 w-full md:w-1/2 lg:w-1/3 flex"
              >
                <div className="w-full group relative bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    {/* Image Frame */}
                    <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200/60">
                      <Image
                        src={pillar.image}
                        alt={pillar.alt}
                        fill
                        className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        {pillar.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-primary mb-3 group-hover:text-secondary transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
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