import Link from "next/link";
import { ServiceData } from "@/components/servicesData";

interface ServiceFinalCTAProps {
    service: ServiceData;
}

export default function ServiceFinalCTA({ service }: ServiceFinalCTAProps) {
    return (
        <section className="relative overflow-hidden py-32 bg-slate-950">
            {/* Absolute breathtaking background glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-y-1/3 -translate-x-1/3" />
            
            {/* Soft grid overlay for texture */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
                <div className="glass-dark border border-white/10 rounded-[3rem] p-12 sm:p-20 text-center text-balance shadow-2xl overflow-hidden relative">
                    
                    {/* Inner highlight */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-sky-400/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
                    
                    <div className="relative z-10">
                        <h2 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-md">
                            {service.finalCtaTitle || "Start Your Healing Journey Today"}
                        </h2>
                        <div className="mx-auto max-w-2xl text-xl text-slate-300 mb-12 font-light leading-relaxed">
                            {service.finalCtaDescription || "Take the first step toward comprehensive, personalized care tailored exactly to your profound needs."}
                        </div>
                        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
                            <Link
                                href={service.ctaLink}
                                className="w-full sm:w-auto inline-flex justify-center items-center rounded-full bg-white px-10 py-5 text-lg font-bold text-slate-900 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:bg-slate-50 hover:scale-105 transition-all duration-300"
                            >
                                {service.ctaIcon && service.ctaIcon}
                                {service.cta}
                            </Link>
                            <span className="text-sm font-medium text-slate-400">
                                {service.trust}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
