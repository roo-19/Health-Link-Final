import { ReactNode } from "react";

export interface ServiceData {
    id: string;
    title: string;
    subtitle?: string;
    navTitle: string;
    tag: string; // Nav tag
    tags: string[]; // Panel top pills
    microText: string;
    intro: string | ReactNode; // Longer intro text
    description?: string; // Optional legacy description, prefer intro
    features: string[]; // Legacy simple features
    subFeatures?: { title: string; items: string[] }; // Optional sub-section
    cta: string;
    ctaIcon?: ReactNode;
    ctaLink: string;
    detailLink: string;
    trust: string;
    badge?: string;
    callout?: {
        text?: string;
        phone?: string;
        note?: string;
        link?: string;
    };
    // --- Custom Section Overrides ---
    featuresTitle?: string;
    featuresSubtitle?: string;
    finalCtaTitle?: string;
    finalCtaDescription?: ReactNode;
    icon: ReactNode;
    image: string;
    theme: "blue" | "emerald" | "violet" | "rose" | "amber" | "indigo";

    // --- New Premium Service Page Data ---
    trustStrip: {
        text1: string;
        text2: string;
        text3: string;
        text4: string;
    };
    howItWorks: {
        title: string;
        description: string;
    }[]; // Exactly 3 items
    richFeatures: {
        title: string;
        description: string | ReactNode;
        // SVG paths or icon names can go here if we want varied icons, but we'll use a generic premium dot or line icon for now
    }[];
    benefits: string[];
    testimonials: {
        quote: string;
        name: string;
        title: string;
    }[];
}

export const servicesData: ServiceData[] = [
    {
        id: "telemedicine",
        title: "24/7 On demand – Tele medical consulting service",
        subtitle: "(western medicine), referral service, prescription writing",
        navTitle: "Telemedicine",
        tag: "Consult",
        tags: ["Western Medicine", "24/7", "Tourist-friendly"],
        theme: "blue",
        microText: "Instant video consults, referrals & prescriptions.",
        intro: "Instant access to licensed doctors for consultations, referrals, and prescriptions wherever you are (home or hotel).",
        features: ["On-demand doctor consultations (video/online)", "Referral service when needed", "Prescription writing (where appropriate)"],
        callout: {
            note: "Doctor onboarding follows platform agreements.",
        },
        cta: "Talk to your doctor now",
        ctaIcon: (
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        ctaLink: "/services/telemedicine/register",
        detailLink: "/services/telemedicine",
        trust: "Licensed doctors • Secure portal • Encrypted by default",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        image: "/images/nav/telemedicine.png",

        // --- Premium Content ---
        trustStrip: {
            text1: "Licensed Doctors",
            text2: "100% Data Privacy",
            text3: "24/7 Availability",
            text4: "Instant Prescriptions"
        },
        howItWorks: [
            {
                title: "Register Seamlessly",
                description: "Create your secure profile in minutes from any device."
            },
            {
                title: "Connect Instantly",
                description: "Join a high-definition video call with a licensed doctor."
            },
            {
                title: "Get Treated",
                description: "Receive your e-diagnosis, referrals, and digital prescriptions."
            }
        ],
        richFeatures: [
            {
                title: "On-Demand Access",
                description: "Skip the waiting room. Speak to a doctor within minutes, day or night."
            },
            {
                title: "Digital Prescriptions",
                description: "Secure, electronic prescriptions sent directly to your preferred pharmacy."
            },
            {
                title: "Specialist Referrals",
                description: "Seamless transitions to our network of top-rated specialists when needed."
            },
            {
                title: "Secure Health Records",
                description: "Your consultation history is safely stored in our encrypted portal."
            }
        ],
        benefits: [
            "Immediate peace of mind without leaving home",
            "Avoid exposure to waiting room illnesses",
            "Perfect for busy professionals and travelers",
            "Continuous access to your medical history"
        ],
        testimonials: [
            {
                quote: "I was feeling terrible in my hotel room at 2 AM. Within 10 minutes, I was on a video call with a doctor who prescribed exactly what I needed.",
                name: "Sarah Jenkins",
                title: "Traveler"
            },
            {
                quote: "The interface is beautiful and so easy to use. It felt like walking into a high-end clinic, but from my living room couch.",
                name: "Michael Chen",
                title: "Software Engineer"
            }
        ]
    },
    {
        id: "home-care",
        title: "AyuCare: Compassionate Home Care in Sri Lanka",
        subtitle: "coordinating and arranging home care services for Sri Lankans",
        navTitle: "Home Care",
        tag: "Care",
        tags: ["Sri Lanka", "Home Care", "Sinhala | Tamil | English"],
        theme: "emerald",
        microText: "Nursing, elder companionship & daily support.",
        intro: "Bringing quality care to your doorstep. We provide trusted nursing, elder companionship, and daily support, all in the comfort of home. Our trained, compassionate caregivers offer personalized care with respect and warmth, tailored to Sri Lankan family values.\n\nLet us help your loved ones live safely and independently at home.",
        features: ["Trusted nursing support", "Elder companionship", "Daily support for routines"],
        subFeatures: {
            title: "HealthLink Certified Caregivers (Standards & Training)",
            items: [
                "CPR training",
                "Food handler’s certification",
                "Cultural training",
                "HealthLink Certified status",
                "Partnerships: accreditation bodies & mutual agreements",
                "Training & recruitment pathway"
            ]
        },
        callout: {
            phone: "+94 76 251 5494",
            note: "Languages: Sinhala | Tamil | English"
        },
        cta: "Request home care",
        ctaIcon: (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 2.016c-5.509 0-9.984 4.475-9.984 9.985 0 1.758.455 3.473 1.32 4.99L2 22l5.12-1.343a9.92 9.92 0 004.911 1.297h.003c5.508 0 9.983-4.475 9.983-9.986s-4.475-9.953-9.983-9.953zm5.49 14.331c-.244.686-1.41 1.343-1.956 1.408-.519.062-1.129.13-3.218-.737-2.515-1.042-4.144-3.612-4.269-3.778-.125-.165-1.018-1.353-1.018-2.583 0-1.23.639-1.834.869-2.083.23-.249.502-.311.668-.311.166 0 .332-.005.476 0 .151.005.356-.057.545.4.195.466.666 1.625.726 1.748.06.124.1.269.015.435-.085.166-.13.269-.255.414-.125.145-.264.316-.381.435-.13.13-.266.273-.11.543.155.269.691 1.143 1.484 1.848.97.863 1.815 1.134 2.08 1.258.265.124.42.103.575-.072.155-.175.666-.775.845-1.04.18-.264.36-.217.595-.134.235.083 1.483.7 1.737.825.254.124.425.186.485.29.06.104.06.605-.184 1.291z" />
            </svg>
        ),
        ctaLink: "https://wa.me/94762515494",
        detailLink: "/services/home-care",
        trust: "Certified caregivers • Compassionate support",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        image: "/images/nav/home-care.png",

        // --- Premium Content ---
        trustStrip: {
            text1: "Vetted & Certified",
            text2: "Culturally Aligned",
            text3: "Trilingual Support",
            text4: "Continuous Care"
        },
        howItWorks: [
            {
                title: "Initial Assessment",
                description: "We evaluate your loved one's specific needs and living environment."
            },
            {
                title: "Caregiver Matching",
                description: "We pair you with a certified professional who fits your family values."
            },
            {
                title: "Ongoing Support",
                description: "Receive compassionate daily care with regular check-ins."
            }
        ],
        richFeatures: [
            {
                title: "Skilled Nursing",
                description: "Professional medical support, vital monitoring, and medication management at home."
            },
            {
                title: "Elder Companionship",
                description: "Warm, respectful social interaction to prevent isolation and enrich daily life."
            },
            {
                title: "Daily Routine Assistance",
                description: "Help with mobility, hygiene, and personalized meal preparation."
            },
            {
                title: "Emergency Readiness",
                description: "All caregivers are CPR-trained and equipped for rapid response."
            }
        ],
        benefits: [
            "Maintain dignity and independence at home",
            "Relieve pressure on family members",
            "Care aligned with Sri Lankan cultural expectations",
            "Clear communication in Sinhala, Tamil, or English"
        ],
        testimonials: [
            {
                quote: "The nurse from HealthLink didn't just provide medical care; she became a part of our family. The respect she showed my mother was beautiful.",
                name: "Rohan Fernando",
                title: "Family Member"
            },
            {
                quote: "Knowing my father was in safe, certified hands while I was at work gave me my life back.",
                name: "Amina Hussein",
                title: "Daughter"
            }
        ]
    },
    {
        id: "spiritual-care",
        title: "Sacred Space Sri Lanka: Integrated Spiritual Care & Healing",
        subtitle: "Integrated Spiritual Care & Healing",
        navTitle: "Spiritual Healing",
        tag: "Spirit",
        tags: ["Integrated Spiritual Care", "Multifaith", "Free of charge"],
        theme: "violet",
        microText: "Multifaith counseling, rituals, grief support.",
        badge: "You can experience this service Free of Charge",
        intro: (
            <div className="flex flex-col gap-4">
                <div className="italic text-2xl font-semibold text-[#B8860B] drop-shadow-sm">
                    &quot;Guided by Faith, Supported by Care, United in Spirit.&quot;
                </div>
                <div className="text-slate-900 font-medium text-lg leading-relaxed">
                    <span className="font-extrabold text-slate-900 border-b-2 border-violet-200">Sacred Space Sri Lanka:</span> a welcoming multifaith sanctuary honoring Buddhism, Hinduism, Islam, and Christianity. We blend universal spiritual healing with compassionate multifaith chaplaincy to offer a safe, respectful, and inclusive space for people of all beliefs to find solace, strengthen their faith, and build spiritual resilience through life&apos;s challenges.
                </div>
            </div>
        ),
        features: ["Social/Spiritual Healing Practices", "Confidential spiritual counseling", "Faith-specific ritual & prayer support", "Crisis & grief support", "Ethical & discernment guidance"],
        subFeatures: {
            title: "Services (Online & On-site)",
            items: [
                "Guided interfaith meditation & mindfulness",
                "One-on-one spiritual counseling",
                "Energy healing for balance",
                "Faith-consistent end-of-life care",
                "Ritual & prayer guidance"
            ]
        },
        callout: {
            phone: "+94762515494",
            note: "Services available in Sinhala | Tamil | English"
        },
        cta: "Send Your Inquiry Now",
        ctaIcon: (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 2.016c-5.509 0-9.984 4.475-9.984 9.985 0 1.758.455 3.473 1.32 4.99L2 22l5.12-1.343a9.92 9.92 0 004.911 1.297h.003c5.508 0 9.983-4.475 9.983-9.986s-4.475-9.953-9.983-9.953zm5.49 14.331c-.244.686-1.41 1.343-1.956 1.408-.519.062-1.129.13-3.218-.737-2.515-1.042-4.144-3.612-4.269-3.778-.125-.165-1.018-1.353-1.018-2.583 0-1.23.639-1.834.869-2.083.23-.249.502-.311.668-.311.166 0 .332-.005.476 0 .151.005.356-.057.545.4.195.466.666 1.625.726 1.748.06.124.1.269.015.435-.085.166-.13.269-.255.414-.125.145-.264.316-.381.435-.13.13-.266.273-.11.543.155.269.691 1.143 1.484 1.848.97.863 1.815 1.134 2.08 1.258.265.124.42.103.575-.072.155-.175.666-.775.845-1.04.18-.264.36-.217.595-.134.235.083 1.483.7 1.737.825.254.124.425.186.485.29.06.104.06.605-.184 1.291z" />
            </svg>
        ),
        ctaLink: "https://wa.me/94762515494",
        detailLink: "/services/spiritual-care",
        trust: "Free of charge • Multifaith • Confidential",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        image: "/images/nav/spiritual-care.png",

        // --- Custom Section Overrides ---
        featuresTitle: "Our Integrated Approach: Healing & Chaplaincy",
        featuresSubtitle: "We offer a unique blend of holistic spiritual practices and professional faith-based support:",
        finalCtaTitle: "You do not have to walk your path alone.",
        finalCtaDescription: (
            <>
                <p className="mb-8 font-medium text-slate-100/90">Whether you seek comfort in familiar rituals, are navigating a personal crisis, or wish to deepen your spiritual practice, our integrated approach honors your journey.</p>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <p className="font-bold text-white text-lg mb-2 underline decoration-violet-400 decoration-2 underline-offset-4">Connect with an understanding chaplain or healer today.</p>
                    <p className="text-white font-medium">Schedule a confidential consultation:</p>
                </div>
            </>
        ),

        // --- Premium Content ---
        trustStrip: {
            text1: "Multifaith Support",
            text2: "100% Confidential",
            text3: "Trained Chaplains",
            text4: "Free of Charge"
        },
        howItWorks: [
            {
                title: "Reach Out",
                description: "Request a session through our secure portal or call our dedicated line."
            },
            {
                title: "Find Your Guide",
                description: "Connect with a spiritual counselor who understands your specific faith background."
            },
            {
                title: "Begin Healing",
                description: "Engage in guided practices, rituals, or simply find a safe space to be heard."
            }
        ],
        richFeatures: [
            {
                title: "Spiritual Healing Practices",
                description: (
                    <>
                        <p className="mb-6">Focused on energy, mindfulness, and universal life force to restore inner balance and peace, respecting all paths to the divine.</p>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">A</div>
                                <div>
                                    <strong className="block text-slate-800">Energy Balancing & Flow</strong>
                                    <span className="text-sm">Harmonizing the body&apos;s natural life force for physical and emotional well-being.</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">B</div>
                                <div>
                                    <strong className="block text-slate-800">Mindfulness & Meditation</strong>
                                    <span className="text-sm">Guided sessions to foster presence, reduce stress, and cultivate inner peace.</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">C</div>
                                <div>
                                    <strong className="block text-slate-800">Universal Peace Rituals</strong>
                                    <span className="text-sm">Shared practices that honor multiple traditions to restore collective harmony.</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">D</div>
                                <div>
                                    <strong className="block text-slate-800">Holistic Inner Harmony</strong>
                                    <span className="text-sm">Integrating mind, body, and spirit to build resilience and deep spiritual connection.</span>
                                </div>
                            </div>
                        </div>
                    </>
                )
            },
            {
                title: "Multifaith Chaplaincy Services",
                description: (
                    <>
                        <p className="mb-4">Provided by chaplains trained in the doctrines, rituals, and pastoral care practices of Sri Lanka’s major religions. They offer:</p>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">1</div>
                                <div>
                                    <strong className="block text-slate-800">Confidential Spiritual Counseling</strong>
                                    <span className="text-sm">Discuss life challenges, moral dilemmas, grief, and stress through the lens of your own faith tradition.</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">2</div>
                                <div>
                                    <strong className="block text-slate-800">Faith-Specific Ritual & Prayer Support</strong>
                                    <span className="text-sm">Access guidance, prayers (Pirith, Arulvakku, Du'a, pastoral prayer), or scriptural reading tailored to your beliefs.</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">3</div>
                                <div>
                                    <strong className="block text-slate-800">Crisis & Grief Support</strong>
                                    <span className="text-sm">Compassionate, presence-based support during times of illness, loss, or existential distress, anchored in your spiritual worldview.</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">4</div>
                                <div>
                                    <strong className="block text-slate-800">Ethical & Discernment Guidance</strong>
                                    <span className="text-sm">Help in making difficult decisions in alignment with your religious values and conscience.</span>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        ],
        benefits: [
            "A safe sanctuary free from judgment",
            "Reconnection with your spiritual foundation",
            "Clarity during complex ethical decisions",
            "Support that transcends physical medicine"
        ],
        testimonials: [
            {
                quote: "After my loss, I felt entirely adrift. The counselor didn't offer empty platitudes; they offered profound presence and guided me back to my faith.",
                name: "Anonymous",
                title: "Community Member"
            },
            {
                quote: "A truly beautiful integration of the spiritual traditions that make Sri Lanka unique. A quiet, holding space.",
                name: "Priyanga D.",
                title: "Teacher"
            }
        ]
    },
    {
        id: "psychology",
        title: "Serene Counseling",
        subtitle: "Where Healing Begins and Hope Grows",
        navTitle: "Serene Counseling",
        tag: "Mind",
        tags: ["Psychotherapy", "Confidential", "Evidence-based"],
        theme: "rose",
        microText: "CBT, mindfulness, trauma & relationship support.",
        intro: (
            <div className="flex flex-col gap-6">
                <p>Step into a sanctuary of support and understanding—a place designed just for you. At <span className="font-bold text-rose-600">Serene Counseling</span>, we don&apos;t just treat symptoms; we walk alongside you on your journey toward emotional freedom and lasting well-being. Our warm, confidential, and deeply personalized therapy sessions provide a safe space to explore your thoughts, heal from pain, and reconnect with your inner strength.</p>
                <p>Whether you&apos;re navigating anxiety, healing from trauma, mending relationships, or simply seeking greater joy and clarity, our compassionate and highly skilled therapists are here to guide you with expertise and heart. Using evidence-based approaches like <span className="font-semibold">Cognitive Behavioral Therapy (CBT)</span>, mindfulness, and emotionally focused techniques, we tailor every session to honor your unique story and goals.</p>
                <p className="font-medium text-slate-900 italic">&quot;You deserve to thrive, not just cope. Let us help you unlock resilience, restore balance, and create meaningful change in your life.&quot;</p>
            </div>
        ),
        features: ["Anxiety & stress support", "Trauma healing", "Relationship guidance", "Clarity, resilience & growth"],
        callout: {
            note: "Ready to write a new chapter?"
        },
        cta: "Ready to write a new chapter?",
        ctaLink: "https://wa.me/94762515494",
        detailLink: "/services/psychology",
        trust: "Evidence-based approaches • Highly Confidential",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        image: "/images/nav/psychology.png", // This is for navigation thumbs

        // --- Custom Section Overrides ---
        finalCtaTitle: "Reach out today to begin your transformation.",
        finalCtaDescription: (
            <div className="space-y-4">
                <p className="text-white text-lg font-semibold italic">✨ Your journey to a brighter tomorrow starts here. Make an appointment with a psychologist / Psychotherapist.</p>
            </div>
        ),

        // --- Premium Content ---
        trustStrip: {
            text1: "Licensed Therapists",
            text2: "Strictly Confidential",
            text3: "Evidence-Based",
            text4: "Secure Video"
        },
        howItWorks: [
            {
                title: "Choose Your Therapist",
                description: "Browse profiles and find an expert whose approach resonates with you."
            },
            {
                title: "Schedule Easily",
                description: "Book an online or in-person session at a time that fits your life."
            },
            {
                title: "Start Growing",
                description: "Begin identifying patterns, healing trauma, and building resilience."
            }
        ],
        richFeatures: [
            {
                title: "Cognitive Behavioral Therapy (CBT)",
                description: "Identify and reshape negative thought patterns to improve emotional regulation."
            },
            {
                title: "Trauma-Informed Care",
                description: "Safe, guided support for processing difficult past experiences at your own pace."
            },
            {
                title: "Relationship Counseling",
                description: "Communication strategies and emotional support for couples and families."
            },
            {
                title: "Stress & Anxiety Management",
                description: "Practical mindfulness tools to navigate high-pressure environments."
            }
        ],
        benefits: [
            "Break cycles of anxiety and depression",
            "Develop lifelong emotional coping strategies",
            "Improve communication and intimacy in relationships",
            "Reclaim your sense of self-worth"
        ],
        testimonials: [
            {
                quote: "Therapy felt intimidating, but the platform made it feel approachable. My therapist provided the exact tools I needed to manage my panic attacks.",
                name: "David M.",
                title: "Designer"
            },
            {
                quote: "A truly modern approach to mental health. The sessions are completely secure, and the care is transformative.",
                name: "Dr. L. Weerasinghe",
                title: "Physician"
            }
        ]
    },
    {
        id: "integrated-healing",
        title: "Integrated Healing",
        subtitle: "Heal Uniquely. Live Fully. – made Just for YOU!",
        navTitle: "Integrated Healing",
        tag: "Holistic",
        tags: ["Personalized", "Multidisciplinary", "Mind-Body-Soul"],
        theme: "amber",
        microText: "Healing Designed for Your Life — Personalized Care for Body, Mind & Soul!",
        intro: "Personalized integrative healing that unites evidence-based Western medicine with Ayurveda, Indigenous medicine, Vedic wisdom, Reiki, and Naturopathy—supported by tailored lifestyle and nutrition plans. Our multidisciplinary approach delivers holistic, patient-centered care designed to restore balance, enhance wellbeing, and promote long-term health.",
        features: ["Made just for you — individualized care", "Case management system", "Comprehensive healing packages", "Mutual agreement and accountability", "Ethical protocols & considerations"],
        cta: "Explore integrated plans",
        ctaLink: "/services/integrated-healing",
        detailLink: "/services/integrated-healing",
        trust: "Ethical guidelines & protocols will guide recommendations",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        image: "/images/nav/integrated-healing.png",

        // --- Premium Content ---
        trustStrip: {
            text1: "Evidence & Tradition",
            text2: "Holistic Approach",
            text3: "Expert Practitioners",
            text4: "Personalized Plans"
        },
        howItWorks: [
            {
                title: "Consultation & Agreement",
                description: "We begin with a deep dive into your history and a mutual agreement on your healing path."
            },
            {
                title: "Personalized Plan Creation",
                description: "Our multidisciplinary team builds your unique case management strategy."
            },
            {
                title: "Integrated Implementation",
                description: "Ongoing support and accountability as you follow your custom lifestyle and nutrition protocols."
            }
        ],
        richFeatures: [
            {
                title: "Tailored Case Management",
                description: "A structured system of individualized care that evolves with your healing journey."
            },
            {
                title: "East-West Synergy",
                description: "Uniting Western diagnostics with Ayurveda, Indigenous traditions, and Vedic wisdom."
            },
            {
                title: "Lifestyle & Nutrition",
                description: "Personalized nutrition plans and life-balancing protocols designed specifically for you."
            },
            {
                title: "Accountability & Ethics",
                description: "Mutual agreement-based care protocols rooted in transparency and shared responsibility."
            }
        ],
        benefits: [
            "Restore total system balance & vitality",
            "Evidence-based multidisciplinary care",
            "Long-term health & wellbeing promotion",
            "Empowered, patient-centered healing journey"
        ],
        testimonials: [
            {
                quote: "Western medicine couldn't solve my chronic fatigue. It was the integrated approach—combining specific bloodwork with Ayurvedic herbs and Reiki—that finally gave me my life back.",
                name: "Eleanor T.",
                title: "Writer"
            },
            {
                quote: "The practitioners here don't see you as a chart; they see you as a whole universe. True healing.",
                name: "Marcus J.",
                title: "Yoga Instructor"
            }
        ]
    },
    {
        id: "community",
        title: "Wellness Community",
        subtitle: "Mind•Body•Spirit",
        navTitle: "Community",
        tag: "Grow",
        tags: ["Community", "Mind • Body • Spirit", "Stories & Support"],
        theme: "indigo",
        microText: "Share experiences, learn & grow together.",
        intro: "A space where your journey matters. Connect with like-minded people, exchange experiences, and learn from real stories—supporting holistic well-being across mind, body, and spirit.",
        features: ["Share your story authentically", "Learn collectively from others", "Grow intentionally with community support"],
        subFeatures: {
            title: "Media & Voices",
            items: ["Testimonial videos", "Podcasts", "YouTube creators", "TikToks featured"]
        },
        cta: "Join the community",
        ctaLink: "/community",
        detailLink: "/community",
        trust: "Important legal and regulatory guidelines will be published",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        image: "/images/nav/community.png",

        // --- Premium Content ---
        trustStrip: {
            text1: "Moderated Spaces",
            text2: "Authentic Stories",
            text3: "Expert Q&As",
            text4: "Inclusive Growth"
        },
        howItWorks: [
            {
                title: "Create Your Profile",
                description: "Join the network and set your wellness intentions and interests."
            },
            {
                title: "Discover Groups",
                description: "Find communities focused on everything from Ayurveda to anxiety management."
            },
            {
                title: "Engage & Share",
                description: "Participate in discussions, attend live streams, and support others."
            }
        ],
        richFeatures: [
            {
                title: "Expert-Led Sessions",
                description: "Exclusive live Q&As with doctors, therapists, and holistic practitioners."
            },
            {
                title: "Safe Support Circles",
                description: "Moderated, private sub-groups for sensitive health topics and shared struggles."
            },
            {
                title: "Rich Media Library",
                description: "Access curated podcasts, guided meditations, and wellness articles."
            },
            {
                title: "Progress Tracking",
                description: "Log your mood and milestones while being cheered on by peers."
            }
        ],
        benefits: [
            "Overcome the isolation of chronic health journeys",
            "Learn practical tips from people who have been there",
            "Stay accountable to your wellness goals",
            "Access exclusive health content and events"
        ],
        testimonials: [
            {
                quote: "Finding a group of people who actually understood what it's like to manage an autoimmune condition changed everything for me. This isn't just an app; it's a lifeline.",
                name: "Jessica W.",
                title: "Community Member"
            },
            {
                quote: "The knowledge shared in these forums is unbelievable. It perfectly bridges the gap between clinical advice and day-to-day reality.",
                name: "Samir K.",
                title: "Community Member"
            }
        ]
    },
];
