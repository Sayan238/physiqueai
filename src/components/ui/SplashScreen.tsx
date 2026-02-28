'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showSplash && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#06060a] overflow-hidden"
                    >
                        {/* Animated background gradient orbs */}
                        <div className="absolute inset-0">
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
                                    filter: 'blur(60px)',
                                    x: '-50%', y: '-50%',
                                }}
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
                                    filter: 'blur(60px)',
                                    x: '-30%', y: '-60%',
                                }}
                                animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                        </div>

                        {/* Centered logo + text */}
                        <div className="relative flex flex-col items-center">
                            {/* Pulse ring behind logo */}
                            <motion.div
                                className="absolute w-28 h-28 rounded-2xl border-2 border-cyan-500/30"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: [0.8, 1.4, 1.8], opacity: [0.6, 0.3, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute w-28 h-28 rounded-2xl border-2 border-purple-500/20"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: [0.8, 1.6, 2.2], opacity: [0.4, 0.2, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
                            />

                            {/* Logo icon */}
                            <motion.div
                                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-cyan-500/20"
                                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                            >
                                <motion.span
                                    className="text-5xl font-black text-white"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300, delay: 0.5 }}
                                >
                                    P
                                </motion.span>
                            </motion.div>

                            {/* App name */}
                            <motion.h1
                                className="mt-6 text-3xl font-black text-white font-[family-name:var(--font-outfit)] tracking-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                Physique
                                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">AI</span>
                            </motion.h1>

                            {/* Tagline */}
                            <motion.p
                                className="mt-2 text-sm text-gray-500 tracking-widest uppercase"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 }}
                            >
                                AI-Powered Fitness Coach
                            </motion.p>

                            {/* Loading bar */}
                            <motion.div
                                className="mt-8 w-48 h-1 rounded-full bg-white/[0.06] overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                <motion.div
                                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual app content — always mounted for SSR */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showSplash ? 0 : 1 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </>
    );
}
