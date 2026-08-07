import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="bg-white relative overflow-hidden py-10 sm:py-14">
            <div className="mx-auto max-w-[96%] max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative isolate overflow-hidden bg-primary px-6 py-12 sm:py-16 text-center shadow-2xl rounded-[2.5rem] border border-primary/10">
                    {/* Glowing Orbs using new palette */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary/30 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#002B9A]/30 rounded-full blur-[120px] pointer-events-none" />

                    {/* Concentric Circle Lines Overlay - Releaf design detail */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none stroke-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50%" cy="50%" r="80" strokeDasharray="4 4" />
                        <circle cx="50%" cy="50%" r="160" />
                        <circle cx="50%" cy="50%" r="240" strokeDasharray="8 4" />
                        <circle cx="50%" cy="50%" r="320" />
                        <circle cx="50%" cy="50%" r="400" strokeDasharray="12 4" />
                        <circle cx="50%" cy="50%" r="480" />
                        <circle cx="50%" cy="50%" r="560" />
                        <circle cx="50%" cy="50%" r="640" />
                        <circle cx="50%" cy="50%" r="720" />
                        <circle cx="50%" cy="50%" r="800" />
                    </svg>

                    <h2 className="mx-auto max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-serif">
                        Ready to take control <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-white font-black">of your health journey?</span>
                    </h2>
                    <p className="mx-auto mt-4 sm:mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-slate-200 font-light">
                        Join thousands of clients who have trusted Health Link for clinical telemedicine and holistic wellness care. Professional, compassionate, and secure support is just a click away.
                    </p>
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="rounded-full bg-secondary px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all duration-300 hover:scale-105 hover:shadow-secondary/35 text-center w-full sm:w-auto"
                        >
                            Get care now
                        </Link>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}
