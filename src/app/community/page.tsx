import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData } from "@/components/servicesData";

// Custom Community Components
import { 
    CommunityHero, 
    ExperienceSharing, 
    MediaHub, 
    ExpertHub, 
    PracticalLibrary, 
    InteractiveCommunity 
} from "@/components/community/WellnessCommunityComponents";

export default function CommunityPage() {
    const service = servicesData.find((s) => s.id === "community");

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />

            {/* Unique Wellness Community Layout */}
            <CommunityHero />
            
            <ExperienceSharing />
            
            <MediaHub />
            
            <ExpertHub />
            
            <PracticalLibrary />
            
            <InteractiveCommunity />

            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="p-12 rounded-[40px] bg-slate-50 border border-slate-200">
                        <h3 className="text-3xl font-black text-slate-900 mb-6">Important Community Guidelines</h3>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-4">To ensure a safe and supportive environment for all members, we adhere to strict clinical and community standards.</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold">01.</span>
                                    <span>No medical misinformation or dangerous clinical advice.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold">02.</span>
                                    <span>Respect for all faith-based and spiritual practices.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold">03.</span>
                                    <span>Strict policies against "wellness shaming" or bullying.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold">04.</span>
                                    <span>Credential verification for all participating experts.</span>
                                </li>
                            </ul>
                            <div className="mt-10 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 italic text-indigo-700 font-medium">
                                "The goal is to build a trusted community, not just an audience. Educate, Empower, Encourage."
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
