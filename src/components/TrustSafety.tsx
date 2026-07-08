import Image from "next/image";
import Link from "next/link";

export default function TrustSafety() {
    return (
        <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 rounded-l-[4rem] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Copy */}
                    <div className="max-w-xl">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-6">
                            Security & Trust
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-primary leading-tight mb-8">
                            Clinical safety and digital privacy, built in.
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-10">
                            Your health information is extremely sensitive. We adhere to strictly enforced clinical compliance and data protection standards, ensuring your records remain encrypted and confidential at all times.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-secondary border border-secondary/15">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">End-to-End Encryption</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">All information is encrypted in transit and at rest using banking-level standards, keeping your consultations private.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-secondary border border-secondary/15">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-1">Strict Clinical Compliance</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">Data governance aligns with local and international health regulations, utilizing strict role-based access controls.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <Link href="/privacy" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors group">
                                Learn how we protect your data <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Premium Graphic Frame */}
                    <div className="relative h-[480px] w-full max-w-[480px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/20 group lg:mt-0 mt-8">
                        <Image
                            src="/doctorscaring.jpg"
                            alt="Trust and Care"
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none mix-blend-multiply" />

                        {/* Physical Stamp Sticker Style Badge overlay */}
                        <div className="absolute -bottom-6 -left-6 z-20">
                            <div className="relative w-36 h-36 flex items-center justify-center rounded-full bg-white shadow-2xl border border-[#002B9A]/10">
                                <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                    <defs>
                                        <path id="stampPath" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
                                    </defs>
                                    <text className="text-[6.5px] fill-primary font-bold uppercase tracking-[0.24em]" style={{ fontFamily: 'sans-serif' }}>
                                        <textPath href="#stampPath" startOffset="0%">
                                            health link • secure data • 100% compliant •
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="w-16 h-16 rounded-full bg-accent border border-secondary/20 flex items-center justify-center text-secondary shadow-inner">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
