import { ServiceData } from "@/components/servicesData";

interface ServiceHowItWorksProps {
    service: ServiceData;
}

export default function ServiceHowItWorks({ service }: ServiceHowItWorksProps) {
    if (!service.howItWorks || service.howItWorks.length === 0) return null;

    return (
        <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
            {/* Soft decorative background blurs */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-100/40 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-slate-100/50 rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">The Process</span>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl text-balance">
                        How it works
                    </h2>
                    <p className="mt-6 text-lg text-slate-600">
                        A seamless, supportive journey designed around you.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line for desktop with gradient */}
                    <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent pointer-events-none" />

                    <div className="grid gap-12 lg:gap-8 lg:grid-cols-3 relative z-10">
                        {service.howItWorks.map((step, idx) => (
                            <div
                                key={idx}
                                className="group relative flex flex-col items-center text-center p-8 lg:p-10 glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-100/50"
                            >
                                {/* Floating Circle Number Badge */}
                                <div className="flex -mt-16 mb-8 h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-black text-sky-600 shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-sky-200 transition-all duration-300 transform group-hover:-rotate-3">
                                    {idx + 1}
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-base text-slate-600 leading-relaxed text-balance">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
