'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const mobileNavItems = [
    { href: '/dashboard', label: 'Home', icon: '🏠' },
    { href: '/diet', label: 'Diet', icon: '🥗' },
    { href: '/workout', label: 'Workout', icon: '💪' },
    { href: '/ai-chat', label: 'AI Coach', icon: '🤖' },
    { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a12]/90 backdrop-blur-xl border-t border-white/[0.08]">
            <div className="flex items-center justify-around px-2 py-2">
                {mobileNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className="flex-1">
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className={`flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-500'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-[10px] font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-active"
                                        className="w-4 h-0.5 rounded-full bg-cyan-400 mt-0.5"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
