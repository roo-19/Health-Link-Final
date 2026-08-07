import Image from "next/image";
import Link from "next/link";

export default function TrustSafety() {
    return (
        <section className="bg-white py-12 sm:py-16 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 rounded-l-[4rem] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Copy */}
                    <div className="max-w-xl">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
                            Security & Trust
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-6">
                            Clinical safety and digital privacy, built in.
                        </h2>
                        <p className="text-base text-slate-600 leading-relaxed font-light mb-8">
                            Your health information is extremely sensitive. We adhere to strictly enforced clinical compliance and data protection standards, ensuring your records remain encrypted and confidential at all times.
                        </p>

                        <div className="space-y-5">
                            <div className="flex gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-secondary border border-secondary/15">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-primary mb-1">End-to-End Encryption</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">All information is encrypted in transit and at rest using banking-level standards, keeping your consultations private.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-secondary border border-secondary/15">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-primary mb-1">Strict Clinical Compliance</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">Data governance aligns with local and international health regulations, utilizing strict role-based access controls.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <Link href="/privacy" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors group">
                                Learn how we protect your data <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Premium Graphic Frame */}
                    <div className="relative h-[380px] w-full max-w-[420px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/20 group lg:mt-0 mt-6">
                        <Image
                            src="/doctorscaring.jpg"
                            alt="Trust and Care"
                            fill
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none mix-blend-multiply" />

                        
                    </div>
                </div>
            </div>
        </section>
    );
}
