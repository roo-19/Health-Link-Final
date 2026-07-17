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

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <section className="pt-40 sm:pt-48 pb-24 flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-md border border-slate-200/50 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">Doctor Portal</span>
                        <h1 className="text-4xl font-extrabold text-slate-950">Dr. {profile?.fullName}</h1>
                        <p className="text-slate-500 font-light mt-1">Review your assigned cases and provide clinical advice.</p>
                    </div>
                    <button 
                        onClick={() => logout()} 
                        className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition-all cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: List of assigned questions */}
                    <div className="lg:col-span-7">
                        {/* Tabs */}
                        <div className="flex border-b border-slate-200 mb-6 gap-6">
                            <button 
                                onClick={() => { setActiveTab("pending"); setSelectedInquiry(null); }}
                                className={`pb-4 text-lg font-bold transition-all border-b-2 cursor-pointer ${activeTab === "pending" ? "border-slate-900 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                            >
                                Pending Response ({pendingInquiries.length})
                            </button>
                            <button 
                                onClick={() => { setActiveTab("answered"); setSelectedInquiry(null); }}
                                className={`pb-4 text-lg font-bold transition-all border-b-2 cursor-pointer ${activeTab === "answered" ? "border-slate-900 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                            >
                                Answered Cases ({answeredInquiries.length})
                            </button>
                        </div>

                        {loadingInquiries ? (
                            <div className="py-12 flex items-center justify-center">
                                <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {activeTab === "pending" ? (
                                    pendingInquiries.length === 0 ? (
                                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-12 text-center shadow-sm">
                                            <p className="text-slate-500 font-light">No pending inquiries assigned to you. Good job!</p>
                                        </div>
                                    ) : (
                                        pendingInquiries.map((inq) => (
                                            <div 
                                                key={inq.id} 
                                                onClick={() => setSelectedInquiry(inq)}
                                                className={`bg-white rounded-[2.5rem] border p-8 shadow-sm cursor-pointer transition-all ${selectedInquiry?.id === inq.id ? "ring-2 ring-indigo-500 border-transparent bg-indigo-50/10" : "border-slate-200/60 hover:shadow-md"}`}
                                            >
                                                <div className="flex justify-between items-start gap-4 mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-900">{inq.subject}</h3>
                                                        <p className="text-xs text-slate-400 mt-1">Client: {inq.clientName} | DOB: {inq.dateOfBirth}</p>
                                                    </div>
                                                    <span className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                                                        Assigned
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 font-light line-clamp-3 leading-relaxed">{inq.message}</p>
                                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
                                                    <span>Inquiry ID: {inq.id}</span>
                                                    <span>Recieved: {inq.createdAt?.toDate().toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    )
                                ) : (
                                    answeredInquiries.length === 0 ? (
                                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-12 text-center shadow-sm">
                                            <p className="text-slate-500 font-light">No answered inquiries yet.</p>
                                        </div>
                                    ) : (
                                        answeredInquiries.map((inq) => (
                                            <div 
                                                key={inq.id} 
                                                onClick={() => setSelectedInquiry(inq)}
                                                className={`bg-white rounded-[2.5rem] border p-8 shadow-sm cursor-pointer transition-all ${selectedInquiry?.id === inq.id ? "ring-2 ring-indigo-500 border-transparent bg-indigo-50/10" : "border-slate-200/60 hover:shadow-md"}`}
                                            >
                                                <div className="flex justify-between items-start gap-4 mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-slate-900">{inq.subject}</h3>
                                                        <p className="text-xs text-slate-400 mt-1">Client: {inq.clientName}</p>
                                                    </div>
                                                    <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                                                        Answered
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 font-light line-clamp-2 leading-relaxed">{inq.message}</p>
                                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
                                                    <span>Answered Date: {inq.answeredAt?.toDate().toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Case Workspace */}
                    <div className="lg:col-span-5">
                        {selectedInquiry ? (
                            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-md sticky top-36">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Case Workspace</h3>
                                <p className="text-slate-500 text-sm mb-6 border-b border-slate-100 pb-4">Provide clinical answer to the client</p>

                                <div className="space-y-6">
                                    {/* Client Info */}
                                    <div className="bg-slate-50 rounded-2xl p-4 text-sm border border-slate-200/50">
                                        <h4 className="font-bold text-slate-800 mb-2">Client Information</h4>
                                        <p className="text-slate-600"><span className="font-semibold">Name:</span> {selectedInquiry.clientName}</p>
                                        <p className="text-slate-600"><span className="font-semibold">Email:</span> {selectedInquiry.clientEmail}</p>
                                        <p className="text-slate-600"><span className="font-semibold">Phone:</span> {selectedInquiry.phoneNumber}</p>
                                        <p className="text-slate-600"><span className="font-semibold">DOB:</span> {selectedInquiry.dateOfBirth}</p>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Complaint/Inquiry</h4>
                                        <p className="text-slate-700 mt-2 font-light text-sm whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100">{selectedInquiry.message}</p>
                                    </div>

                                    {/* Patient Documents */}
                                    {selectedInquiry.documents && selectedInquiry.documents.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Client Attachments</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedInquiry.documents.map((docUrl, idx) => (
                                                    <a 
                                                        key={idx} 
                                                        href={docUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                    >
                                                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        File {idx + 1}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Response Action */}
                                    {selectedInquiry.status === "assigned" ? (
                                        <form onSubmit={handleAnswerSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                                            {submitError && (
                                                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                                                    {submitError}
                                                </div>
                                            )}
                                            <div className="space-y-1">
                                                <label className="text-sm font-semibold text-slate-900">Your Clinical Answer</label>
                                                <textarea 
                                                    required 
                                                    rows={6} 
                                                    value={answerText}
                                                    onChange={(e) => setAnswerText(e.target.value)}
                                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none text-sm" 
                                                    placeholder="Type your medical response, guidelines, prescriptions, or recommendations here..."
                                                />
                                            </div>
                                            <button 
                                                type="submit" 
                                                disabled={isSubmittingAnswer}
                                                className="w-full rounded-2xl bg-indigo-600 py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 hover:shadow-indigo-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                {isSubmittingAnswer ? (
                                                    <>
                                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                                        Submitting...
                                                    </>
                                                ) : "Submit Answer to Patient"}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="pt-4 border-t border-slate-100 space-y-4">
                                            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Your Answered Response</h4>
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/50 text-sm text-slate-700 font-light whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                                                {answers[selectedInquiry.id]?.answer}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="hidden lg:flex bg-slate-100/50 rounded-[2.5rem] border border-dashed border-slate-300 p-12 text-center h-[400px] flex-col justify-center items-center">
                                <svg className="h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M12 9v6m8.96-7.04A9.956 9.956 0 0121 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2c1.8 0 3.483.477 4.96 1.32a9.957 9.957 0 011.83 1.83z" />
                                </svg>
                                <h4 className="font-bold text-slate-700 mb-1">Select an Inquiry</h4>
                                <p className="text-slate-400 text-sm max-w-xs font-light">Select a patient inquiry from the list to view medical details, review files, and submit answers.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
