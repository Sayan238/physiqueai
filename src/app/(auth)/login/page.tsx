'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GradientButton from '@/components/ui/GradientButton';
import GoogleLoginButton from '@/components/ui/GoogleLoginButton';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setIsLoading(true);
        try {
            await login(email, password);
            router.push('/dashboard');
        } catch (err: any) {
            // Check for common Firebase errors
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please try again later.');
            } else {
                setError(err.message || 'Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#06060a] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                            P
                        </div>
                        <span className="text-2xl font-bold text-white font-[family-name:var(--font-outfit)]">PhysiqueAI</span>
                    </Link>
                    <p className="text-sm text-gray-500 mt-3">Welcome back, champion 💪</p>
                </div>

                {/* Form Card */}
                <div className="p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]">
                    <h2 className="text-2xl font-bold text-white mb-6 font-[family-name:var(--font-outfit)]">Sign In</h2>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                            />
                        </div>

                        <GradientButton type="submit" fullWidth disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </GradientButton>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/[0.08]" />
                        <span className="text-xs text-gray-500">or</span>
                        <div className="flex-1 h-px bg-white/[0.08]" />
                    </div>

                    {/* Google Sign-In */}
                    <GoogleLoginButton redirectTo="/dashboard" />
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
