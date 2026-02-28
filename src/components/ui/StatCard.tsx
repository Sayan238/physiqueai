'use client';

import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

interface StatCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    color?: 'cyan' | 'purple' | 'green' | 'orange';
}

export default function StatCard({
    title,
    value,
    unit,
    icon,
    trend,
    trendValue,
    color = 'cyan',
}: StatCardProps) {
    const colorStyles: Record<string, { text: string; bg: string; glow: string }> = {
        cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]' },
        purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]' },
        green: { text: 'text-green-400', bg: 'bg-green-500/10', glow: 'group-hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]' },
        orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'group-hover:shadow-[0_0_20px_rgba(255,165,0,0.15)]' },
    };

    const trendColors: Record<string, string> = {
        up: 'text-green-400',
        down: 'text-red-400',
        neutral: 'text-gray-400',
    };

    const trendIcons: Record<string, string> = {
        up: '↑',
        down: '↓',
        neutral: '→',
    };

    return (
        <GlassCard hover={false} className={`p-5 group ${colorStyles[color].glow} transition-shadow duration-300`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">{title}</p>
                    <div className="flex items-baseline gap-1">
                        <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
                            className="text-2xl font-bold text-white"
                        >
                            {value}
                        </motion.span>
                        {unit && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-sm text-gray-400"
                            >
                                {unit}
                            </motion.span>
                        )}
                    </div>
                    {trend && trendValue && (
                        <motion.p
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`text-xs mt-1 ${trendColors[trend]}`}
                        >
                            {trendIcons[trend]} {trendValue}
                        </motion.p>
                    )}
                </div>
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                    className={`p-3 rounded-xl ${colorStyles[color].bg} transition-all duration-300`}
                >
                    <span className={`text-2xl ${colorStyles[color].text}`}>{icon}</span>
                </motion.div>
            </div>
        </GlassCard>
    );
}
