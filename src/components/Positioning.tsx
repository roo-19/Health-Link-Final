export default function Positioning() {
    return (
        <section className="bg-slate-50 py-20 sm:py-32 relative overflow-hidden">
            {/* Soft decorative blur */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-sky-200 rounded-full blur-[120px] opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[120px] opacity-30 pointer-events-none" />
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
                <div className="mx-auto max-w-4xl text-center space-y-8">
                    <div className="inline-block relative">
                        <span className="absolute -inset-1 block bg-gradient-to-r from-sky-300 to-indigo-300 blur-2xl opacity-40 rounded-3xl"></span>
                        <h2 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                            Sri Lanka's Pioneer in<br/>
                            <span className="text-gradient">Personalized Holistic Care.</span>
                        </h2>
                    </div>
                    
                    <div className="mx-auto w-24 h-1.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full shadow-sm" />
                    
                    <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        Integrating <span className="font-semibold text-slate-900">Round-the-Clock On-Demand Care</span> with <span className="font-semibold text-slate-900">Holistic Wellness</span> for Comprehensive <span className="font-semibold text-slate-900">Health Solutions.</span>
                    </h3>
                </div>
            </div>
        </section>
    );
}
