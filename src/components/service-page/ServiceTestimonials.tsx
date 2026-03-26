"use client";

import { ServiceData } from "@/components/servicesData";

interface ServiceTestimonialsProps {
    service: ServiceData;
}

export default function ServiceTestimonials({ service }: ServiceTestimonialsProps) {
    if (!service.testimonials || service.testimonials.length === 0) return null;

    return (
        <section className="bg-slate-50 py-24 lg:py-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white -skew-x-12 translate-x-1/2 pointer-events-none" />
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/50 border border-sky-200 mb-6">
                        <span className="text-xs font-bold uppercase tracking-wide text-sky-700">Real Stories</span>
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Trusted by our patients
                    </h2>
                </div>

                {/* Minimal Grid instead of complex slider to keep it elegant and fast */}
                <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                    {service.testimonials.map((testimonial, idx) => (
                        <div
                            key={idx}
                            className="relative flex flex-col justify-between p-10 glass-card group transition-all duration-500 hover:shadow-2xl hover:shadow-sky-100/40"
                        >
                            <svg className="absolute top-10 left-10 h-10 w-10 text-sky-100 transition-colors duration-500 group-hover:text-sky-200/60" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                            </svg>

                            <blockquote className="relative z-10 mt-8 mb-10 text-xl font-medium text-slate-800 leading-relaxed italic text-balance">
                                "{testimonial.quote}"
                            </blockquote>

                            <div className="relative z-10 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 p-0.5">
                                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-slate-600">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-bold text-slate-900">{testimonial.name}</p>
                                    <p className="text-sm font-medium text-slate-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
