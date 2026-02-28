'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
    glow?: 'cyan' | 'purple' | 'green' | 'none';
}

export default function GlassCard({
    children,
    className = '',
    hover = true,
    onClick,
    glow = 'none',
}: GlassCardProps) {
    const glowStyles: Record<string, string> = {
        cyan: 'shadow-[0_0_30px_rgba(0,229,255,0.08)]',
        purple: 'shadow-[0_0_30px_rgba(168,85,247,0.08)]',
        green: 'shadow-[0_0_30px_rgba(57,255,20,0.08)]',
        none: '',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={hover ? {
                y: -4,
                scale: 1.01,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
            } : undefined}
            onClick={onClick}
            className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.04] backdrop-blur-xl
        border border-white/[0.08]
        animate-shimmer-border
        ${glowStyles[glow]}
        ${hover ? 'cursor-pointer transition-shadow hover:shadow-lg hover:border-white/[0.15]' : ''}
        ${className}
      `}
        >
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-cyan-500/[0.02] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Subtle shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent pointer-events-none animate-[shimmer_8s_ease-in-out_infinite]" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
