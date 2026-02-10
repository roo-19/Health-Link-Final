
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
        <section className="bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-slate-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-slate-900">Frequently asked questions</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-slate-900/10">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="pt-6">
                                <dt>
                                    <span className="text-base font-semibold leading-7 text-slate-900">{faq.question}</span>
                                </dt>
                                <dd className="mt-2 pr-12">
                                    <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
