'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/calculator', label: 'Calculator', icon: '🧮' },
    { href: '/diet', label: 'Diet Plan', icon: '🥗' },
    { href: '/workout', label: 'Workout', icon: '💪' },
    { href: '/progress', label: 'Progress', icon: '📈' },
    { href: '/habits', label: 'Habits', icon: '✅' },
    { href: '/motivation', label: 'Motivation', icon: '🔥' },
    { href: '/ai-chat', label: 'AI Coach', icon: '🤖' },
    { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#0a0a12]/80 backdrop-blur-xl border-r border-white/[0.06] z-40">
            {/* Logo */}
            <div className="p-6 border-b border-white/[0.06]">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xl font-bold">
                        P
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">PhysiqueAI</h1>
                        <p className="text-[10px] text-cyan-400 tracking-widest uppercase">AI Fitness Coach</p>
                    </div>
                </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-sm font-bold text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user?.email || ''}</p>
                    </div>
                </div>
                <Link
                    href="/"
                    className="w-full flex items-center gap-2 px-4 py-2 mb-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                    <span>🏠</span> Home Page
                </Link>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                    <span>🚪</span> Logout
                </button>
            </div>
        </aside>
    );
}
