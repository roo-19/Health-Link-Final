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
import CountryList from "country-list-with-dial-code-and-flag";

interface UserProfile {
    uid: string;
    fullName: string;
    email: string;
    role: "client" | "doctor" | "admin";
    createdAt: any;
    approved?: boolean;
    specialization?: string;
    licenseNumber?: string;
    phoneNumber?: string;
}

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

export default function AdminDashboard() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [doctors, setDoctors] = useState<UserProfile[]>([]);
    const [answers, setAnswers] = useState<any[]>([]);
    const [selectedDoctorForView, setSelectedDoctorForView] = useState<UserProfile | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [activeTab, setActiveTab] = useState<"inquiries" | "doctors" | "stats">("inquiries");

    // Doctor Registration form state
    const [docName, setDocName] = useState("");
    const [docEmail, setDocEmail] = useState("");
    const [docPassword, setDocPassword] = useState("");
    const [docSpecialization, setDocSpecialization] = useState("");
    const [docLicenseNumber, setDocLicenseNumber] = useState("");
    const [docCountryCode, setDocCountryCode] = useState("+94");
    const [docPhone, setDocPhone] = useState("");
    const [isCreatingDoctor, setIsCreatingDoctor] = useState(false);

    const countries = React.useMemo(() => {
        const list = CountryList.getAll();
        const lk = list.find((c) => c.code === "LK");
        const rest = list.filter((c) => c.code !== "LK").sort((a, b) => a.name.localeCompare(b.name));
        return [lk, ...rest].filter((c): c is any => !!c);
    }, []);
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
                if (profile.role === "client") router.push("/client/dashboard");
            }
        }
    }, [user, profile, loading, router]);

    // Fetch all inquiries
    useEffect(() => {
        if (!user || !profile || profile.role !== "admin") return;

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

    // Fetch all answers
    useEffect(() => {
        if (!user || !profile || profile.role !== "admin") return;

        const q = query(collection(db, "answers"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: any[] = [];
            snapshot.forEach((doc) => {
                list.push(doc.data());
            });
            setAnswers(list);
        }, (err) => {
            console.error("Error fetching answers:", err);
        });

        return () => unsubscribe();
    }, [user, profile]);

    // Fetch all doctors
    useEffect(() => {
        if (!user || !profile || profile.role !== "admin") return;

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
                approved: true, // Admin-created doctors are approved automatically
                specialization: docSpecialization,
                licenseNumber: docLicenseNumber,
                phoneNumber: `${docCountryCode} ${docPhone}`,
                createdAt: serverTimestamp(),
            });

            // 4. Sign out of secondary auth and delete secondary app
            await secondarySignOut(secondaryAuth);
            await deleteApp(secondaryApp);

            // Clear state on success
            setDocName("");
            setDocEmail("");
            setDocPassword("");
            setDocSpecialization("");
            setDocLicenseNumber("");
            setDocPhone("");
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

    const handleApproveDoctor = async (doctorUid: string) => {
        try {
            await updateDoc(doc(db, "users", doctorUid), {
                approved: true
            });
            alert("Doctor approved successfully!");
        } catch (err: any) {
            console.error("Error approving doctor:", err);
            alert(err.message || "Failed to approve doctor.");
        }
    };

    const handleDeclineDoctor = async (doctorUid: string, docName: string) => {
        if (!confirm(`Are you sure you want to decline and remove the registration request for Dr. ${docName}?`)) return;
        try {
            await deleteDoc(doc(db, "users", doctorUid));
        } catch (err) {
            console.error("Error declining doctor:", err);
            alert("Error declining doctor request.");
        }
    };

    // Computations for stats
    const totalInquiries = inquiries.length;
    const pendingInquiries = inquiries.filter((i) => i.status === "pending").length;
    const assignedInquiries = inquiries.filter((i) => i.status === "assigned").length;
    const answeredInquiries = inquiries.filter((i) => i.status === "answered").length;

    const pendingDoctors = doctors.filter((doc) => doc.approved === false);
    const activeDoctors = doctors.filter((doc) => doc.approved !== false);

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

            <section className="pt-40 sm:pt-48 pb-24 flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
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
                                    <p className="text-slate-500 font-light">No client inquiries submitted to the platform yet.</p>
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
                                                        Client: <span className="font-semibold">{inq.clientName}</span> ({inq.clientEmail}) | DOB: {inq.dateOfBirth} | Phone: {inq.phoneNumber}
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
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Inquiry Message</h4>
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
                                <div className="lg:col-span-7 space-y-8">
                                    
                                    {/* Section A: Pending Approvals */}
                                    <div>
                                        <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                                            Pending Approvals 
                                            {pendingDoctors.length > 0 && (
                                                <span className="bg-amber-105 border border-amber-200 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                                                    {pendingDoctors.length} New
                                                </span>
                                            )}
                                        </h3>
                                        
                                        {pendingDoctors.length === 0 ? (
                                            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] p-6 text-center mt-4">
                                                <p className="text-slate-400 font-light text-sm">No pending registration requests.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 mt-4">
                                                {pendingDoctors.map((doc) => (
                                                    <div key={doc.uid} className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm border-l-4 border-l-amber-500">
                                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="font-bold text-slate-900 text-lg">Dr. {doc.fullName}</h4>
                                                                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md uppercase">SLMC Review Required</span>
                                                                </div>
                                                                {doc.specialization && (
                                                                    <p className="text-indigo-600 font-semibold text-sm mt-0.5">{doc.specialization}</p>
                                                                )}
                                                                <p className="text-slate-500 text-sm mt-0.5">{doc.email} • {doc.phoneNumber || "No Phone"}</p>
                                                                {doc.licenseNumber && (
                                                                    <div className="mt-2 bg-slate-50 border border-slate-100 rounded-lg p-2 flex items-center justify-between w-fit gap-4">
                                                                        <span className="text-slate-500 text-xs font-medium">SLMC Number:</span>
                                                                        <span className="text-slate-800 font-mono text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">{doc.licenseNumber}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                                                <button 
                                                                    onClick={() => handleApproveDoctor(doc.uid)} 
                                                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleDeclineDoctor(doc.uid, doc.fullName)} 
                                                                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all border border-rose-200/50 cursor-pointer"
                                                                >
                                                                    Decline
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Section B: Active Doctors */}
                                    <div className="pt-6 border-t border-slate-200">
                                        <h3 className="text-2xl font-extrabold text-slate-900">Active Doctors ({activeDoctors.length})</h3>
                                        
                                        {activeDoctors.length === 0 ? (
                                            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 text-center shadow-sm mt-4">
                                                <p className="text-slate-500 font-light">No active doctors on the platform yet.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 mt-4">
                                                {activeDoctors.map((doc) => (
                                                    <div key={doc.uid} className="bg-white rounded-3xl border border-slate-200/50 p-6 flex justify-between items-center shadow-sm">
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-slate-900 text-lg">Dr. {doc.fullName}</h4>
                                                            {doc.specialization && (
                                                                <p className="text-sky-600 font-semibold text-sm mt-0.5">{doc.specialization}</p>
                                                            )}
                                                            <p className="text-slate-500 text-sm mt-0.5">{doc.email} • {doc.phoneNumber || "No Phone"}</p>
                                                            {doc.licenseNumber && (
                                                                <p className="text-slate-400 text-xs mt-0.5">License: {doc.licenseNumber}</p>
                                                            )}
                                                            <p className="text-slate-400 text-xs mt-1">ID: {doc.uid}</p>
                                                         </div>
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => setSelectedDoctorForView(doc)} 
                                                                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 cursor-pointer"
                                                            >
                                                                View Activity
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteDoctor(doc.uid)} 
                                                                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all border border-rose-200/50 cursor-pointer"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-slate-900">Specialization</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={docSpecialization} 
                                                onChange={(e) => setDocSpecialization(e.target.value)} 
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none text-sm" 
                                                placeholder="Cardiologist, Ayurvedic, etc." 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-slate-900">Medical License Number</label>
                                            <input 
                                                type="text" 
                                                required 
                                                value={docLicenseNumber} 
                                                onChange={(e) => setDocLicenseNumber(e.target.value)} 
                                                className="w-full rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all outline-none text-sm" 
                                                placeholder="SLMC-12345" 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-slate-900">Phone Number</label>
                                            <div className="flex rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-sky-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
                                                <select 
                                                    value={docCountryCode} 
                                                    onChange={(e) => setDocCountryCode(e.target.value)} 
                                                    className="bg-transparent pl-4 pr-1 text-slate-800 font-semibold outline-none border-r border-slate-200 cursor-pointer text-sm shrink-0 max-w-[120px]"
                                                >
                                                    {countries.map((c, idx) => (
                                                        <option key={`${c.code}-${c.dialCode}-${idx}`} value={c.dialCode}>
                                                            {c.flag} {c.dialCode} ({c.code})
                                                        </option>
                                                    ))}
                                                </select>
                                                <input 
                                                    type="tel" 
                                                    required 
                                                    value={docPhone} 
                                                    onChange={(e) => setDocPhone(e.target.value)} 
                                                    className="w-full bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none border-none text-sm" 
                                                    placeholder="77 123 4567" 
                                                />
                                            </div>
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

                        {/* 4. DOCTOR DETAILS VIEW MODAL */}
                        {selectedDoctorForView && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                                <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
                                    {/* Modal Header */}
                                    <div className="px-8 py-6 bg-slate-900 text-white flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-extrabold">Practitioner Activity Profile</h3>
                                            <p className="text-slate-400 text-xs mt-1">Reviewing clinical actions and patient responses</p>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedDoctorForView(null)}
                                            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-2 rounded-full hover:bg-slate-800"
                                        >
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Modal Content */}
                                    <div className="p-8 overflow-y-auto space-y-8 flex-1">
                                        {/* Doctor Profile Details Header Card */}
                                        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Doctor Name</p>
                                                <p className="text-base font-extrabold text-slate-900">{selectedDoctorForView.fullName}</p>
                                                <p className="text-xs text-sky-600 font-semibold mt-1">🩺 {selectedDoctorForView.specialization}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                                                <p className="text-sm font-semibold text-slate-800 break-all">{selectedDoctorForView.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Number</p>
                                                <p className="text-sm font-semibold text-slate-800">{selectedDoctorForView.phoneNumber || "Not Provided"}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">SLMC License</p>
                                                <p className="text-sm font-bold text-slate-900 bg-slate-200/60 px-3 py-1 rounded-xl inline-block mt-0.5">
                                                    {selectedDoctorForView.licenseNumber}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Activity Stats */}
                                        {(() => {
                                            const assignedInquiries = inquiries.filter(i => i.doctorId === selectedDoctorForView.uid);
                                            const answeredCount = assignedInquiries.filter(i => i.status === 'answered').length;
                                            const pendingCount = assignedInquiries.length - answeredCount;

                                            return (
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="bg-slate-50 border border-slate-200/50 p-5 rounded-2xl text-center shadow-sm">
                                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Assigned Cases</p>
                                                            <p className="text-3xl font-black text-slate-900">{assignedInquiries.length}</p>
                                                        </div>
                                                        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center shadow-sm">
                                                            <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">Resolved Cases</p>
                                                            <p className="text-3xl font-black text-emerald-700">{answeredCount}</p>
                                                        </div>
                                                        <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl text-center shadow-sm">
                                                            <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">Pending Cases</p>
                                                            <p className="text-3xl font-black text-amber-700">{pendingCount}</p>
                                                        </div>
                                                    </div>

                                                    {/* Inquiries & Answers List */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-lg font-bold text-slate-900">Assigned Inquiries & Practitioner Answers</h4>

                                                        {assignedInquiries.length === 0 ? (
                                                            <div className="text-center py-12 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                                                                <p className="text-slate-400 text-sm">No cases have been assigned to this doctor yet.</p>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-6">
                                                                {assignedInquiries.map((inq) => {
                                                                    const inqAnswer = answers.find(a => a.inquiryId === inq.id && a.doctorId === selectedDoctorForView.uid);

                                                                    return (
                                                                        <div key={inq.id} className="border border-slate-200/80 bg-white rounded-3xl p-6 space-y-4 shadow-sm hover:border-slate-300 transition-colors">
                                                                            {/* Inquiry Header */}
                                                                            <div className="flex flex-wrap justify-between items-start gap-2">
                                                                                <div>
                                                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Details</span>
                                                                                    <p className="text-sm font-semibold text-slate-800">
                                                                                        {inq.clientName} (DOB: {inq.dateOfBirth})
                                                                                    </p>
                                                                                </div>
                                                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                                                    inq.status === "answered" 
                                                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" 
                                                                                        : "bg-amber-50 text-amber-700 border border-amber-200/50"
                                                                                }`}>
                                                                                    {inq.status}
                                                                                </span>
                                                                            </div>

                                                                            {/* Subject & Patient Message */}
                                                                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                                                                                <p className="text-sm font-bold text-slate-900">Subject: {inq.subject}</p>
                                                                                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                                                                                    {inq.message}
                                                                                </p>
                                                                            </div>

                                                                            {/* Answer Details */}
                                                                            {inq.status === "answered" && (
                                                                                <div className="border-t border-slate-100 pt-4 space-y-2">
                                                                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                                                        <span className="font-bold text-emerald-600">RESPONSE BY DOCTOR</span>
                                                                                        <span>•</span>
                                                                                        <span>
                                                                                            {inqAnswer?.createdAt?.seconds 
                                                                                                ? new Date(inqAnswer.createdAt.seconds * 1000).toLocaleString()
                                                                                                : "Recently submitted"
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <p className="text-sm text-slate-800 font-semibold bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-4 whitespace-pre-wrap leading-relaxed">
                                                                                        {inqAnswer?.answer || "Answer loaded successfully (details saved in records)"}
                                                                                    </p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        )}

            <Footer />
        </main>
    );
}
