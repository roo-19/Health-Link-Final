"use client";

import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/components/servicesData";

export default function ServicesCircleNav() {
    return (
        <section className="bg-[linear-gradient(to_bottom,#fcf5f8,#ffffff)] py-20 lg:py-28" id="services-nav">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-800" style={{ fontFamily: 'sans-serif', letterSpacing: '0.05em' }}>
                        Your Benefits
                    </h2>
                </div>

                {/* 2 Rows, 3 Columns Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service) => (
                        <Link
                            href={service.detailLink}
                            key={service.id}
                            className="group flex flex-row items-center bg-white rounded-3xl p-5 sm:p-6 shadow-sm shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1 transition-all duration-300 border border-slate-100"
                        >
                            {/* Left Image Side */}
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-[1.5rem] overflow-hidden bg-slate-50">
                                <Image
                                    src={service.image}
                                    alt={service.navTitle}
                                    fill
                                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Right Content Side */}
                            <div className="ml-5 flex-1 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-1.5 leading-tight group-hover:text-primary transition-colors">
                                    {service.navTitle}
                                </h3>
                                <p className="text-[13px] sm:text-sm text-slate-500 leading-snug mb-3 line-clamp-2">
                                    {service.microText}
                                </p>
                                <span className="text-sm font-bold text-slate-800 transition-colors inline-flex items-center group-hover:text-red-700">
                                    Explore now <span aria-hidden="true" className="ml-1 text-lg leading-none">&rsaquo;</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
