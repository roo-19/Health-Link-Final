import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden bg-slate-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="gradient">
                                <stop stopColor="#7DD3FC" />
                                <stop offset={1} stopColor="#0EA5E9" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to get started?
                            <br />
                            Take control of your health today.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-slate-300">
                            Join thousands of others who have trusted Health Link for their medical and wellness needs. Secure, professional, and compassionate care is just a click away.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link
                                href="/register"
                                className="rounded-full bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                            >
                                Get care now
                            </Link>
                            <Link href="/careers" className="text-sm font-semibold leading-6 text-white hover:text-sky-300 transition-colors">
                                Apply to join <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                        <p className="mt-6 text-xs text-slate-400">
                            Integrated recommendations are offered only when appropriate and safe. Always follow your clinician’s instructions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
