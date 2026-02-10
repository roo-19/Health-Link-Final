
import { ReactNode } from "react";

export interface ServiceData {
    id: string;
    title: string;
    subtitle?: string;
    navTitle: string;
    tag: string; // Nav tag
    tags: string[]; // Panel top pills
    microText: string;
    intro: string; // Longer intro text
    description?: string; // Optional legacy description, prefer intro
    features: string[];
    subFeatures?: { title: string; items: string[] }; // Optional sub-section
    cta: string;
    ctaLink: string;
    trust: string;
    badge?: string;
    callout?: {
        text?: string;
        phone?: string;
        note?: string;
        link?: string;
    };
    icon: ReactNode;
    theme: "blue" | "emerald" | "violet" | "rose" | "amber" | "indigo";
}

export const servicesData: ServiceData[] = [
    {
        id: "telemedicine",
        title: "24/7 On-demand Telemedical Consulting",
        subtitle: "Western Medicine",
        navTitle: "Telemedicine",
        tag: "Consult",
        tags: ["Western Medicine", "24/7", "Tourist-friendly"],
        theme: "blue",
        microText: "Instant video consults, referrals & prescriptions.",
        intro: "Instant access to licensed clinicians for consultations, referrals, and prescriptions—wherever you are (home or hotel).",
        features: ["On-demand doctor consultations (video/online)", "Referral service when needed", "Prescription writing (where appropriate)"],
        callout: {
            note: "Doctor onboarding follows platform agreements.",
        },
        cta: "Talk to your doctor now",
        ctaLink: "/services/telemedicine",
        trust: "Licensed clinicians • Secure portal • Encrypted by default",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        id: "home-care",
        title: "AyuCare: Compassionate Home Care in Sri Lanka",
        subtitle: "Sri Lanka",
        navTitle: "Home Care",
        tag: "Care",
        tags: ["Sri Lanka", "Home Care", "Sinhala | Tamil | English"],
        theme: "emerald",
        microText: "Nursing, elder companionship & daily support.",
        intro: "Bringing quality care to your doorstep. We provide trusted nursing, elder companionship, and daily support—all in the comfort of home. Our trained, compassionate caregivers offer personalized care with respect and warmth, aligned with Sri Lankan family values.\n\nLet us help your loved ones live safely and independently at home.",
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
            phone: "0XX-XXX-XXXX",
            note: "Languages: Sinhala | Tamil | English"
        },
        cta: "Request home care",
        ctaLink: "/services/home-care",
        trust: "Certified caregivers • Compassionate support",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        id: "spiritual-care",
        title: "Sacred Space Sri Lanka",
        subtitle: "Integrated Spiritual Care & Healing",
        navTitle: "Spiritual Healing",
        tag: "Spirit",
        tags: ["Integrated Spiritual Care", "Multifaith", "Free of charge"],
        theme: "violet",
        microText: "Multifaith counseling, rituals, grief support.",
        badge: "Free",
        intro: "In the heart of Sri Lanka—a land of diverse faiths and ancient wisdom—we honor the spiritual traditions of Buddhism, Hinduism, Islam, and Christianity. Sacred Space Sri Lanka blends universal spiritual healing with structured, compassionate multifaith chaplaincy, offering a respectful sanctuary for all beliefs.\n\nGuided by Faith, Supported by Care, United in Spirit.",
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
            phone: "0XX-XXX-XXXX",
            note: "Services available in Sinhala | Tamil | English"
        },
        cta: "Book a confidential session",
        ctaLink: "/services/spiritual-care",
        trust: "Free of charge • Multifaith • Confidential",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
    {
        id: "psychology",
        title: "Anew Psychology",
        subtitle: "Where Healing Begins and Hope Grows",
        navTitle: "Psychology",
        tag: "Mind",
        tags: ["Mental Health", "Confidential", "Evidence-based"],
        theme: "rose",
        microText: "CBT, mindfulness, trauma & relationship support.",
        intro: "Step into a sanctuary of support and understanding. We don’t just treat symptoms—we walk with you toward emotional freedom and lasting well-being through warm, confidential, personalized therapy.\n\nEvidence-based care including CBT, mindfulness, and emotionally focused techniques—tailored to your story.",
        features: ["Anxiety & stress support", "Trauma healing", "Relationship guidance", "Clarity, resilience & growth"],
        callout: {
            note: "Your journey to a brighter tomorrow starts here."
        },
        cta: "Start therapy",
        ctaLink: "/services/psychology",
        trust: "Evidence-based approaches • Confidential",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        id: "integrated-healing",
        title: "Integrated Healing",
        subtitle: "Heal Uniquely. Live Fully.",
        navTitle: "Integrated",
        tag: "Holistic",
        tags: ["Personalized", "Mind-Body", "Holistic"],
        theme: "amber",
        microText: "Personalized plans blending East + West.",
        intro: "Your integrative care plan blends the precision of Western medicine with Ayurveda, Vedic Astrology & Human Design, Traditional Chinese Medicine, homeopathy, naturopathic care, and Indigenous healing traditions. Every recommendation is tailored to your body, history, and goals.",
        features: ["Individualized care / case management plans", "Blended pathways (East + West)", "Lifestyle + traditional meal plans", "Meditation & energy therapy (Reiki)"],
        cta: "Explore integrated plans",
        ctaLink: "/services/integrated-healing",
        trust: "Ethical guidelines & protocols will guide recommendations",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
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
        trust: "Important legal and regulatory guidelines will be published",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
];
