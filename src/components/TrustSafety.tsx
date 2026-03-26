import Link from "next/link";

export default function TrustSafety() {
    return (
        <section className="bg-white py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/4 pointer-events-none" />
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="max-w-2xl lg:pr-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-6">
                            <span className="text-xs font-bold uppercase tracking-wide text-sky-600">Secure & Confidential</span>
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight mb-6">
                            Trust, Safety, and Compliance Built In
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-600 mb-10">
                            Your privacy is our utmost priority. We adhere to strictly enforced data protection standards, ensuring your most sensitive health information remains secure, encrypted, and completely confidential.
                        </p>
                        
                        <div className="flex flex-col gap-6">
                            <div className="glass-card p-6 flex items-start gap-5">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 shadow-inner">
                                    <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">End-to-End Encryption</h4>
                                    <p className="text-slate-600 leading-relaxed text-sm">All data is encrypted in transit and at rest using banking-level industry protocols, strictly maintaining privacy.</p>
                                </div>
                            </div>
                            
                            <div className="glass-card p-6 flex items-start gap-5">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 shadow-inner">
                                    <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Compliance & Access Control</h4>
                                    <p className="text-slate-600 leading-relaxed text-sm">Data storage aligns fully with all local and international health regulations, utilizing strict role-based access.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-12">
                            <Link href="/privacy" className="inline-flex items-center gap-2 text-sm font-semibold leading-6 text-slate-900 hover:text-sky-600 transition-colors group">
                                Learn how we protect your data <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Visual side */}
                    <div className="relative h-[400px] lg:h-[450px] w-full max-w-[450px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center lg:mt-0 mt-8 mb-8 lg:mb-0">
                        <div className="absolute inset-0 bg-slate-900/20 mix-blend-overlay" />
                        
                        {/* Abstract shield representation */}
                        <div className="relative w-64 h-64 glass-dark rounded-full border border-white/20 flex flex-col items-center justify-center shadow-2xl p-8 z-10 text-center animate-[slow-zoom_10s_ease-in-out_infinite_alternate]">
                            <svg className="h-20 w-20 text-sky-400 mb-4 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <h3 className="text-white font-bold text-xl uppercase tracking-widest">Protected</h3>
                            <div className="w-12 h-1 bg-sky-400 rounded-full mt-2" />
                        </div>
                        
                        {/* Floating elements */}
                        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-[2px] animate-pulse" />
                        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-sky-300/20 rounded-full blur-[8px]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
