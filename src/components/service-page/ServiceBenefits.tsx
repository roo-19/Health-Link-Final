import Image from "next/image";
import { ServiceData } from "@/components/servicesData";

interface ServiceBenefitsProps {
    service: ServiceData;
    imageSrc: string;
}

export default function ServiceBenefits({ service, imageSrc }: ServiceBenefitsProps) {
    if (!service.benefits || service.benefits.length === 0) return null;

    return (
        <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
            {/* Soft decorative background blurs */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">

                    {/* Left: Benefits List */}
                    <div className="mb-16 lg:mb-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                            <span className="text-xs font-bold uppercase tracking-wide text-emerald-600">The Benefits</span>
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-10 leading-[1.15]">
                            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">difference</span> down to every detail.
                        </h2>

                        <ul className="space-y-8">
                            {service.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex gap-5 group">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-100 group-hover:bg-emerald-100 group-hover:scale-110 transition-all duration-300">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-lg text-slate-700 leading-relaxed font-medium pt-2">
                                        {benefit}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Abstract/Lifestyle Image */}
                    <div className="relative h-[500px] sm:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-200 lg:order-last group">
                        <Image
                            src={imageSrc}
                            alt="Benefits Lifestyle"
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 via-slate-900/5 to-transparent pointer-events-none mix-blend-multiply" />
                    </div>

                </div>
            </div>
        </section>
    );
}
