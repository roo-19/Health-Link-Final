"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, onSnapshot, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function PatientDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();
    
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [answers, setAnswers] = useState<Record<string, Answer>>({});
    const [loadingInquiries, setLoadingInquiries] = useState(true);
    
    // Modal state for new inquiry
    const [showModal, setShowModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [consultationReason, setConsultationReason] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalError, setModalError] = useState("");

    // Authorization check
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/signin");
            } else if (profile && profile.role !== "patient") {
                // If they are admin or doctor, send them to their respective dashboards
                if (profile.role === "admin") router.push("/admin/dashboard");
                if (profile.role === "doctor") router.push("/doctor/dashboard");
            }
        }
    }, [user, profile, loading, router]);

    // Fetch patient's inquiries
    useEffect(() => {
        if (!user || (profile && profile.role !== "patient")) return;

        const q = query(
            collection(db, "inquiries"),
            where("patientId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: Inquiry[] = [];
            snapshot.forEach((doc) => {
                list.push(doc.data() as Inquiry);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleNewInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setModalError("");
        setIsSubmitting(true);

        try {
            const newInquiryRef = doc(collection(db, "inquiries"));
            const inquiryId = newInquiryRef.id;

            const documentUrls: string[] = [];
            for (const file of selectedFiles) {
                const storagePath = `inquiries/${inquiryId}/${Date.now()}_${file.name}`;
                const fileRef = ref(storage, storagePath);
                await uploadBytes(fileRef, file);
                const downloadUrl = await getDownloadURL(fileRef);
                documentUrls.push(downloadUrl);
            }

            await setDoc(newInquiryRef, {
                id: inquiryId,
                patientId: user!.uid,
                patientName: profile!.fullName,
                patientEmail: profile!.email,
                phoneNumber: phoneNumber,
                dateOfBirth: dob,
                subject: "Health Inquiry",
                message: consultationReason,
                status: "pending",
                doctorId: null,
                doctorName: null,
                documents: documentUrls,
                createdAt: serverTimestamp(),
                assignedAt: null,
                answeredAt: null,
            });

            // Reset form
            setPhoneNumber("");
            setDob("");
            setConsultationReason("");
            setSelectedFiles([]);
            setShowModal(false);
        } catch (err: any) {
            console.error("Error creating inquiry:", err);
            setModalError(err.message || "Failed to submit inquiry.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || (user && !profile)) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-slate-900 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />

            <section className="pt-32 pb-24 flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dashboard Header */}
                <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-md border border-slate-200/50 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Patient Dashboard</span>
                        <h1 className="text-4xl font-extrabold text-slate-950">Hello, {profile?.fullName}</h1>
                        <p className="text-slate-500 font-light mt-1">Manage your health inquiries and view responses from your assigned doctors.</p>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <button 
                            onClick={() => setShowModal(true)} 
                            className="flex-1 sm:flex-none px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-sky-600 hover:shadow-sky-600/20 transition-all text-center cursor-pointer"
                        >
                            + New Inquiry
                        </button>
                        <button 
                            onClick={() => logout()} 
                            className="px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition-all cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Your Inquiries</h2>

                        {loadingInquiries ? (
                            <div className="py-12 flex items-center justify-center">
                                <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
                            </div>
                        ) : inquiries.length === 0 ? (
                            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-12 text-center shadow-sm">
                                <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No Inquiries Found</h3>
                                <p className="text-slate-500 font-light mb-6">You haven&apos;t submitted any health inquiries yet.</p>
                                <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-sky-600 transition-all cursor-pointer">
                                    Submit Your First Inquiry
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {inquiries.map((inq) => (
                                    <div key={inq.id} className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900">{inq.subject}</h3>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    Submitted: {inq.createdAt?.toDate().toLocaleDateString()} at {inq.createdAt?.toDate().toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <div>
                                                {inq.status === "pending" && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                                        ⏳ Pending Assignment
                                                    </span>
                                                )}
                                                {inq.status === "assigned" && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                                                        👨‍⚕️ Assigned to {inq.doctorName || "Doctor"}
                                                    </span>
                                                )}
                                                {inq.status === "answered" && (
                                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                                                        ✅ Answered by {inq.doctorName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Your Inquiry Details</h4>
                                                <p className="text-slate-700 mt-2 font-light whitespace-pre-line leading-relaxed">{inq.message}</p>
                                            </div>

                                            {inq.documents && inq.documents.length > 0 && (
                                                <div className="pt-2">
                                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Attached Documents</h4>
                                                    <div className="flex flex-wrap gap-3 mt-2">
                                                        {inq.documents.map((docUrl, idx) => (
                                                            <a 
                                                                key={idx} 
                                                                href={docUrl} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer" 
                                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                                                            >
                                                                <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                Document {idx + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Answer Section */}
                                            {inq.status === "answered" && answers[inq.id] && (
                                                <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-200/80">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                                                            Dr
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900">{answers[inq.id].doctorName}</h4>
                                                            <p className="text-xs text-slate-400">
                                                                Answered on: {answers[inq.id].createdAt?.toDate().toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-slate-700 font-light leading-relaxed whitespace-pre-line border-t border-slate-200/50 pt-4">
                                                        {answers[inq.id].answer}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* New Inquiry Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl p-8 sm:p-10 border border-slate-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">New Health Inquiry</h3>
                                <p className="text-slate-500 text-sm mt-1">Submit details for a medical review</p>
                            </div>
                            <button 
                                onClick={() => setShowModal(false)} 
                                className="text-slate-400 hover:text-slate-600 h-8 w-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {modalError && (
                            <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleNewInquirySubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-900">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        required 
                                        value={phoneNumber} 
                                        onChange={(e) => setPhoneNumber(e.target.value)} 
                                        className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" 
                                        placeholder="+1 (555) 000-0000" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-slate-900">Date of Birth</label>
                                    <input 
                                        type="date" 
                                        required 
                                        value={dob} 
                                        onChange={(e) => setDob(e.target.value)} 
                                        className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-900">Describe Your Symptoms or Inquiry</label>
                                <textarea 
                                    required 
                                    rows={4} 
                                    value={consultationReason} 
                                    onChange={(e) => setConsultationReason(e.target.value)} 
                                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none resize-none" 
                                    placeholder="Explain your health issue, duration, severity, and any specific questions you have..."
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-slate-900">Upload Attachments</label>
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={handleFileChange} 
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer" 
                                />
                                {selectedFiles.length > 0 && (
                                    <div className="mt-2 text-xs text-slate-500">
                                        Selected: {selectedFiles.map(f => f.name).join(", ")}
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full rounded-2xl bg-slate-900 py-3.5 px-8 text-lg font-bold text-white shadow-xl hover:bg-sky-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                        Submitting...
                                    </>
                                ) : "Submit Inquiry"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
