import React from 'react';
import Image from 'next/image';

// --- Hero Component ---
export const CommunityHero = () => (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <Image
            src="/images/community/hero2.png"
            alt="Wellness Community"
            fill
            className="object-cover brightness-[0.65] opacity-75"
            priority
        />
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/15 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Fine grid pattern watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

        <div className="container mx-auto px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl font-serif tracking-tight">
                Join Our Wellness Community
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 font-light drop-shadow-md">
                Share, Grow, and Thrive Together. This is the new home for experience sharing in health, wellness, spirituality, and bliss.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-secondary hover:bg-secondary/90 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-secondary/25 cursor-pointer w-full sm:w-auto">
                    Share Your Journey
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full font-bold text-lg transition-all transform hover:scale-105 cursor-pointer w-full sm:w-auto">
                    Explore Stories
                </button>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
);

// --- Experience Sharing / Vlog Grid ---
export const ExperienceSharing = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-8 sm:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-secondary font-bold tracking-wider uppercase mb-3 text-xs sm:text-sm">Authentic Experiences</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">#WellnessCheck Micro-Vlogs</h3>
                    <p className="text-lg text-slate-600 font-light leading-relaxed">Raw, real, and relatable stories from people just like you. No filters, just growth.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-accent text-secondary rounded-full text-sm font-bold border border-secondary/10 italic">#Anxiety</span>
                    <span className="px-4 py-2 bg-accent text-secondary rounded-full text-sm font-bold border border-secondary/10 italic">#YogaFlow</span>
                    <span className="px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-bold border border-primary/10 italic">#HealthyEats</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                    <Image
                        src="/images/community/vlogs.png"
                        alt="Wellness Vlogs Mockup"
                        width={800}
                        height={1000}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent flex flex-col justify-end p-8">
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
                    <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-lg border border-slate-200/40 hover:shadow-xl transition-shadow group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-secondary">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-primary">Journey Tracking</h4>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-light">Stay motivated with a structured timeline of your progress. Post updates on goals like #Sober30 or #StrengthGains and receive community support every step of the way.</p>
                    </div>

                    <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-lg border border-slate-200/40 hover:shadow-xl transition-shadow group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-primary">Vibe-Based Discovery</h4>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-light">Browse by mood and intention. Whether you need #GentleHealing or #HighEnergy, find content that matches your current state of being.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- Media Hub (Podcasts, YouTube, etc.) ---
export const MediaHub = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-8 sm:px-12 lg:px-16">
            <div className="text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">Community voices</span>
                <h3 className="text-4xl font-extrabold text-primary mb-4">Voices of Wellness</h3>
                <p className="text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">Explore curated content from our community of experts, creators, and survivors.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { title: "Testimonial Videos", icon: "🎬", count: "140+" },
                    { title: "Wellness Podcasts", icon: "🎙️", count: "50+ hrs" },
                    { title: "YouTube Creators", icon: "▶️", count: "12 Channels" },
                    { title: "TikTok Spotlights", icon: "📱", count: "Daily" }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-[2rem] text-center border border-transparent hover:border-secondary/15 hover:bg-accent/40 transition-all duration-300 group">
                        <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">{item.icon}</div>
                        <h5 className="font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h5>
                        <p className="text-sm font-bold text-secondary">{item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


// --- Practical Hub (Recipes/Routines) ---
export const PracticalLibrary = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-8 sm:px-12 lg:px-16">
            <div className="flex flex-col items-center text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">Actionable library</span>
                <h3 className="text-4xl font-extrabold text-primary mb-4">Daily Wellness Toolkits</h3>
                <p className="text-slate-600 max-w-2xl font-light leading-relaxed">Tools you can use right now to evolve intentionally and integrate health habits into your day.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-secondary/15 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
                    <div className="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-secondary shadow-sm mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-primary mb-4">Recipes & Routines</h4>
                    <p className="text-slate-600 mb-6 font-light leading-relaxed">Save and try full-day eating plans or morning rituals shared by our clinical and culinary members.</p>
                    <button className="text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                        Browse Library
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-primary/10 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary shadow-sm mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-primary mb-4">Guided Practices</h4>
                    <p className="text-slate-600 mb-6 font-light leading-relaxed">Short audio and video guides for mindfulness meditation, breathwork, and desk-yoga flows.</p>
                    <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                        Start Practicing
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-secondary/15 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
                    <div className="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-secondary shadow-sm mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-primary mb-4">Printable Resources</h4>
                    <p className="text-slate-600 mb-6 font-light leading-relaxed">Grocery planners, daily journaling prompts, and hydration checklists to take with you offline.</p>
                    <button className="text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
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
    <section className="py-24 bg-background">
        <div className="container mx-auto px-8 sm:px-12 lg:px-16">
            <div className="bg-primary rounded-[3rem] sm:rounded-[4.5rem] p-12 md:p-20 flex flex-col items-center text-center text-white overflow-hidden relative shadow-3xl">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
                    {/* Concentric vector circles */}
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] pointer-events-none" />
                </div>
                <div className="relative z-10 max-w-4xl">
                    <h3 className="text-4xl md:text-6xl font-extrabold mb-8 font-serif leading-tight">Share your story. Find your tribe. Grow Together.</h3>
                    <p className="text-xl text-slate-200 mb-12 font-light leading-relaxed">Connect in a dedicated space that values holistic health—mind, body, and spirit. React with meaning (💪 🤗 🙏) and engage with supportive members.</p>

                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20">
                            <p className="text-3xl font-black mb-1">Polls & Quizzes</p>
                            <p className="text-sm opacity-60 font-semibold">Daily Engagement</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20">
                            <p className="text-3xl font-black mb-1">Live AMAs</p>
                            <p className="text-sm opacity-60 font-semibold">Interactive Experts</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/20">
                            <p className="text-3xl font-black mb-1">Safety Badge</p>
                            <p className="text-sm opacity-60 font-semibold">Verified Credentials</p>
                        </div>
                    </div>

                    <button className="px-12 py-5 bg-white text-primary rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-primary/30 cursor-pointer">
                        Start Exploring Now
                    </button>
                </div>
            </div>
        </div>
    </section>
);
