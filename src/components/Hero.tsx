import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] w-full overflow-hidden rounded-b-[2rem] sm:rounded-b-[4rem] bg-slate-900 shadow-2xl z-10 flex items-center">
            {/* Background Image & Effects */}
            <div className="absolute inset-0">
                <Image
                    src="/hero2.png"
                    alt="Healthcare Professional"
                    fill
                    className="object-cover object-top opacity-80 scale-105 animate-[slow-zoom_25s_ease-in-out_infinite_alternate]"
                    priority
                />
                {/* Modern Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Abstract Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sky-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
            </div>

            {/* Hero Content */}
            <div className="relative mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8 mt-16 sm:mt-10">
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] drop-shadow-md mt-6">
                        Empowering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-indigo-300 drop-shadow-sm">
                            Healing.
                        </span>
                    </h1>
                    <p className="mt-8 max-w-xl text-lg sm:text-xl text-slate-300 font-light leading-relaxed">
                        Bridging western medicine and traditional healing to provide a truly personalized care journey designed around you.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center">
                        <Link
                            href="/services/telemedicine/register"
                            className="rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-xl shadow-white/10 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105 hover:shadow-sky-500/20 text-center"
                        >
                            Get care now
                        </Link>
                        <Link href="/about" className="group rounded-full px-8 py-4 text-sm font-semibold leading-6 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-center border border-transparent hover:border-white/20">
                            Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Glass Stats/Cards */}
            <div className="hidden lg:flex absolute bottom-12 right-12 gap-6 z-20">
                <div className="glass-dark p-6 rounded-3xl max-w-[220px] shadow-2xl transition-transform hover:-translate-y-2 duration-300 border border-white/10">
                    <div className="text-4xl font-extrabold text-white mb-2 tracking-tight">10k+</div>
                    <div className="text-sm text-slate-300 leading-snug">Patients trusted us with their health & wellness.</div>
                </div>
                <div className="glass-dark p-6 rounded-3xl max-w-[220px] translate-y-8 shadow-2xl transition-transform hover:-translate-y-2 duration-300 border border-white/10">
                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-sky-200 mb-2 tracking-tight">100%</div>
                    <div className="text-sm text-slate-300 leading-snug">Confidential & secure consultations guaranteed.</div>
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
