
import { servicesData } from "@/components/servicesData";
import ServiceDetailPanel from "@/components/ServiceDetailPanel";

export default function ServicesDetails() {
    return (
        <section className="bg-slate-50 py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-12">
                    {servicesData.map((service, index) => (
                        <div key={service.id}>
                            <ServiceDetailPanel service={service} />
                            {/* Visual Divider between panels (except last one) */}
                            {index < servicesData.length - 1 && (
                                <div className="flex justify-center py-12">
                                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
