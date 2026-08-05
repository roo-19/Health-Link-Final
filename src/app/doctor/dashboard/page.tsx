"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, onSnapshot, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Inquiry {
    id: string;
    clientId: string;
    clientName: string;
    clientEmail: string;
    phoneNumber: string;
    dateOfBirth: string;
    subject: string;
    message: string;
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

export default function DoctorDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [loadingInquiries, setLoadingInquiries] = useState(true);
    const [activeTab, setActiveTab] = useState<"pending" | "answered">("pending");
    
    // Active workspace for answering
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [answerText, setAnswerText] = useState("");
    const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Auth check
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/signin");
            } else if (profile && profile.role !== "doctor") {
                if (profile.role === "admin") router.push("/admin/dashboard");
                if (profile.role === "client") router.push("/client/dashboard");
            }
        }
    }, [user, profile, loading, router]);

    // Fetch inquiries assigned to this doctor
    useEffect(() => {
        if (!user || !profile || profile.role !== "doctor") return;

        const q = query(
            collection(db, "inquiries"),
            where("doctorId", "==", user.uid)
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
            console.error("Error fetching doctor inquiries:", err);
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

    const handleAnswerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedInquiry) return;
        
        setSubmitError("");
        setIsSubmittingAnswer(true);

        try {
            const newAnswerRef = doc(collection(db, "answers"));
            const answerId = newAnswerRef.id;

            // 1. Save answer document
            await setDoc(newAnswerRef, {
                id: answerId,
                inquiryId: selectedInquiry.id,
                doctorId: user!.uid,
                doctorName: profile!.fullName,
                answer: answerText,
                createdAt: serverTimestamp(),
            });

            // 2. Update Inquiry document
            const inquiryDocRef = doc(db, "inquiries", selectedInquiry.id);
            await updateDoc(inquiryDocRef, {
                status: "answered",
                answeredAt: serverTimestamp(),
            });

            // Clean up
            setAnswerText("");
            setSelectedInquiry(null);
            setActiveTab("answered");
        } catch (err: any) {
            console.error("Error posting answer:", err);
            setSubmitError(err.message || "Failed to post your answer.");
        } finally {
            setIsSubmittingAnswer(false);
        }
    };

    const pendingInquiries = inquiries.filter((inq) => inq.status === "assigned");
    const answeredInquiries = inquiries.filter((inq) => inq.status === "answered");

    if (loading || (user && !profile)) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-slate-900 border-t-transparent rounded-full" />
            </div>
        );
    }

    // Render pending registration approval page if doctor profile is not approved
    if (profile && profile.role === "doctor" && profile.approved === false) {
        return (
            <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
                <Navbar />
                <section className="pt-40 sm:pt-48 pb-24 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-10 sm:p-14 border border-slate-200/50 text-center relative overflow-hidden">
                        {/* Background subtle colors */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto bg-amber-50 rounded-3xl flex items-center justify-center text-amber-500 mb-8 border border-amber-200">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            
                            <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Registration Pending Approval</h1>
                            <p className="text-slate-600 font-light leading-relaxed mb-8 max-w-md mx-auto">
                                Thank you, <span className="font-semibold text-slate-800">Dr. {profile.fullName}</span>, for registering with Health Link.
                                <br />
                                Your medical credentials and SLMC license (<span className="font-mono text-xs font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-800">{profile.licenseNumber || "Pending"}</span>) are currently being reviewed by the administration.
                                <br /><br />
                                Once verified and approved by our team, you will gain full access to your doctor dashboard.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3.5 bg-slate-900 hover:bg-sky-600 text-white rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 4.79M9 9h-5.586M9 9V3.586" />
                                    </svg>
                                    Check Status
                                </button>
                                <button 
                                    onClick={() => logout()}
                                    className="px-6 py-3.5 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-700 rounded-2xl font-bold transition-all cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    const [searchQuery, setSearchQuery] = useState("");

    const quickTemplates = [
        { label: "🏥 Recommend Hospital Visit", text: "Based on the symptoms described, we recommend visiting the nearest hospital emergency room or outpatient department for a physical exam and vital checks." },
        { label: "💊 Rest & Hydration Advice", text: "Maintain adequate rest, drink plenty of fluids, and monitor your temperature. If symptoms escalate beyond 48 hours, seek immediate in-person consultation." },
        { label: "📋 Prescription Follow-up", text: "Please continue your current prescribed medication as directed. Ensure you do not stop dosage prematurely. Schedule a follow-up if symptoms persist." },
        { label: "🧪 Lab Test Recommended", text: "We suggest having a Routine Blood Count (FBC) and relevant lab tests performed. Please share the test report once available for further review." }
    ];

    const applyTemplate = (templateText: string) => {
        setAnswerText((prev) => (prev ? `${prev}\n\n${templateText}` : templateText));
    };

    const filteredPendingInquiries = pendingInquiries.filter((inq) => {
        const query = searchQuery.toLowerCase();
        return (
            inq.clientName.toLowerCase().includes(query) ||
            inq.subject.toLowerCase().includes(query) ||
            inq.phoneNumber.toLowerCase().includes(query) ||
            inq.id.toLowerCase().includes(query)
        );
    });

    const filteredAnsweredInquiries = answeredInquiries.filter((inq) => {
        const query = searchQuery.toLowerCase();
        return (
            inq.clientName.toLowerCase().includes(query) ||
            inq.subject.toLowerCase().includes(query) ||
            inq.phoneNumber.toLowerCase().includes(query) ||
            inq.id.toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-slate-50/70 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900">
            <Navbar />

            <section className="pt-32 sm:pt-40 pb-24 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Doctor Portal Hero Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl text-white mb-10 border border-slate-800">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Doctor Clinical Portal • Verified SLMC Physician
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                                Dr. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-teal-300">{profile?.fullName}</span>
                            </h1>
                            <p className="text-slate-300 font-light mt-3 max-w-2xl leading-relaxed text-sm sm:text-base">
                                Review assigned patient inquiries, analyze clinical details, and provide expert medical advice.
                            </p>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto shrink-0">
                            <div className="bg-indigo-500/20 border border-indigo-400/30 px-4 py-3 rounded-2xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                                    👨‍⚕️
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] uppercase font-bold text-indigo-300 block">SLMC License</span>
                                    <span className="text-xs font-mono font-bold text-white">{profile?.licenseNumber || "Verified"}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => logout()} 
                                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-2xl font-bold transition-all text-center cursor-pointer text-sm"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* KPI Stats Overview */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800/80">
                        <div className="bg-amber-500/10 backdrop-blur-md rounded-2xl p-4 border border-amber-500/20">
                            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">Cases Pending Response</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 block">{pendingInquiries.length}</span>
                        </div>
                        <div className="bg-emerald-500/10 backdrop-blur-md rounded-2xl p-4 border border-emerald-500/20">
                            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">Answered Cases</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 block">{answeredInquiries.length}</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1 bg-indigo-500/10 backdrop-blur-md rounded-2xl p-4 border border-indigo-500/20">
                            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider block">Total Patient Cases</span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 mt-1 block">{inquiries.length}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Workspace Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Assigned Questions List */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Search & Tabs Header */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                            
                            {/* Search Input */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by patient name, subject, or phone number..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery("")} 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-slate-100 gap-4 pt-2">
                                <button 
                                    onClick={() => { setActiveTab("pending"); setSelectedInquiry(null); }}
                                    className={`pb-3 text-sm sm:text-base font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${activeTab === "pending" ? "border-indigo-600 text-indigo-900" : "border-transparent text-slate-400 hover:text-slate-700"}`}
                                >
                                    <span>⏳ Pending Response</span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${activeTab === "pending" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-500"}`}>
                                        {pendingInquiries.length}
                                    </span>
                                </button>
                                <button 
                                    onClick={() => { setActiveTab("answered"); setSelectedInquiry(null); }}
                                    className={`pb-3 text-sm sm:text-base font-extrabold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${activeTab === "answered" ? "border-indigo-600 text-indigo-900" : "border-transparent text-slate-400 hover:text-slate-700"}`}
                                >
                                    <span>✅ Answered Cases</span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${activeTab === "answered" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
                                        {answeredInquiries.length}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Cases List */}
                        {loadingInquiries ? (
                            <div className="py-16 bg-white rounded-[2.5rem] border border-slate-200/70 flex flex-col items-center justify-center gap-3">
                                <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
                                <p className="text-slate-500 font-medium text-sm">Loading assigned patient cases...</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {activeTab === "pending" ? (
                                    filteredPendingInquiries.length === 0 ? (
                                        <div className="bg-white rounded-[2.5rem] border border-slate-200/70 p-12 text-center shadow-sm">
                                            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mb-3">
                                                🎉
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">No Pending Cases</h3>
                                            <p className="text-slate-500 text-sm font-light">
                                                {searchQuery ? "No pending inquiries match your search filter." : "You have answered all assigned patient cases. Great work!"}
                                            </p>
                                        </div>
                                    ) : (
                                        filteredPendingInquiries.map((inq) => {
                                            const isSelected = selectedInquiry?.id === inq.id;

                                            return (
                                                <div 
                                                    key={inq.id} 
                                                    onClick={() => setSelectedInquiry(inq)}
                                                    className={`bg-white rounded-[2rem] border p-6 shadow-sm cursor-pointer transition-all duration-200 ${isSelected ? "ring-2 ring-indigo-600 border-indigo-500 bg-indigo-50/20 shadow-md" : "border-slate-200/70 hover:border-indigo-300 hover:shadow-md"}`}
                                                >
                                                    <div className="flex justify-between items-start gap-4 mb-3">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-lg">🩺</span>
                                                                <h3 className="text-lg font-extrabold text-slate-950">{inq.subject}</h3>
                                                            </div>
                                                            <p className="text-xs text-slate-500 mt-1 font-medium">
                                                                Client: <span className="font-bold text-slate-800">{inq.clientName}</span> | DOB: {inq.dateOfBirth || "N/A"}
                                                            </p>
                                                        </div>
                                                        <span className="text-[11px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full shrink-0">
                                                            ⏳ Needs Response
                                                        </span>
                                                    </div>

                                                    <p className="text-slate-700 font-light text-sm line-clamp-2 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100 mb-4">
                                                        {inq.message}
                                                    </p>

                                                    <div className="flex justify-between items-center text-xs text-slate-400 font-medium pt-3 border-t border-slate-100">
                                                        <span>Patient Tel: {inq.phoneNumber}</span>
                                                        <span className="text-indigo-600 font-bold group-hover:underline">
                                                            {isSelected ? "Active in Workspace ➔" : "Click to Review Case ➔"}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )
                                ) : (
                                    filteredAnsweredInquiries.length === 0 ? (
                                        <div className="bg-white rounded-[2.5rem] border border-slate-200/70 p-12 text-center shadow-sm">
                                            <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-50 text-slate-400 flex items-center justify-center text-3xl mb-3">
                                                📁
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1">No Answered Records Found</h3>
                                            <p className="text-slate-500 text-sm font-light">No answered patient inquiries match your search.</p>
                                        </div>
                                    ) : (
                                        filteredAnsweredInquiries.map((inq) => {
                                            const isSelected = selectedInquiry?.id === inq.id;

                                            return (
                                                <div 
                                                    key={inq.id} 
                                                    onClick={() => setSelectedInquiry(inq)}
                                                    className={`bg-white rounded-[2rem] border p-6 shadow-sm cursor-pointer transition-all duration-200 ${isSelected ? "ring-2 ring-indigo-600 border-indigo-500 bg-indigo-50/20 shadow-md" : "border-slate-200/70 hover:border-indigo-300 hover:shadow-md"}`}
                                                >
                                                    <div className="flex justify-between items-start gap-4 mb-3">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-lg">✅</span>
                                                                <h3 className="text-lg font-extrabold text-slate-950">{inq.subject}</h3>
                                                            </div>
                                                            <p className="text-xs text-slate-500 mt-1 font-medium">
                                                                Client: <span className="font-bold text-slate-800">{inq.clientName}</span>
                                                            </p>
                                                        </div>
                                                        <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
                                                            ✅ Answered
                                                        </span>
                                                    </div>

                                                    <p className="text-slate-600 font-light text-sm line-clamp-2 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100 mb-4">
                                                        {inq.message}
                                                    </p>

                                                    <div className="flex justify-between items-center text-xs text-slate-400 font-medium pt-3 border-t border-slate-100">
                                                        <span>Answered Date: {inq.answeredAt?.toDate ? inq.answeredAt.toDate().toLocaleDateString() : "Completed"}</span>
                                                        <span className="text-indigo-600 font-bold">View Medical Notes ➔</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Case Workspace */}
                    <div className="lg:col-span-5">
                        {selectedInquiry ? (
                            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-6 sm:p-8 shadow-xl sticky top-36">
                                
                                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Clinical Workspace</span>
                                        <h3 className="text-2xl font-black text-slate-900">{selectedInquiry.subject}</h3>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedInquiry(null)}
                                        className="text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full"
                                    >
                                        Close Workspace ✕
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    
                                    {/* Patient Info Header Card */}
                                    <div className="bg-slate-900 text-white rounded-2xl p-5 text-sm border border-slate-800 shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Patient Profile</span>
                                            <a 
                                                href={`tel:${selectedInquiry.phoneNumber}`}
                                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                                            >
                                                <span>📞 Call</span>
                                            </a>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-slate-400 block">Name:</span>
                                                <span className="font-extrabold text-white text-sm">{selectedInquiry.clientName}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block">Date of Birth:</span>
                                                <span className="font-bold text-slate-200">{selectedInquiry.dateOfBirth || "Not provided"}</span>
                                            </div>
                                            <div className="col-span-2 pt-2 border-t border-slate-800 mt-1">
                                                <span className="text-slate-400 block">Phone / Contact:</span>
                                                <span className="font-bold text-slate-200">{selectedInquiry.phoneNumber}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Full Patient Symptoms */}
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Patient Complaint / Symptoms</h4>
                                        <div className="text-slate-800 text-sm font-normal leading-relaxed max-h-48 overflow-y-auto bg-slate-50 p-4 rounded-2xl border border-slate-200/70 whitespace-pre-line">
                                            {selectedInquiry.message}
                                        </div>
                                    </div>

                                    {/* Clinical Response Form */}
                                    {selectedInquiry.status === "assigned" ? (
                                        <form onSubmit={handleAnswerSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                                            {submitError && (
                                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                                                    <span>⚠️</span>
                                                    <span>{submitError}</span>
                                                </div>
                                            )}

                                            {/* Quick Templates Buttons */}
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                                                    Quick Clinical Answer Templates
                                                </label>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {quickTemplates.map((tmpl, idx) => (
                                                        <button
                                                            type="button"
                                                            key={idx}
                                                            onClick={() => applyTemplate(tmpl.text)}
                                                            className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 transition-colors cursor-pointer"
                                                        >
                                                            + {tmpl.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">Your Clinical Advice & Prescriptions</label>
                                                <textarea 
                                                    required 
                                                    rows={6} 
                                                    value={answerText}
                                                    onChange={(e) => setAnswerText(e.target.value)}
                                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none text-sm font-medium leading-relaxed" 
                                                    placeholder="Type your medical findings, advice, recommended rest, or instructions for the patient..."
                                                />
                                            </div>

                                            <button 
                                                type="submit" 
                                                disabled={isSubmittingAnswer}
                                                className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 py-4 px-6 text-sm font-black text-white shadow-xl shadow-indigo-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                {isSubmittingAnswer ? (
                                                    <>
                                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                                        <span>Posting Clinical Answer...</span>
                                                    </>
                                                ) : (
                                                    <span>📤 Submit Answer to Patient</span>
                                                )}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="pt-4 border-t border-slate-100 space-y-3">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Clinical Response</h4>
                                            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-sm text-slate-800 font-normal leading-relaxed whitespace-pre-line max-h-56 overflow-y-auto">
                                                {answers[selectedInquiry.id]?.answer}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="hidden lg:flex bg-slate-100/60 rounded-[2.5rem] border border-dashed border-slate-300 p-12 text-center h-[420px] flex-col justify-center items-center">
                                <div className="w-16 h-16 rounded-3xl bg-white text-indigo-600 flex items-center justify-center text-3xl mb-4 shadow-sm">
                                    🩺
                                </div>
                                <h4 className="font-extrabold text-slate-800 mb-1 text-lg">Select a Patient Case</h4>
                                <p className="text-slate-500 text-xs max-w-xs font-light leading-relaxed">
                                    Click any patient inquiry from the left panel to review full medical details, call the patient, or submit clinical advice.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
