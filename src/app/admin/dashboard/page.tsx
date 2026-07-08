"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut as secondarySignOut } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { auth, db, firebaseConfig } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserProfile {
    uid: string;
    fullName: string;
    email: string;
    role: "patient" | "doctor" | "admin";
    createdAt: any;
}

interface Inquiry {
    id: string;
    patientId: string;
    patientName: string;
    patientEmail: string;
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

export default function AdminDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [doctors, setDoctors] = useState<UserProfile[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [activeTab, setActiveTab] = useState<"inquiries" | "doctors" | "stats">("inquiries");

    // Doctor Registration form state
    const [docName, setDocName] = useState("");
    const [docEmail, setDocEmail] = useState("");
    const [docPassword, setDocPassword] = useState("");
    const [isCreatingDoctor, setIsCreatingDoctor] = useState(false);
    const [doctorFormError, setDoctorFormError] = useState("");
    const [doctorFormSuccess, setDoctorFormSuccess] = useState("");

    // Selected doctor for assignment per inquiry
    const [assignmentDoctor, setAssignmentDoctor] = useState<Record<string, string>>({});
    const [isAssigning, setIsAssigning] = useState<Record<string, boolean>>({});

    // Auth check
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/signin");
            } else if (profile && profile.role !== "admin") {
                if (profile.role === "doctor") router.push("/doctor/dashboard");
                if (profile.role === "patient") router.push("/patient/dashboard");
            }
        }
    }, [user, profile, loading, router]);

    // Fetch all inquiries
    useEffect(() => {
        if (!user || (profile && profile.role !== "admin")) return;

        const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: Inquiry[] = [];
            snapshot.forEach((doc) => {
                list.push(doc.data() as Inquiry);
            });
            setInquiries(list);
            setLoadingData(false);
        }, (err) => {
            console.error("Error fetching inquiries:", err);
        });

        return () => unsubscribe();
    }, [user, profile]);

    // Fetch all doctors
    useEffect(() => {
        if (!user || (profile && profile.role !== "admin")) return;

        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: UserProfile[] = [];
            snapshot.forEach((doc) => {
                const u = doc.data() as UserProfile;
                if (u.role === "doctor") {
                    list.push(u);
                }
            });
            setDoctors(list);
        }, (err) => {
            console.error("Error fetching doctors:", err);
        });

        return () => unsubscribe();
    }, [user, profile]);

    // Handle doctor registration (Option A: Secondary Firebase App Instance)
    const handleRegisterDoctor = async (e: React.FormEvent) => {
        e.preventDefault();
        setDoctorFormError("");
        setDoctorFormSuccess("");

        if (docPassword.length < 6) {
            setDoctorFormError("Password must be at least 6 characters.");
            return;
        }

        setIsCreatingDoctor(true);

        // Define a unique secondary app name to avoid collisions
        const appName = `SecondaryDoctorApp-${Date.now()}`;
        let secondaryApp: any;

        try {
            // 1. Initialize secondary Firebase Auth app
            secondaryApp = initializeApp(firebaseConfig, appName);
            const secondaryAuth = getAuth(secondaryApp);

            // 2. Create the doctor account in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, docEmail, docPassword);
            const newDoctorUid = userCredential.user.uid;

            // 3. Write profile to Firestore database
            await setDoc(doc(db, "users", newDoctorUid), {
                uid: newDoctorUid,
                fullName: docName,
                email: docEmail,
                role: "doctor",
                createdAt: serverTimestamp(),
            });

            // 4. Sign out of secondary auth and delete secondary app
            await secondarySignOut(secondaryAuth);
            await deleteApp(secondaryApp);

            // Clear state on success
            setDocName("");
            setDocEmail("");
            setDocPassword("");
            setDoctorFormSuccess(`Doctor Dr. ${docName} registered successfully!`);
        } catch (err: any) {
            console.error("Error registering doctor:", err);
            setDoctorFormError(err.message || "Failed to create doctor account.");
            // Clean up secondary app if it was created
            if (secondaryApp) {
                try {
                    await deleteApp(secondaryApp);
                } catch (e) {
                    console.error("Error clean up:", e);
                }
            }
        } finally {
            setIsCreatingDoctor(false);
        }
    };

    // Assign inquiry to a doctor
    const handleAssignInquiry = async (inquiryId: string) => {
        const doctorUid = assignmentDoctor[inquiryId];
        if (!doctorUid) {
            alert("Please select a doctor to assign.");
            return;
        }

        const selectedDocObj = doctors.find((d) => d.uid === doctorUid);
        if (!selectedDocObj) return;

        setIsAssigning(prev => ({ ...prev, [inquiryId]: true }));

        try {
            const inquiryDocRef = doc(db, "inquiries", inquiryId);
            await updateDoc(inquiryDocRef, {
                doctorId: doctorUid,
                doctorName: selectedDocObj.fullName,
                status: "assigned",
                assignedAt: serverTimestamp(),
            });
        } catch (err: any) {
            console.error("Error assigning inquiry:", err);
            alert(err.message || "Failed to assign doctor.");
        } finally {
            setIsAssigning(prev => ({ ...prev, [inquiryId]: false }));
        }
    };

    const handleDeleteDoctor = async (doctorUid: string) => {
        if (!confirm("Are you sure you want to remove this doctor from Firestore? Note: This deletes their database profile, but their auth account will remain in Firebase Console. You can delete it there if needed.")) return;
        try {
            await deleteDoc(doc(db, "users", doctorUid));
        } catch (err) {
            console.error("Error deleting doctor:", err);
            alert("Error removing doctor profile.");
        }
    };

    // Computations for stats
    const totalInquiries = inquiries.length;
    const pendingInquiries = inquiries.filter((i) => i.status === "pending").length;
    const assignedInquiries = inquiries.filter((i) => i.status === "assigned").length;
    const answeredInquiries = inquiries.filter((i) => i.status === "answered").length;

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
                {/* Header */}
                <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-md border border-slate-200/50 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">Administration Control</span>
                        <h1 className="text-4xl font-extrabold text-slate-950">Admin Center</h1>
                        <p className="text-slate-500 font-light mt-1">Configure credentials, coordinate medical assignees, and analyze inquiries.</p>
                    </div>
                    <button 
                        onClick={() => logout()} 
                        className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold transition-all cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-slate-200 mb-8 gap-8">
                    <button 
                        onClick={() => setActiveTab("inquiries")}
                        className={`pb-4 text-lg font-bold transition-all border-b-2 cursor-pointer ${activeTab === "inquiries" ? "border-slate-900 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                    >
                        Inquiries ({inquiries.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab("doctors")}
                        className={`pb-4 text-lg font-bold transition-all border-b-2 cursor-pointer ${activeTab === "doctors" ? "border-slate-900 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                    >
                        Manage Doctors ({doctors.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab("stats")}
                        className={`pb-4 text-lg font-bold transition-all border-b-2 cursor-pointer ${activeTab === "stats" ? "border-slate-900 text-slate-950" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                    >
                        Overview/Stats
                    </button>
                </div>

                {loadingData ? (
                    <div className="py-12 flex items-center justify-center">
                        <div className="animate-spin h-10 w-10 border-4 border-slate-900 border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        
                        {/* 1. INQUIRIES TAB */}
                        {activeTab === "inquiries" && (
                            inquiries.length === 0 ? (
                                <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-12 text-center shadow-sm">
                                    <p className="text-slate-500 font-light">No patient inquiries submitted to the platform yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {inquiries.map((inq) => (
                                        <div key={inq.id} className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inquiry ID: {inq.id}</span>
                                                    <h3 className="text-xl font-bold text-slate-900 mt-1">{inq.subject}</h3>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        Patient: <span className="font-semibold">{inq.patientName}</span> ({inq.patientEmail}) | DOB: {inq.dateOfBirth} | Phone: {inq.phoneNumber}
                                                    </p>
                                                </div>
                                                <div>
                                                    {inq.status === "pending" && (
                                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                                            ⏳ Unassigned / Pending
                                                        </span>
                                                    )}
                                                    {inq.status === "assigned" && (
                                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                                                            👨‍⚕️ Assigned: {inq.doctorName}
                                                        </span>
                                                    )}
                                                    {inq.status === "answered" && (
                                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                                                            ✅ Answered by {inq.doctorName}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Inquiry Message</h4>
                                                    <p className="text-slate-700 mt-2 text-sm whitespace-pre-line leading-relaxed font-light">{inq.message}</p>
                                                </div>

                                                {inq.documents && inq.documents.length > 0 && (
                                                    <div>
                                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments</h4>
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {inq.documents.map((docUrl, idx) => (
                                                                <a 
                                                                    key={idx} 
                                                                    href={docUrl} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer" 
                                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                                                                >
                                                                    Document {idx + 1}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Assignment Controls */}
                                                {inq.status !== "answered" && (
                                                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                                        <div className="flex-grow">
                                                            <select
                                                                value={assignmentDoctor[inq.id] || ""}
                                                                onChange={(e) => setAssignmentDoctor(prev => ({ ...prev, [inq.id]: e.target.value }))}
                                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white transition-all outline-none"
                                                            >
                                                                <option value="">-- Choose Doctor to Assign --</option>
                                                                {doctors.map((doc) => (
                                                                    <option key={doc.uid} value={doc.uid}>
                                                                        {doc.fullName} ({doc.email})
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAssignInquiry(inq.id)}
                                                            disabled={isAssigning[inq.id]}
                                                            className="px-6 py-3 bg-slate-900 hover:bg-sky-600 disabled:opacity-50 text-white rounded-2xl text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                                        >
                                                            {isAssigning[inq.id] ? "Assigning..." : inq.status === "assigned" ? "Re-assign Doctor" : "Assign Doctor"}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {/* 2. DOCTORS TAB */}
                        {activeTab === "doctors" && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Doctor List */}
                                <div className="lg:col-span-7 space-y-6">
                                    <h3 className="text-2xl font-extrabold text-slate-900">Registered Doctors ({doctors.length})</h3>
                                    
                                    {doctors.length === 0 ? (
                                        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 text-center shadow-sm">
                                            <p className="text-slate-500 font-light">No doctors registered on the platform yet.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {doctors.map((doc) => (
                                                <div key={doc.uid} className="bg-white rounded-3xl border border-slate-200/50 p-6 flex justify-between items-center shadow-sm">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-lg">Dr. {doc.fullName}</h4>
                                                        <p className="text-slate-500 text-sm font-light mt-0.5">{doc.email}</p>
                                                        <p className="text-slate-400 text-xs mt-1">ID: {doc.uid}</p>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleDeleteDoctor(doc.uid)} 
                                                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all border border-rose-200/50 cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Doctor Registration Form */}
                                <div className="lg:col-span-5 bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-md sticky top-36">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Register New Doctor</h3>
                                    <p className="text-slate-500 text-sm mb-6 border-b border-slate-100 pb-4">Add a medical practitioner to the system</p>

                                    {doctorFormError && (
                                        <div className="mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold rounded-2xl">
                                            {doctorFormError}
                                        </div>
                                    )}
                                    {doctorFormSuccess && (
                                        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-2xl">
                                            {doctorFormSuccess}
                                        </div>
                                    )}

                                    <form onSubmit={handleRegisterDoctor} className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-slate-900 font-sans">Full Name</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={docName} 
                                                onChange={(e) => setDocName(e.target.value)} 
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none text-sm" 
                                                placeholder="Dr. Sithika Perera" 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-slate-900">Email Address</label>
                                            <input 
                                                type="email" 
                                                required 
                                                value={docEmail} 
                                                onChange={(e) => setDocEmail(e.target.value)} 
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none text-sm" 
                                                placeholder="doctor@healthlink.lk" 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-slate-900">Password</label>
                                            <input 
                                                type="password" 
                                                required 
                                                value={docPassword} 
                                                onChange={(e) => setDocPassword(e.target.value)} 
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none text-sm" 
                                                placeholder="•••••••• (Min 6 chars)" 
                                            />
                                        </div>
                                        <button 
                                            type="submit" 
                                            disabled={isCreatingDoctor}
                                            className="w-full rounded-2xl bg-slate-900 py-3.5 px-6 text-sm font-bold text-white shadow-lg hover:bg-sky-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 cursor-pointer"
                                        >
                                            {isCreatingDoctor ? (
                                                <>
                                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                                    Registering...
                                                </>
                                            ) : "Register Doctor"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* 3. STATS TAB */}
                        {activeTab === "stats" && (
                            <div className="space-y-8">
                                <h3 className="text-2xl font-extrabold text-slate-900">System Dashboard Analytics</h3>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm text-center">
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Inquiries</p>
                                        <p className="text-5xl font-black text-slate-900">{totalInquiries}</p>
                                    </div>
                                    <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm text-center">
                                        <p className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-2">Pending Assign</p>
                                        <p className="text-5xl font-black text-amber-600">{pendingInquiries}</p>
                                    </div>
                                    <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm text-center">
                                        <p className="text-sky-600 text-xs font-bold uppercase tracking-wider mb-2">Assigned Cases</p>
                                        <p className="text-5xl font-black text-sky-600">{assignedInquiries}</p>
                                    </div>
                                    <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-sm text-center">
                                        <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-2">Answered Cases</p>
                                        <p className="text-5xl font-black text-green-600">{answeredInquiries}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
                                    <h4 className="text-xl font-bold text-slate-900 mb-4">Core Platform Status</h4>
                                    <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed font-light">
                                        <p className="mb-2">This dashboard acts as the administrator orchestrator for Health Link.</p>
                                        <p className="mb-2">Admin Accounts have authority to retrieve database records, establish doctor credential profiles in Firebase Auth, and bind inquiries to practitioners.</p>
                                        <p className="mb-2">Currently loaded doctors: <span className="font-bold text-slate-800">{doctors.length} active practitioners</span>.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
