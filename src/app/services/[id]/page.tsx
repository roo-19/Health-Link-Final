import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Premium Service Components
import ServiceHero from "@/components/ServiceHero";
import ServiceTrustStrip from "@/components/service-page/ServiceTrustStrip";
import ServiceHowItWorks from "@/components/service-page/ServiceHowItWorks";
import ServiceFeatures from "@/components/service-page/ServiceFeatures";
import ServiceBenefits from "@/components/service-page/ServiceBenefits";
import ServiceTestimonials from "@/components/service-page/ServiceTestimonials";
import ServiceFinalCTA from "@/components/service-page/ServiceFinalCTA";

import { servicesData } from "@/components/servicesData";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Generate static params 
export async function generateStaticParams() {
    return servicesData.map((service) => ({
        id: service.id,
    }));
}

export default async function ServicePage({ params }: PageProps) {
    const resolvedParams = await params;

    // We filter out 'community' which has its own hardcoded route just to be safe,
    // though the dynamic router technically handles it if it's in the data.
    const service = servicesData.find((s) => s.id === resolvedParams.id && s.id !== 'community');

    if (!service) {
        notFound();
    }

    let heroImagePath = `/hero_${service.id.replace("-", "_")}.png`;
    let benefitsImagePath = `/benefits_${service.id.replace("-", "_")}.png`;

    if (service.id === "telemedicine") {
        heroImagePath = "/telemedicinehero.png";
        benefitsImagePath = "/benefits_telemedicine2.png";
    }

    if (service.id === "spiritual-care") {
        heroImagePath = "/herospiritualcare.png";
        benefitsImagePath = "/herospirituahealing.png";
    }

    if (service.id === "psychology") {
        heroImagePath = "/hero_serene_counseling.png";
        benefitsImagePath = "/benefits_serene_counseling.png";
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <ServiceHero
                service={service}
                imageSrc={heroImagePath}
            />

            <ServiceTrustStrip service={service} />
            <ServiceHowItWorks service={service} />
            <ServiceFeatures service={service} />
            <ServiceBenefits service={service} imageSrc={benefitsImagePath} />
            <ServiceTestimonials service={service} />
            <ServiceFinalCTA service={service} />

            <Footer />
        </main>
    );
}
