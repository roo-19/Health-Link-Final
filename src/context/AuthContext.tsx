"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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
    dateOfBirth?: string;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    // Fetch user profile from Firestore
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setProfile(userDocSnap.data() as UserProfile);
                    } else {
                        console.error("No profile document found for authenticated user:", firebaseUser.uid);
                        setProfile(null);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
