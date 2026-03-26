import React from 'react';
import Image from 'next/image';

// --- Hero Component ---
export const CommunityHero = () => (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
            src="/images/community/hero2.png"
            alt="Wellness Community"
            fill
            className="object-cover brightness-[0.7]"
            priority
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
                Join Our Wellness Community
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-medium drop-shadow-lg">
                Share, Grow, and Thrive Together. This is the new home for experience sharing in health, wellness, spirituality, and bliss.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
                    Share Your Journey
                </button>
                <button className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 rounded-full font-bold text-lg transition-all transform hover:scale-105">
                    Explore Stories
                </button>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </section>
);

// --- Experience Sharing / Vlog Grid ---
export const ExperienceSharing = () => (
    <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-indigo-600 font-bold tracking-wider uppercase mb-3">Authentic Experiences</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-display">#WellnessCheck Micro-Vlogs</h3>
                    <p className="text-lg text-slate-600">Raw, real, and relatable stories from people just like you. No filters, just growth.</p>
                </div>
                <div className="flex gap-4">
                    <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold border border-indigo-100 italic">#Anxiety</span>
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 italic">#YogaFlow</span>
                    <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100 italic">#HealthyEats</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                        src="/images/community/vlogs.png"
                        alt="Wellness Vlogs Mockup"
                        width={800}
                        height={1000}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent flex flex-col justify-end p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                                <div className="w-full h-full bg-slate-300 flex items-center justify-center text-white font-bold">JD</div>
                            </div>
                            <div className="text-white">
                                <p className="font-bold">Journey Tracker</p>
                                <p className="text-xs opacity-80">Day 45: Mindfulness Streak</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">Journey Tracking</h4>
                        </div>
                        <p className="text-slate-600 leading-relaxed">Stay motivated with a structured timeline of your progress. Post updates on goals like #Sober30 or #StrengthGains and receive community support every step of the way.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900">Vibe-Based Discovery</h4>
                        </div>
                        <p className="text-slate-600 leading-relaxed">Browse by mood and intention. Whether you need #GentleHealing or #HighEnergy, find content that matches your current state of being.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- Media Hub (Podcasts, YouTube, etc.) ---
export const MediaHub = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h3 className="text-4xl font-black text-slate-900 mb-4">Voices of Wellness</h3>
                <p className="text-slate-600 max-w-2xl mx-auto">Explore curated content from our community of experts, creators, and survivors.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { title: "Testimonial Videos", icon: "🎬", count: "140+" },
                    { title: "Wellness Podcasts", icon: "🎙️", count: "50+ hrs" },
                    { title: "YouTube Creators", icon: "▶️", count: "12 Channels" },
                    { title: "TikTok Spotlights", icon: "📱", count: "Daily" }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-3xl text-center hover:bg-indigo-50 transition-colors group">
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                        <h5 className="font-bold text-slate-900 mb-2">{item.title}</h5>
                        <p className="text-sm font-bold text-indigo-600">{item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// --- Expert & Educational Hub ---
export const ExpertHub = () => (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-6">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                        Expert-Led Knowledge
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Foundational Wisdom & Clinical Insight</h3>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed">Establish your journey on a credible foundation. Access deep-dives into neuroscience, mindfulness studies, and evidence-based wellness guides curated by certified professionals.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            "Expert-Driven Articles",
                            "Myth-Busting Explainers",
                            "Condition Support",
                            "AMAs with MDs/RDs"
                        ].map((feat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-bold text-slate-100">{feat}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-md aspect-square bg-indigo-600/10 rounded-[60px] border border-white/10 flex items-center justify-center group overflow-hidden">
                        <Image
                            src="/images/community/interaction.png"
                            alt="Community Interaction Illustration"
                            width={500}
                            height={500}
                            className="w-4/5 h-4/5 object-contain"
                        />
                        <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- Practical Hub (Recipes/Routines) ---
export const PracticalLibrary = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center mb-16">
                <h3 className="text-4xl font-black text-slate-900 mb-4">Actionable & Practical</h3>
                <p className="text-slate-600 max-w-2xl font-medium italic">Tools you can use right now to evolve intentionally.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-emerald-50 p-10 rounded-[40px] border border-emerald-100 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-600 shadow-sm mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4">Recipe & Routine Templates</h4>
                    <p className="text-slate-600 mb-6">Save and try full-day eating plans or morning rituals shared by our members.</p>
                    <button className="text-emerald-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Browse Library
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                <div className="bg-indigo-50 p-10 rounded-[40px] border border-indigo-100 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-indigo-600 shadow-sm mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4">Guided Practices</h4>
                    <p className="text-slate-600 mb-6">Short (5-10m) audio and video guides for meditation, breathwork, and desk yoga.</p>
                    <button className="text-indigo-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Start Practicing
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                <div className="bg-rose-50 p-10 rounded-[40px] border border-rose-100 hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-rose-600 shadow-sm mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4">Printable Resources</h4>
                    <p className="text-slate-600 mb-6">Grocery lists, journaling prompts, and workout checklists to take with you offline.</p>
                    <button className="text-rose-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Download PDF
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
);

// --- Interactive & Global Reach ---
export const InteractiveCommunity = () => (
    <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="bg-indigo-600 rounded-[50px] p-12 md:p-20 flex flex-col items-center text-center text-white overflow-hidden relative shadow-3xl">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
                </div>
                <div className="relative z-10 max-w-4xl">
                    <h3 className="text-4xl md:text-6xl font-black mb-8">Share your story. Find your tribe. Grow Together.</h3>
                    <p className="text-xl text-white/80 mb-12">Connect in a dedicated space that values holistic health—mind, body, and spirit. React with meaning (💪 🤗 🙏) and engage without shaming.</p>

                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20">
                            <p className="text-3xl font-black mb-1">Polls & Quizzes</p>
                            <p className="text-sm opacity-60">Daily Engagement</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20">
                            <p className="text-3xl font-black mb-1">Live AMAs</p>
                            <p className="text-sm opacity-60">Interactive Experts</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20">
                            <p className="text-3xl font-black mb-1">Safety Badge</p>
                            <p className="text-sm opacity-60">Verified Credentials</p>
                        </div>
                    </div>

                    <button className="px-12 py-5 bg-white text-indigo-700 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                        Start Exploring Now
                    </button>
                </div>
            </div>
        </div>
    </section>
);
