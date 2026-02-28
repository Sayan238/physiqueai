'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Topbar() {
    const { user } = useAuth();

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <header className="sticky top-0 z-30 bg-[#06060a]/60 backdrop-blur-xl border-b border-white/[0.06]">
            <div className="flex items-center justify-between px-6 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {greeting()}, <span className="text-cyan-400">{user?.name?.split(' ')[0] || 'Champion'}</span> 👋
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Let&apos;s crush your fitness goals today</p>
                </div>

                {/* Mobile Logo */}
                <Link href="/" className="lg:hidden flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                        P
                    </div>
                    <span className="text-sm font-bold text-white">PhysiqueAI</span>
                </Link>

                <div className="hidden lg:flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400">
                        🎯 Goal: <span className="text-cyan-400 capitalize">{user?.goal?.replace('_', ' ') || 'Not set'}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
