'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/context/AuthContext';
import SplashScreen from '@/components/ui/SplashScreen';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function Providers({ children }: { children: React.ReactNode }) {
    if (GOOGLE_CLIENT_ID) {
        return (
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AuthProvider>
                    <SplashScreen>
                        {children}
                    </SplashScreen>
                </AuthProvider>
            </GoogleOAuthProvider>
        );
    }

    return (
        <AuthProvider>
            <SplashScreen>
                {children}
            </SplashScreen>
        </AuthProvider>
    );
}

