'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import StatCard from '@/components/ui/StatCard';
import { MOTIVATIONAL_QUOTES, GOAL_LABELS } from '@/lib/constants';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid, AreaChart, Area,
} from 'recharts';

// Sample demo data for charts
const weightData = [
    { day: 'Mon', weight: 75 }, { day: 'Tue', weight: 74.8 }, { day: 'Wed', weight: 74.5 },
    { day: 'Thu', weight: 74.7 }, { day: 'Fri', weight: 74.3 }, { day: 'Sat', weight: 74.1 },
    { day: 'Sun', weight: 73.8 },
];

const caloriesData = [
    { day: 'Mon', consumed: 2100, target: 2200 },
    { day: 'Tue', consumed: 2350, target: 2200 },
    { day: 'Wed', consumed: 2050, target: 2200 },
    { day: 'Thu', consumed: 2200, target: 2200 },
    { day: 'Fri', consumed: 1950, target: 2200 },
    { day: 'Sat', consumed: 2400, target: 2200 },
    { day: 'Sun', consumed: 2150, target: 2200 },
];

const proteinData = [
    { day: 'Mon', protein: 140 }, { day: 'Tue', protein: 155 }, { day: 'Wed', protein: 130 },
    { day: 'Thu', protein: 160 }, { day: 'Fri', protein: 145 }, { day: 'Sat', protein: 150 },
    { day: 'Sun', protein: 138 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
    const { user } = useAuth();
    const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);

    const profileComplete = user?.weight && user?.height && user?.age;

    useEffect(() => {
        const dayIndex = new Date().getDate() % MOTIVATIONAL_QUOTES.length;
        setQuote(MOTIVATIONAL_QUOTES[dayIndex]);
    }, []);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6"
        >
            {/* Setup Banner if profile not complete */}
            {!profileComplete && (
                <motion.div variants={itemVariants}>
                    <GlassCard hover={false} glow="purple" className="p-6">
                        <div className="flex items-start gap-4 flex-wrap">
                            <span className="text-3xl">📋</span>
                            <div className="flex-1 min-w-[200px]">
                                <h3 className="text-lg font-semibold text-white">Complete your profile to get started!</h3>
                                <p className="text-sm text-gray-400 mt-1">Add your body measurements and goals to get personalized diet plans, workouts, and accurate stats.</p>
                                <div className="flex gap-3 mt-4">
                                    <Link href="/profile">
                                        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
                                            ✏️ Edit Profile
                                        </button>
                                    </Link>
                                    <Link href="/onboarding">
                                        <button className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-sm hover:bg-white/[0.08] transition-all cursor-pointer">
                                            🚀 Quick Setup
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            )}

            {/* Motivational Banner */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} glow="cyan" className="p-6">
                    <div className="flex items-start gap-4">
                        <span className="text-3xl">💡</span>
                        <div>
                            <p className="text-white text-base italic leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
                            <p className="text-cyan-400 text-sm mt-2">— {quote.author}</p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Current Weight"
                    value={user?.weight || '—'}
                    unit={user?.weight ? 'kg' : ''}
                    icon="⚖️"
                    trend={user?.weight ? 'neutral' : undefined}
                    trendValue={user?.weight ? 'Set in profile' : 'Not set yet'}
                    color="cyan"
                />
                <StatCard
                    title="Calorie Target"
                    value={user?.calorieTarget || '—'}
                    unit={user?.calorieTarget ? 'kcal' : ''}
                    icon="🔥"
                    color="orange"
                />
                <StatCard
                    title="Protein Target"
                    value={user?.proteinTarget || '—'}
                    unit={user?.proteinTarget ? 'g' : ''}
                    icon="🥩"
                    color="purple"
                />
                <StatCard
                    title="BMI"
                    value={user?.bmi || '—'}
                    unit=""
                    icon="📊"
                    trend={user?.bmi ? 'neutral' : undefined}
                    trendValue={user?.bmi ? 'Normal range' : 'Not set yet'}
                    color="green"
                />
            </motion.div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weight Trend */}
                <motion.div variants={itemVariants}>
                    <GlassCard hover={false} className="p-5">
                        <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">
                            📉 Weight Trend
                        </h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={weightData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="day" stroke="#666" fontSize={12} />
                                <YAxis stroke="#666" fontSize={12} domain={['dataMin - 1', 'dataMax + 1']} />
                                <Tooltip
                                    contentStyle={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    labelStyle={{ color: '#999' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="weight"
                                    stroke="#00e5ff"
                                    strokeWidth={3}
                                    dot={{ fill: '#00e5ff', r: 5 }}
                                    activeDot={{ r: 7, fill: '#00e5ff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </motion.div>

                {/* Calories This Week */}
                <motion.div variants={itemVariants}>
                    <GlassCard hover={false} className="p-5">
                        <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">
                            🔥 Calories This Week
                        </h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={caloriesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="day" stroke="#666" fontSize={12} />
                                <YAxis stroke="#666" fontSize={12} />
                                <Tooltip
                                    contentStyle={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    labelStyle={{ color: '#999' }}
                                />
                                <Bar dataKey="consumed" fill="#a855f7" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="target" fill="rgba(168,85,247,0.2)" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </motion.div>
            </div>

            {/* Protein Chart */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-5">
                    <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">
                        🥩 Protein Intake
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={proteinData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="day" stroke="#666" fontSize={12} />
                            <YAxis stroke="#666" fontSize={12} />
                            <Tooltip
                                contentStyle={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                labelStyle={{ color: '#999' }}
                            />
                            <defs>
                                <linearGradient id="proteinGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#39ff14" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#39ff14" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="protein" stroke="#39ff14" strokeWidth={2} fill="url(#proteinGrad)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </GlassCard>
            </motion.div>

            {/* Quick Info */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-5">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🎯</span>
                            <div>
                                <p className="text-sm text-gray-400">Current Goal</p>
                                <p className="text-white font-semibold">{GOAL_LABELS[user?.goal || ''] || 'Not Set'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔥</span>
                            <div>
                                <p className="text-sm text-gray-400">Workout Streak</p>
                                <p className="text-white font-semibold">—</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">💧</span>
                            <div>
                                <p className="text-sm text-gray-400">Water Today</p>
                                <p className="text-white font-semibold">—</p>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </motion.div>
    );
}
