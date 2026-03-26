import Link from "next/link";

const services = [
    {
        title: "24/7 On-demand Telemedical Consulting",
        subtitle: "Western Medicine",
        description: "Connect instantly with licensed doctors for consultations, referrals, and prescriptions.",
        features: ["On-demand consulting", "Referral service", "Prescription writing"],
        cta: "Talk to your doctor now",
        ctaLink: "/services/telemedicine",
        trust: "Licensed doctors • Secure portal",
        icon: (
            <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: "AyuCare: Compassionate Home Care",
        subtitle: "Sri Lanka",
        description: "Personalized nursing and elder companionship aligned with Sri Lankan family values.",
        features: ["Nursing support", "Elder companionship", "Daily support"],
        cta: "Request home care",
        ctaLink: "/services/home-care",
        trust: "Languages: Sinhala | Tamil | English",
        contact: "Call/WhatsApp: 0XX-XXX-XXXX",
        icon: (
            <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        title: "Sacred Space Sri Lanka",
        subtitle: "Integrated Spiritual Care",
        tagline: "Guided by Faith, Supported by Care, United in Spirit.",
        description: "Multifaith spiritual healing and chaplaincy support respecting all major religions.",
        features: ["Confidential counseling", "Faith-specific rituals", "Crisis support"],
        cta: "Book a confidential session",
        ctaLink: "/services/spiritual-care",
        trust: "Free of charge • Multifaith",
        badge: "Free",
        icon: (
            <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
    {
        title: "Anew Psychology",
        subtitle: "Where Healing Begins and Hope Grows",
        description: "Warm, confidential therapy sessions for anxiety, trauma, and finding clarity.",
        features: ["CBT & Mindfulness", "Trauma support", "Relationship guidance"],
        cta: "Start therapy",
        ctaLink: "/services/psychology",
        trust: "Evidence-based approaches",
        contact: "Call/WhatsApp: [07x xxx xxxx]",
        icon: (
            <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        title: "Integrated Healing",
        subtitle: "Heal Uniquely. Live Fully.",
        description: "Combining Western medicine with Ayurveda, Vedic astrology, TCM, and Indigenous healing.",
        features: ["Personalized care plans", "Traditional meal plans", "Energy therapy"],
        cta: "Explore integrated plans",
        ctaLink: "/services/integrated-healing",
        trust: "Ethical guidelines & protocols",
        icon: (
            <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    },
    {
        title: "Wellness Community",
        subtitle: "Mind, Body, Spirit",
        description: "Share experiences, learn collectively, and grow in wellness together.",
        features: ["Community support", "Learning resources", "Shared growth"],
        cta: "Join the community",
        ctaLink: "/community",
        trust: "Social media integration planned",
        icon: (
            <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
];

export default function ServicesOverview() {
    return (
        <section className="bg-slate-50 py-24 relative overflow-hidden" id="services">
            {/* Soft decorative background blurs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-200/50 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[150px] translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl drop-shadow-sm">What we offer</h2>
                    <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                        Comprehensive healthcare services designed for your holistic well-being. Unmatched care personalized for every stage of your life.
                    </p>
                </div>

                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, idx) => (
                        <div
                            key={service.title}
                            className="group relative flex flex-col overflow-hidden glass-card"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="p-8 flex-1 flex flex-col z-10 relative">
                                <div className="flex items-center gap-x-4 mb-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 shadow-inner ring-1 ring-sky-100 group-hover:scale-110 group-hover:bg-sky-100 transition-all duration-300">
                                        {service.icon}
                                    </div>
                                    <div>
                                        {service.subtitle && <p className="text-xs font-bold uppercase tracking-wider text-sky-600">{service.subtitle}</p>}
                                        {service.badge && (
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 ring-1 ring-inset ring-green-600/20 mt-1">
                                                {service.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-sky-700 transition-colors">{service.title}</h3>
                                {service.tagline && <p className="mt-2 text-sm italic text-slate-500">{service.tagline}</p>}

                                <p className="mt-4 text-base text-slate-600 flex-1 leading-relaxed">{service.description}</p>

                                <ul className="mt-8 space-y-3 text-sm text-slate-600">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <svg className="mr-3 h-5 w-5 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 pt-6 border-t border-slate-200/60">
                                    {service.contact && (
                                        <p className="mb-4 text-sm font-medium text-slate-800 bg-sky-50/50 p-2.5 rounded-lg text-center border border-sky-100">
                                            {service.contact}
                                        </p>
                                    )}
                                    <Link
                                        href={service.ctaLink}
                                        className="block w-full rounded-full bg-slate-900 px-3.5 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-sky-600 hover:shadow-sky-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-all duration-300 transform group-hover:-translate-y-0.5"
                                    >
                                        {service.cta}
                                    </Link>
                                    <p className="mt-4 text-xs font-medium text-center text-slate-400">
                                        {service.trust}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Subtle hover gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/0 via-transparent to-sky-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
