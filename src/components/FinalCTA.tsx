import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="bg-white relative overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-20 text-center shadow-2xl sm:rounded-3xl sm:px-16 glass-dark border border-slate-700/50">
                    {/* Glowing Orbs */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Ready to get started?
                        <br />
                        <span className="text-gradient">Take control of your health today.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
                        Join thousands of others who have trusted Health Link for their medical and wellness needs. Secure, professional, and compassionate care is just a click away.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/services/telemedicine/register"
                            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-sm hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/20"
                        >
                            Get care now
                        </Link>
                        <Link href="/careers" className="text-base font-semibold leading-6 text-white hover:text-sky-300 transition-colors group">
                            Apply to join <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
