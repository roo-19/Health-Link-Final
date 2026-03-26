import { ServiceData } from "@/components/servicesData";

interface ServiceFeaturesProps {
    service: ServiceData;
}

export default function ServiceFeatures({ service }: ServiceFeaturesProps) {
    if (!service.richFeatures || service.richFeatures.length === 0) return null;

    return (
        <section id="features" className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
            {/* Background glowing accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-200/50 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/50 border border-sky-200 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wide text-sky-700">Premium Features</span>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        {service.featuresTitle || "Why we are unique."}
                    </h2>
                    {service.featuresSubtitle && (
                        <p className="mt-4 text-xl text-slate-600 leading-relaxed font-light">
                            {service.featuresSubtitle}
                        </p>
                    )}
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {service.richFeatures.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col sm:flex-row gap-6 p-8 glass-card border border-white"
                        >
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shadow-inner ring-1 ring-sky-100 group-hover:bg-sky-100 group-hover:scale-110 transition-all duration-300">
                                {/* Generic Star/Sparkle icon for premium feel */}
                                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">{feature.title}</h3>
                                <div className="text-base text-slate-600 leading-relaxed">
                                    {feature.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
