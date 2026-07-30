import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[92vh] w-[96%] mx-auto mt-4 overflow-hidden rounded-[2.5rem] sm:rounded-[4rem] bg-slate-950 shadow-2xl z-10 flex items-center">
            {/* Background Image & Effects */}
            <div className="absolute inset-0">
                <Image
                    src="/hero1.png"
                    alt="Healthcare Professional"
                    fill
                    className="object-cover object-top opacity-500 scale-105 animate-[slow-zoom_30s_ease-in-out_infinite_alternate]"
                    priority
                />
                
                {/* Dotted Grid Background Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

                {/* Modern Dark Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-90/65 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* Abstract Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary/25 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-secondary/20 blur-[130px] rounded-full pointer-events-none" />
            </div>

            {/* Hero Content */}
            <div className="relative mx-auto flex w-full max-w-7xl items-center px-8 sm:px-12 lg:px-16 mt-20 sm:mt-12">
                <div className="max-w-3xl">
                    {/* Upper Badge */}
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-secondary/20 bg-secondary/15 px-4.5 py-2 text-xs sm:text-sm font-semibold tracking-wide text-secondary mb-8 backdrop-blur-sm self-center shadow-lg shadow-black/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                        </span>
                        Sri Lanka's Premier Digital Health Platform
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-md">
                        Empowering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-accent to-white drop-shadow-sm font-black">
                            Healing.
                        </span>
                    </h1>
                    <p className="mt-8 max-w-lg text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                        Bridging western medical care and traditional holistic wisdom to provide a truly personalized care journey designed around your life.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
                        <Link
                            href="/signup"
                            className="rounded-full bg-secondary px-8 py-4 text-base font-bold text-white shadow-xl shadow-secondary/20 hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-all duration-300 hover:scale-105 hover:shadow-secondary/35 text-center"
                        >
                            Get care now
                        </Link>
                        <Link href="/about" className="group rounded-full px-8 py-4 text-sm font-semibold leading-6 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-center border border-white/20">
                            Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Rotating Circular Stamp Badge */}
            <div className="absolute right-16 bottom-16 hidden lg:block z-20">
                <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                        <defs>
                            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        </defs>
                        <text className="text-[7.2px] fill-white/60 font-bold uppercase tracking-[0.26em]" style={{ fontFamily: 'sans-serif' }}>
                            <textPath href="#circlePath" startOffset="0%">
                                health link • secure & trusted • 24/7 •
                            </textPath>
                        </text>
                    </svg>
                    <div className="w-18 h-18 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/30 border border-white/15">
                        <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Floating Clinical Card */}
            <div className="absolute top-1/4 right-16 hidden xl:flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 p-4.5 rounded-2xl shadow-2xl z-20 transition-transform hover:-translate-y-1 duration-300">
                <div className="relative w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/20">
                    <span className="absolute w-4 h-4 rounded-full bg-secondary animate-ping opacity-60" />
                    <span className="relative w-2 h-2 rounded-full bg-secondary" />
                </div>
                <div>
                    <p className="text-white text-xs font-semibold">Clinicians Active Now</p>
                    <p className="text-slate-300 text-[10px]">Average response: 3-5 mins</p>
                </div>
            </div>


            {/* CSS Animation for background breathing effect */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.08); }
                }
            `}} />
        </section>
    );
}
