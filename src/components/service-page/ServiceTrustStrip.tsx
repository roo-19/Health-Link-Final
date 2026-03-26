import { ServiceData } from "@/components/servicesData";

interface ServiceTrustStripProps {
    service: ServiceData;
}

export default function ServiceTrustStrip({ service }: ServiceTrustStripProps) {
    if (!service.trustStrip) return null;

    const items = [
        service.trustStrip.text1,
        service.trustStrip.text2,
        service.trustStrip.text3,
        service.trustStrip.text4,
    ];

    return (
        <section className="bg-white border-y border-slate-100 py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between text-sm font-semibold text-slate-500 uppercase tracking-widest">
                    {items.map((text, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
