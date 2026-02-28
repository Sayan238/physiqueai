'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile as updateFirebaseAuthProfile,
    User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to convert FirebaseUser to our app's User type
const mapFirebaseUser = (fbUser: FirebaseUser): User => {
    return {
        _id: fbUser.uid,
        email: fbUser.email || '',
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        avatar: fbUser.photoURL || undefined,
        profileComplete: false, // You could store this in Firestore later
    };
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        loading: true,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
                const token = await fbUser.getIdToken();
                setState({
                    user: mapFirebaseUser(fbUser),
                    token,
                    loading: false,
                });
            } else {
                setState({ user: null, token: null, loading: false });
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // State updates automatically via onAuthStateChanged
        } catch (error) {
            setState(prev => ({ ...prev, loading: false }));
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Update the display name right after creation
            await updateFirebaseAuthProfile(userCredential.user, { displayName: name });
            // State updates automatically via onAuthStateChanged
        } catch (error) {
            setState(prev => ({ ...prev, loading: false }));
            throw error;
        }
    };

    const googleLogin = async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // State updates automatically via onAuthStateChanged
        } catch (error) {
            setState(prev => ({ ...prev, loading: false }));
            throw error;
        }
    };

    const logout = async () => {
        setState(prev => ({ ...prev, loading: true }));
        try {
            await signOut(auth);
            // State updates automatically via onAuthStateChanged
        } catch (error) {
            setState(prev => ({ ...prev, loading: false }));
            throw error;
        }
    };

    const updateUser = (data: Partial<User>) => {
        if (state.user) {
            const updated = { ...state.user, ...data };
            setState(prev => ({ ...prev, user: updated }));
            // Note: To persist this securely, you would save it to Firestore here.
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, googleLogin, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

