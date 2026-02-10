
import Link from "next/link";
import { ServiceData } from "@/components/servicesData";

interface ServiceDetailPanelProps {
    service: ServiceData;
}

export default function ServiceDetailPanel({ service }: ServiceDetailPanelProps) {
    // Neutral/Professional Theme Logic
    // Most items use Brand Sky/Blue. 
    // Exceptions: "Free" badges use Emerald.

    return (
        <div
            id={service.id}
            className="scroll-mt-32 relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg group"
        >
            {/* Top Accent Bar (Consistent Brand Color) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300" />

            <div className="relative z-10 flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-6">
                    <div className="flex flex-wrap items-center gap-2">
                        {service.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium border ${tag.toLowerCase().includes("free")
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                        : "bg-sky-50 text-sky-700 border-sky-100"
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                        {service.badge && (
                            <span className="inline-flex items-center rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                                {service.badge}
                            </span>
                        )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            {service.subtitle && <p className="text-sm font-semibold text-sky-600 mb-1">{service.subtitle}</p>}
                            <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                        </div>
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                            {service.icon}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                    <div className="prose prose-slate prose-sm max-w-none">
                        <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line">{service.intro}</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <ul className="space-y-2">
                            <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Features</h4>
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-start text-sm text-slate-600">
                                    <svg className="mr-2 h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {service.subFeatures && (
                            <ul className="space-y-2">
                                <h4 className="text-sm font-semibold text-slate-900 mb-2">{service.subFeatures.title}</h4>
                                {service.subFeatures.items.map((item) => (
                                    <li key={item} className="flex items-start text-sm text-slate-600">
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-sky-400 flex-shrink-0 mt-1.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Callout Box */}
                {service.callout && (
                    <div className="mt-2 rounded-lg bg-slate-50 p-4 border border-slate-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="text-sm font-medium text-slate-700">
                                {service.callout.phone && (
                                    <div className="flex items-center gap-2 mb-1">
                                        <svg className="h-4 w-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>{service.callout.phone}</span>
                                    </div>
                                )}
                                {service.callout.note && <span>{service.callout.note}</span>}
                            </div>
                            {service.callout.link && (
                                <span className="text-sm font-semibold text-sky-600">{service.callout.link}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Footer / CTA */}
                <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href={service.ctaLink}
                        className="w-full sm:w-auto rounded-full px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors bg-sky-600 hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                    >
                        {service.cta}
                    </Link>
                    <p className="text-xs text-slate-400 text-center sm:text-right font-medium">
                        {service.trust}
                    </p>
                </div>
            </div>
        </div>
    );
}
