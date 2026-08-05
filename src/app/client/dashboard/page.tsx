"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, onSnapshot, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountryList from "country-list-with-dial-code-and-flag";

interface Inquiry {
    id: string;
    subject: string;
    message: string;
    phoneNumber: string;
    dateOfBirth: string;
    status: "pending" | "assigned" | "answered";
    doctorId: string | null;
    doctorName: string | null;
    documents: string[];
    createdAt: any;
    assignedAt: any;
    answeredAt: any;
}

interface Answer {
    id: string;
    inquiryId: string;
    doctorName: string;
    answer: string;
    createdAt: any;
}

export default function ClientDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();
    
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [loadingInquiries, setLoadingInquiries] = useState(true);
    
    const [showModal, setShowModal] = useState(false);
    const [countryCode, setCountryCode] = useState("+94");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [consultationReason, setConsultationReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const countries = React.useMemo(() => {
        const list = CountryList.getAll();
        const lk = list.find((c) => c.code === "LK");
        const rest = list.filter((c) => c.code !== "LK").sort((a, b) => a.name.localeCompare(b.name));
        return [lk, ...rest].filter((c): c is any => !!c);
    }, []);
    const [modalError, setModalError] = useState("");

    // Authorization check
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/signin");
            } else if (profile && profile.role !== "client") {
                // If they are admin or doctor, send them to their respective dashboards
                if (profile.role === "admin") router.push("/admin/dashboard");
                if (profile.role === "doctor") router.push("/doctor/dashboard");
            }
        }
    }, [user, profile, loading, router]);

    // Pre-fill profile phone number and DOB if they exist
    useEffect(() => {
        if (profile) {
            if (profile.phoneNumber) {
                const parts = profile.phoneNumber.trim().split(/\s+/);
                if (parts.length > 1 && parts[0].startsWith("+")) {
                    setCountryCode(parts[0]);
                    setPhoneNumber(parts.slice(1).join(" "));
                } else {
                    setPhoneNumber(profile.phoneNumber);
                }
            }
            if (profile.dateOfBirth) {
                setDob(profile.dateOfBirth);
            }
        }
    }, [profile]);

    // Fetch patient's inquiries
    useEffect(() => {
        if (!user || !profile || profile.role !== "client") return;

        const q = query(
            collection(db, "inquiries"),
            where("clientId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: Inquiry[] = [];
            snapshot.forEach((doc) => {
                list.push(doc.data() as Inquiry);
            });
            
            // Sort client-side by createdAt desc to avoid composite index errors
            list.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
                return dateB - dateA;
            });

            setInquiries(list);
            setLoadingInquiries(false);
        }, (err) => {
            console.error("Error fetching inquiries:", err);
            setLoadingInquiries(false);
        });

        return () => unsubscribe();
    }, [user, profile]);

    // Fetch answers for inquiries that are answered
    useEffect(() => {
        if (inquiries.length === 0) return;
        
        const answeredInquiryIds = inquiries
            .filter((inq) => inq.status === "answered")
            .map((inq) => inq.id);

        if (answeredInquiryIds.length === 0) return;

        const q = query(
            collection(db, "answers"),
            where("inquiryId", "in", answeredInquiryIds)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const answersMap: Record<string, Answer> = {};
            snapshot.forEach((doc) => {
                const ans = doc.data() as Answer;
                answersMap[ans.inquiryId] = ans;
            });
            setAnswers(answersMap);
        });

        return () => unsubscribe();
    }, [inquiries]);

    const handleNewInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setModalError("");
        setIsSubmitting(true);

        try {
            const newInquiryRef = doc(collection(db, "inquiries"));
            const inquiryId = newInquiryRef.id;

            await setDoc(newInquiryRef, {
                id: inquiryId,
                clientId: user!.uid,
                clientName: profile!.fullName,
                clientEmail: profile!.email,
                phoneNumber: `${countryCode} ${phoneNumber}`,
                dateOfBirth: dob,
                subject: "Health Inquiry",
                message: consultationReason,
                status: "pending",
                doctorId: null,
                doctorName: null,
                documents: [],
                createdAt: serverTimestamp(),
                assignedAt: null,
                answeredAt: null,
            });

            // Update user profile document so details are persisted
            const userDocRef = doc(db, "users", user!.uid);
            await updateDoc(userDocRef, {
                phoneNumber: `${countryCode} ${phoneNumber}`,
                dateOfBirth: dob,
            });

            // Reset form
            setPhoneNumber("");
            setDob("");
            setConsultationReason("");
            setShowModal(false);
        } catch (err: any) {
            console.error("Error creating inquiry:", err);
            setModalError(err.message || "Failed to submit inquiry.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "assigned" | "answered">("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("General Health");
    const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);

    const categories = [
        { id: "General Health", name: "General Symptoms", icon: "🩺", desc: "Fever, cough, body pain, checkups", color: "from-sky-500/10 to-blue-500/5 text-sky-600 border-sky-200" },
        { id: "Prescriptions", name: "Medicine Advice", icon: "💊", desc: "Dosage, side effects, refills", color: "from-purple-500/10 to-indigo-500/5 text-purple-600 border-purple-200" },
        { id: "Lab Reports", name: "Lab & Test Results", icon: "🧪", desc: "Blood work, scans, reports review", color: "from-emerald-500/10 to-teal-500/5 text-emerald-600 border-emerald-200" },
        { id: "Mental Health", name: "Mental Wellness", icon: "🧠", desc: "Stress, sleep issues, anxiety", color: "from-amber-500/10 to-orange-500/5 text-amber-600 border-amber-200" }
    ];

    const openInquiryModalWithCategory = (catName: string) => {
        setSelectedCategory(catName);
        setShowModal(true);
    };

    const handleNewInquirySubmitWithCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setModalError("");
        setIsSubmitting(true);

        try {
            const newInquiryRef = doc(collection(db, "inquiries"));
            const inquiryId = newInquiryRef.id;

            await setDoc(newInquiryRef, {
                id: inquiryId,
                clientId: user!.uid,
                clientName: profile!.fullName,
                clientEmail: profile!.email,
                phoneNumber: `${countryCode} ${phoneNumber}`,
                dateOfBirth: dob,
                subject: selectedCategory ? `${selectedCategory} Consultation` : "Health Inquiry",
                message: consultationReason,
                status: "pending",
                doctorId: null,
                doctorName: null,
                documents: [],
                createdAt: serverTimestamp(),
                assignedAt: null,
                answeredAt: null,
            });

            // Update user profile document so details are persisted
            const userDocRef = doc(db, "users", user!.uid);
            await updateDoc(userDocRef, {
                phoneNumber: `${countryCode} ${phoneNumber}`,
                dateOfBirth: dob,
            });

            // Reset form
            setConsultationReason("");
            setShowModal(false);
        } catch (err: any) {
            console.error("Error creating inquiry:", err);
            setModalError(err.message || "Failed to submit inquiry.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const pendingCount = inquiries.filter(i => i.status === "pending").length;
    const assignedCount = inquiries.filter(i => i.status === "assigned").length;
    const answeredCount = inquiries.filter(i => i.status === "answered").length;

    const filteredInquiries = inquiries.filter(inq => {
        if (filterStatus === "pending") return inq.status === "pending";
        if (filterStatus === "assigned") return inq.status === "assigned";
        if (filterStatus === "answered") return inq.status === "answered";
        return true;
    });

    if (loading || (user && !profile)) {
        return (
            <div className="min-h-screen bg-slate-900/5 flex flex-col items-center justify-center gap-4">
                <div className="animate-spin h-12 w-12 border-4 border-sky-600 border-t-transparent rounded-full shadow-lg" />
                <p className="text-slate-500 font-medium text-sm animate-pulse">Loading Health Link Dashboard...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50/70 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-900">
            <Navbar />

            <section className="pt-32 sm:pt-40 pb-24 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Header Banner & Profile Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl text-white mb-10 border border-slate-800">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
                                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                                Client Portal • Patient Dashboard
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">{profile?.fullName}</span>
                            </h1>
                            <p className="text-slate-300 font-light mt-3 max-w-2xl leading-relaxed text-sm sm:text-base">
                                Submit health questions, track your doctor consultation progress, and view verified medical responses easily.
                            </p>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto shrink-0">
                            <button 
                                onClick={() => openInquiryModalWithCategory("General Health")} 
                                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-sky-500/20 hover:shadow-sky-500/40 transition-all transform hover:-translate-y-0.5 text-center cursor-pointer flex items-center justify-center gap-2.5 text-base"
                            >
                                <span className="text-xl">🩺</span>
                                <span>+ Ask a Doctor</span>
                            </button>
                            <button 
                                onClick={() => logout()} 
                                className="w-full sm:w-auto px-5 py-4 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-2xl font-bold transition-all text-center cursor-pointer text-sm"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
                        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Inquiries</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">{inquiries.length}</span>
                        </div>
                        <div className="bg-amber-500/10 backdrop-blur-md rounded-2xl p-4 border border-amber-500/20">
                            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">Waiting Assignment</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 block">{pendingCount}</span>
                        </div>
                        <div className="bg-sky-500/10 backdrop-blur-md rounded-2xl p-4 border border-sky-500/20">
                            <span className="text-xs text-sky-300 font-semibold uppercase tracking-wider block">Doctor Reviewing</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-sky-400 mt-1 block">{assignedCount}</span>
                        </div>
                        <div className="bg-emerald-500/10 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/20">
                            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">Answers Ready</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 block">{answeredCount}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Visual Action Grid (Non-Tech Savvy Friendly) */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">Need Medical Advice? Select a Topic</h2>
                            <p className="text-slate-500 text-xs sm:text-sm">Click any category below to launch a new consultation</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => openInquiryModalWithCategory(cat.id)}
                                className={`group relative text-left p-6 rounded-3xl bg-gradient-to-br ${cat.color} bg-white border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-4xl p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                        {cat.icon}
                                    </span>
                                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                                        ➔
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">{cat.name}</h3>
                                    <p className="text-slate-500 text-xs font-light mt-1">{cat.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Emergency Hotline Banner */}
                <div className="bg-rose-500/10 border-2 border-rose-200/80 rounded-[2rem] p-6 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-center gap-4 text-center lg:text-left">
                        <div className="h-14 w-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-rose-600/30 shrink-0 mx-auto lg:mx-0 animate-pulse">
                            🚑
                        </div>
                        <div>
                            <div className="flex items-center gap-2 justify-center lg:justify-start">
                                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider">Urgent Emergency</span>
                                <h3 className="text-rose-950 font-black text-lg">Medical Emergency Assistance</h3>
                            </div>
                            <p className="text-rose-800/90 text-xs sm:text-sm font-medium mt-1">
                                For immediate life-threatening medical emergencies, call emergency services right away. Do not wait for online responses.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                        <a 
                            href="tel:1990" 
                            className="w-full sm:w-auto px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black shadow-lg shadow-rose-600/30 transition-all text-center text-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                            <span>🚨 Call 1990 (Ambulance)</span>
                        </a>
                        <a 
                            href="tel:+94112345678" 
                            className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-rose-50 text-rose-900 border border-rose-300 rounded-2xl font-bold shadow-sm transition-all text-center text-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                            <span>📞 Hospital Helpline: +94 11 234 5678</span>
                        </a>
                    </div>
                </div>

                {/* Main Content: Inquiries List */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Health Inquiries</h2>
                            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Track live progress of your questions & medical answers</p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1.5 bg-slate-200/60 p-1.5 rounded-2xl self-start sm:self-auto overflow-x-auto max-w-full">
                            <button
                                onClick={() => setFilterStatus("all")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                            >
                                🌐 All ({inquiries.length})
                            </button>
                            <button
                                onClick={() => setFilterStatus("pending")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === "pending" ? "bg-white text-amber-700 shadow-sm" : "text-slate-600 hover:text-amber-700"}`}
                            >
                                ⏳ Pending ({pendingCount})
                            </button>
                            <button
                                onClick={() => setFilterStatus("assigned")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === "assigned" ? "bg-white text-sky-700 shadow-sm" : "text-slate-600 hover:text-sky-700"}`}
                            >
                                👨‍⚕️ Reviewing ({assignedCount})
                            </button>
                            <button
                                onClick={() => setFilterStatus("answered")}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${filterStatus === "answered" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600 hover:text-emerald-700"}`}
                            >
                                ✅ Answered ({answeredCount})
                            </button>
                        </div>
                    </div>

                    {loadingInquiries ? (
                        <div className="py-16 bg-white rounded-[2.5rem] border border-slate-200/60 flex flex-col items-center justify-center gap-3">
                            <div className="animate-spin h-10 w-10 border-4 border-slate-900 border-t-transparent rounded-full" />
                            <p className="text-slate-500 font-medium text-sm">Fetching your health records...</p>
                        </div>
                    ) : filteredInquiries.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] border border-slate-200/70 p-12 text-center shadow-sm max-w-2xl mx-auto my-8">
                            <div className="w-20 h-20 mx-auto rounded-3xl bg-sky-50 text-sky-600 flex items-center justify-center text-4xl mb-4">
                                💬
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">No Inquiries Found</h3>
                            <p className="text-slate-500 font-light mb-6 text-sm">
                                {filterStatus === "all" 
                                    ? "You haven't submitted any medical questions yet. Click below to consult a verified doctor." 
                                    : `No inquiries match the filter "${filterStatus}".`}
                            </p>
                            <button 
                                onClick={() => openInquiryModalWithCategory("General Health")} 
                                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-sky-600 transition-all shadow-lg shadow-slate-900/10 cursor-pointer text-sm"
                            >
                                + Submit Medical Question
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredInquiries.map((inq) => {
                                const isAnswered = inq.status === "answered";
                                const isAssigned = inq.status === "assigned";

                                return (
                                    <div 
                                        key={inq.id} 
                                        className="bg-white rounded-[2.5rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        {/* Visual Status Progress Stepper (Non-tech friendly) */}
                                        <div className="mb-6 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/50">
                                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center sm:text-left">
                                                Inquiry Progress Tracker
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 relative">
                                                {/* Step 1: Submitted */}
                                                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white border border-emerald-200 shadow-sm">
                                                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mb-1">
                                                        ✓
                                                    </span>
                                                    <span className="text-xs font-extrabold text-slate-900">1. Submitted</span>
                                                    <span className="text-[10px] text-slate-400 hidden sm:inline">Received</span>
                                                </div>

                                                {/* Step 2: Doctor Assigned */}
                                                <div className={`flex flex-col items-center text-center p-2 rounded-xl border transition-all ${isAssigned || isAnswered ? "bg-white border-sky-300 shadow-sm" : "bg-slate-100/50 border-slate-200 text-slate-400"}`}>
                                                    <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mb-1 ${isAssigned || isAnswered ? "bg-sky-600 text-white" : "bg-slate-300 text-slate-600"}`}>
                                                        {isAssigned || isAnswered ? "✓" : "2"}
                                                    </span>
                                                    <span className={`text-xs font-extrabold ${isAssigned || isAnswered ? "text-slate-900" : "text-slate-500"}`}>
                                                        2. Doctor Reviewing
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                                                        {inq.doctorName ? `Dr. ${inq.doctorName}` : "Assigning..."}
                                                    </span>
                                                </div>

                                                {/* Step 3: Answered */}
                                                <div className={`flex flex-col items-center text-center p-2 rounded-xl border transition-all ${isAnswered ? "bg-emerald-50 border-emerald-300 shadow-sm" : "bg-slate-100/50 border-slate-200 text-slate-400"}`}>
                                                    <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mb-1 ${isAnswered ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-600"}`}>
                                                        {isAnswered ? "✓" : "3"}
                                                    </span>
                                                    <span className={`text-xs font-extrabold ${isAnswered ? "text-emerald-900" : "text-slate-500"}`}>
                                                        3. Answer Ready
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                                                        {isAnswered ? "Complete" : "Pending"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Inquiry Header */}
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-slate-100">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">🩺</span>
                                                    <h3 className="text-xl font-extrabold text-slate-950">{inq.subject}</h3>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-1 font-medium">
                                                    Submitted on: {inq.createdAt?.toDate ? inq.createdAt.toDate().toLocaleDateString() : "Just now"}
                                                </p>
                                            </div>

                                            <div>
                                                {inq.status === "pending" && (
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
                                                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                                                        ⏳ Waiting for Doctor Assignment
                                                    </span>
                                                )}
                                                {inq.status === "assigned" && (
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-sky-50 text-sky-800 border border-sky-300 shadow-xs">
                                                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                                                        👨‍⚕️ Assigned to {inq.doctorName || "Medical Doctor"}
                                                    </span>
                                                )}
                                                {inq.status === "answered" && (
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs">
                                                        ✅ Verified Doctor Answer
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Symptom Details */}
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Your Question / Symptoms</h4>
                                                <p className="text-slate-800 font-light text-sm sm:text-base whitespace-pre-line leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                                    {inq.message}
                                                </p>
                                            </div>

                                            {/* Doctor Answer Display Box */}
                                            {inq.status === "answered" && answers[inq.id] && (
                                                <div className="mt-6 p-6 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-sky-500/10 rounded-3xl border border-emerald-200 shadow-sm">
                                                    <div className="flex items-center justify-between border-b border-emerald-200/60 pb-4 mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-600/20">
                                                                Dr
                                                            </div>
                                                            <div>
                                                                <h4 className="font-extrabold text-slate-900 text-base">Dr. {answers[inq.id].doctorName}</h4>
                                                                <p className="text-xs text-emerald-800 font-medium">Verified Health Link Medical Specialist</p>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                                                            Answered: {answers[inq.id].createdAt?.toDate ? answers[inq.id].createdAt.toDate().toLocaleDateString() : "Recently"}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">Medical Advice & Instructions</span>
                                                        <div className="text-slate-800 text-sm sm:text-base font-normal leading-relaxed whitespace-pre-line bg-white/80 p-5 rounded-2xl border border-emerald-100 shadow-xs">
                                                            {answers[inq.id].answer}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Intuitive New Inquiry Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-6 sm:p-10 border border-slate-200 max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-1">Online Medical Consultation</span>
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Ask a Doctor</h3>
                                <p className="text-slate-500 text-xs sm:text-sm mt-1">Submit your health question to be reviewed by a licensed physician.</p>
                            </div>
                            <button 
                                onClick={() => setShowModal(false)} 
                                className="text-slate-400 hover:text-slate-700 h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {modalError && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl flex items-center gap-2">
                                <span>⚠️</span>
                                <span>{modalError}</span>
                            </div>
                        )}

                        <form onSubmit={handleNewInquirySubmitWithCategory} className="space-y-6">
                            
                            {/* Category Quick Selector */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">1. Select Consultation Topic</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            type="button"
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${selectedCategory === cat.id ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`}
                                        >
                                            <span className="text-xl">{cat.icon}</span>
                                            <span>{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Patient Contact Info */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">2. Patient Details</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-500">Phone Number (For Urgent Follow-up)</label>
                                        <div className="flex rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-sky-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
                                            <select 
                                                value={countryCode} 
                                                onChange={(e) => setCountryCode(e.target.value)} 
                                                className="bg-transparent pl-3 pr-1 text-slate-800 font-semibold outline-none border-r border-slate-200 cursor-pointer text-xs shrink-0 max-w-[110px]"
                                            >
                                                {countries.map((c, idx) => (
                                                    <option key={`${c.code}-${c.dialCode}-${idx}`} value={c.dialCode}>
                                                        {c.flag} {c.dialCode}
                                                    </option>
                                                ))}
                                            </select>
                                            <input 
                                                type="tel" 
                                                required 
                                                value={phoneNumber} 
                                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                                className="w-full bg-transparent px-3 py-3 text-slate-900 placeholder:text-slate-400 outline-none border-none text-sm font-medium" 
                                                placeholder="77 123 4567" 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-slate-500">Date of Birth</label>
                                        <input 
                                            type="date" 
                                            required 
                                            value={dob} 
                                            onChange={(e) => setDob(e.target.value)} 
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none text-sm font-medium" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Symptoms / Question Description */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                                    3. Describe Your Health Symptoms / Question
                                </label>
                                <textarea 
                                    required 
                                    rows={5} 
                                    value={consultationReason} 
                                    onChange={(e) => setConsultationReason(e.target.value)} 
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none resize-none text-sm font-medium leading-relaxed" 
                                    placeholder="Please describe: What are your symptoms? How many days have you felt this way? Any current medicines you are taking?"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 py-4 px-8 text-base font-black text-white shadow-xl shadow-sky-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                        <span>Submitting to Doctor...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>📤 Submit Medical Inquiry Now</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
