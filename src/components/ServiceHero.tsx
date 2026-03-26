import Image from "next/image";
import Link from "next/link";
import { ServiceData } from "@/components/servicesData";

interface ServiceHeroProps {
    service: ServiceData;
    imageSrc: string;
}

export default function ServiceHero({ service, imageSrc }: ServiceHeroProps) {
    return (
        <section className="relative overflow-hidden bg-slate-50 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 min-h-[85vh] flex items-center">
            {/* Background glowing accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-200/50 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <div className="max-w-2xl">
                        {/* Breadcrumbs / Back button */}
                        <div className="mb-8">
                            <Link href="/#services" className="inline-flex items-center text-sm font-semibold tracking-wide text-sky-600 hover:text-sky-500 transition-colors duration-300 group">
                                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 group-hover:bg-sky-200 transition-colors">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </span>
                                Back to All Services
                            </Link>
                        </div>

                        {service.badge && (
                            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 shadow-sm">
                                <span className={`w-2 h-2 rounded-full bg-${service.theme}-500 animate-pulse`} />
                                <span className={`text-sm font-semibold tracking-wide text-${service.theme}-700`}>
                                    {service.badge}
                                </span>
                            </div>
                        )}

                        <div className="inline-block relative mb-6">
                            {service.subtitle && (
                                <p className="text-lg sm:text-xl font-medium text-sky-600/90 mb-3 italic">
                                    {service.subtitle}
                                </p>
                            )}
                            <h1 className="relative text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.1]">
                                {service.title}
                            </h1>
                        </div>

                        <div className="text-lg text-slate-600 leading-relaxed mb-10 sm:text-xl font-light">
                            {service.intro}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={service.ctaLink}
                                target={service.ctaLink.startsWith('http') ? "_blank" : undefined}
                                rel={service.ctaLink.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="inline-flex justify-center items-center rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-slate-900/20 hover:bg-sky-600 hover:shadow-sky-600/30 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {service.ctaIcon && service.ctaIcon}
                                {service.cta}
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex justify-center items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 group"
                            >
                                Explore Features
                                <svg className="ml-2 h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="relative h-[450px] sm:h-[550px] lg:h-[700px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-200/50 group">
                        <Image
                            src={imageSrc}
                            alt={service.title}
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        {/* Subtle inner gradient for premium feel */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 via-transparent to-transparent pointer-events-none" />

                        {/* Removed Floating glass badge per request */}
                    </div>

                </div>
            </div>
            {/* CSS Animation for float */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}} />
        </section>
    );
}
