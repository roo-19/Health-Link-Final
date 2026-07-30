import Link from "next/link";

export default function Positioning() {
    return (
        <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
            {/* Soft brand glowing highlights */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column (typography focus) */}
                    <div className="lg:col-span-7">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-6">
                            Pioneering Connected Care
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-primary leading-[1.12] tracking-tight">
                            Integrating <span className="underline decoration-secondary decoration-4 underline-offset-8">24/7 on-demand medical care</span> with <span className="text-secondary font-black">personalized wellness</span> to pioneer a new era of comprehensive health.
                        </h2>
                    </div>

                    {/* Right Column (descriptive focus) */}
                    <div className="lg:col-span-5 lg:pt-16">
                        <p className="text-lg text-slate-600 leading-relaxed font-semibold mb-8">
                            Health Link creates a unique platform that integrates Western medicine with natural and alternative holistic modalities to form a personalized circle of care, helping each individual achieve a superior level of well‑being.                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary group transition-colors duration-300"
                        >
                            Discover our vision
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
