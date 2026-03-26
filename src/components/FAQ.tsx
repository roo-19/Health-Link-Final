export default function FAQ() {
    const faqs = [
        {
            question: "Is this an emergency service?",
            answer: "No. Health Link is designed for non-emergency medical consultations and wellness support. In case of a medical emergency, please contact 1990 or your local emergency services immediately.",
        },
        {
            question: "How fast will I get a response?",
            answer: "For on-demand consultations, our goal is to connect you with a clinician within 30 minutes. Response times for specialized services may vary.",
        },
        {
            question: "How do prescriptions work?",
            answer: "Licensed doctors can issue digital prescriptions during your consultation, which can be sent directly to your pharmacy of choice.",
        },
        {
            question: "How is my data protected and where is it stored?",
            answer: "We use banking-grade encryption for all data storage and transmission. Your health records are stored in compliance with local privacy regulations and are only accessible to you and your authorized care providers.",
        },
    ];

    return (
        <section className="bg-slate-50 py-24 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-slate-600">Everything you need to know about how Health Link works.</p>
                    </div>
                    
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="glass border border-slate-200/60 rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/90">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.question}</h3>
                                <p className="text-base text-slate-600 leading-relaxed pr-8">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
