'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import StatCard from '@/components/ui/StatCard';
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { ProgressEntry } from '@/types';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Generate demo progress data for the last 30 days
function generateDemoData(): ProgressEntry[] {
    const data: ProgressEntry[] = [];
    const now = new Date();
    let weight = 75;
    for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        weight = Math.max(68, weight + (Math.random() - 0.55) * 0.5);
        data.push({
            date: date.toISOString().split('T')[0],
            weight: parseFloat(weight.toFixed(1)),
            caloriesConsumed: 1800 + Math.floor(Math.random() * 600),
            proteinConsumed: 120 + Math.floor(Math.random() * 60),
            waterGlasses: 6 + Math.floor(Math.random() * 6),
        });
    }
    return data;
}

export default function ProgressPage() {
    const { user } = useAuth();
    const [data, setData] = useState<ProgressEntry[]>([]);
    const [newWeight, setNewWeight] = useState('');
    const [newCalories, setNewCalories] = useState('');
    const [newProtein, setNewProtein] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('physique_progress');
        if (saved) {
            setData(JSON.parse(saved));
        } else {
            const demo = generateDemoData();
            setData(demo);
            localStorage.setItem('physique_progress', JSON.stringify(demo));
        }
    }, []);

    const addEntry = () => {
        if (!newWeight && !newCalories && !newProtein) return;
        const entry: ProgressEntry = {
            date: new Date().toISOString().split('T')[0],
            weight: parseFloat(newWeight) || data[data.length - 1]?.weight || 70,
            caloriesConsumed: parseInt(newCalories) || 0,
            proteinConsumed: parseInt(newProtein) || 0,
            waterGlasses: 8,
        };
        const updated = [...data, entry];
        setData(updated);
        localStorage.setItem('physique_progress', JSON.stringify(updated));
        setNewWeight('');
        setNewCalories('');
        setNewProtein('');
    };

    const chartData = data.slice(-14).map(d => ({
        day: new Date(d.date).toLocaleDateString('en', { day: '2-digit', month: 'short' }),
        weight: d.weight,
        calories: d.caloriesConsumed,
        protein: d.proteinConsumed,
    }));

    const latestWeight = data.length > 0 ? data[data.length - 1].weight : 0;
    const startWeight = data.length > 7 ? data[data.length - 8].weight : data[0]?.weight || 0;
    const weightChange = parseFloat((latestWeight - startWeight).toFixed(1));

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6 max-w-5xl mx-auto"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                    📈 Progress Tracker
                </h1>
                <p className="text-sm text-gray-400 mt-1">Track your transformation journey</p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Current Weight" value={latestWeight} unit="kg" icon="⚖️" color="cyan"
                    trend={weightChange <= 0 ? 'down' : 'up'} trendValue={`${weightChange > 0 ? '+' : ''}${weightChange} kg this week`} />
                <StatCard title="Target" value={user?.calorieTarget || 2200} unit="kcal" icon="🎯" color="orange" />
                <StatCard title="Avg Protein" value={Math.round(data.slice(-7).reduce((a, b) => a + b.proteinConsumed, 0) / Math.max(data.slice(-7).length, 1))} unit="g/day" icon="🥩" color="purple" />
                <StatCard title="Days Tracked" value={data.length} unit="" icon="📊" color="green" />
            </motion.div>

            {/* Quick Log */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-5">
                    <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">
                        ➕ Quick Log Today
                    </h3>
                    <div className="flex items-end gap-3 flex-wrap">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Weight (kg)</label>
                            <input type="number" value={newWeight} onChange={e => setNewWeight(e.target.value)}
                                placeholder="73.5" className="w-28 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Calories</label>
                            <input type="number" value={newCalories} onChange={e => setNewCalories(e.target.value)}
                                placeholder="2200" className="w-28 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Protein (g)</label>
                            <input type="number" value={newProtein} onChange={e => setNewProtein(e.target.value)}
                                placeholder="150" className="w-28 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50" />
                        </div>
                        <button onClick={addEntry} className="px-5 py-2 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-400 transition-colors cursor-pointer">
                            Log →
                        </button>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Weight Chart */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-5">
                    <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">📉 Weight Trend (14 Days)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="day" stroke="#666" fontSize={11} />
                            <YAxis stroke="#666" fontSize={11} domain={['dataMin - 1', 'dataMax + 1']} />
                            <Tooltip contentStyle={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                            <Line type="monotone" dataKey="weight" stroke="#00e5ff" strokeWidth={3} dot={{ fill: '#00e5ff', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </GlassCard>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calories Chart */}
                <motion.div variants={itemVariants}>
                    <GlassCard hover={false} className="p-5">
                        <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">🔥 Calories (14 Days)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="day" stroke="#666" fontSize={10} />
                                <YAxis stroke="#666" fontSize={10} />
                                <Tooltip contentStyle={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                <Bar dataKey="calories" fill="#a855f7" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </motion.div>

                {/* Protein Chart */}
                <motion.div variants={itemVariants}>
                    <GlassCard hover={false} className="p-5">
                        <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">🥩 Protein (14 Days)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="day" stroke="#666" fontSize={10} />
                                <YAxis stroke="#666" fontSize={10} />
                                <Tooltip contentStyle={{ background: '#141420', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                <defs>
                                    <linearGradient id="proteinGrad2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#39ff14" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#39ff14" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="protein" stroke="#39ff14" strokeWidth={2} fill="url(#proteinGrad2)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </motion.div>
            </div>
        </motion.div>
    );
}
