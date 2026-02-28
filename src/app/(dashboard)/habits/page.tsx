'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

interface Habit {
    name: string;
    icon: string;
    target: number;
    achieved: number;
    unit: string;
    completed: boolean;
}

const defaultHabits: Habit[] = [
    { name: 'Water', icon: '💧', target: 10, achieved: 0, unit: 'glasses', completed: false },
    { name: 'Sleep', icon: '😴', target: 8, achieved: 0, unit: 'hours', completed: false },
    { name: 'Steps', icon: '🚶', target: 10000, achieved: 0, unit: 'steps', completed: false },
    { name: 'Workout', icon: '🏋️', target: 1, achieved: 0, unit: 'session', completed: false },
    { name: 'Meditation', icon: '🧘', target: 1, achieved: 0, unit: 'session', completed: false },
    { name: 'Protein Goal', icon: '🥩', target: 150, achieved: 0, unit: 'grams', completed: false },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitsPage() {
    const [habits, setHabits] = useState<Habit[]>(defaultHabits);
    const [weekData, setWeekData] = useState<Record<string, number>>({});

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const saved = localStorage.getItem(`physique_habits_${today}`);
        if (saved) {
            setHabits(JSON.parse(saved));
        }
        // Load week data
        const week: Record<string, number> = {};
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            const dayData = localStorage.getItem(`physique_habits_${key}`);
            if (dayData) {
                const parsed: Habit[] = JSON.parse(dayData);
                week[DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1]] = parsed.filter(h => h.completed).length;
            }
        }
        setWeekData(week);
    }, []);

    const toggleHabit = (index: number) => {
        const updated = habits.map((h, i) => {
            if (i === index) {
                const newCompleted = !h.completed;
                return { ...h, completed: newCompleted, achieved: newCompleted ? h.target : 0 };
            }
            return h;
        });
        setHabits(updated);
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`physique_habits_${today}`, JSON.stringify(updated));
    };

    const completedCount = habits.filter(h => h.completed).length;
    const completionPercent = Math.round((completedCount / habits.length) * 100);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                    ✅ Habit Tracker
                </h1>
                <p className="text-sm text-gray-400 mt-1">Build consistency, one day at a time</p>
            </motion.div>

            {/* Daily Progress */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} glow="cyan" className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-white">Today&apos;s Progress</h3>
                        <span className="text-2xl font-bold text-cyan-400">{completionPercent}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${completionPercent}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{completedCount} of {habits.length} habits completed</p>
                </GlassCard>
            </motion.div>

            {/* Habit Toggles */}
            <motion.div variants={itemVariants} className="space-y-3">
                {habits.map((habit, index) => (
                    <motion.div
                        key={habit.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <GlassCard hover className="p-4" onClick={() => toggleHabit(index)}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${habit.completed ? 'bg-green-500/20' : 'bg-white/[0.04]'
                                        }`}>
                                        {habit.icon}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${habit.completed ? 'text-green-400' : 'text-white'}`}>
                                            {habit.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Target: {habit.target} {habit.unit}
                                        </p>
                                    </div>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${habit.completed
                                        ? 'border-green-400 bg-green-400'
                                        : 'border-gray-600'
                                    }`}>
                                    {habit.completed && <span className="text-xs text-white">✓</span>}
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* Weekly Overview */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-5">
                    <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">
                        📅 This Week
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                        {DAYS.map(day => {
                            const count = weekData[day] || 0;
                            const intensity = count === 0 ? 'bg-white/[0.04]' :
                                count <= 2 ? 'bg-green-500/20' :
                                    count <= 4 ? 'bg-green-500/40' : 'bg-green-500/70';
                            return (
                                <div key={day} className="text-center">
                                    <p className="text-[10px] text-gray-500 mb-1">{day}</p>
                                    <div className={`w-full aspect-square rounded-lg ${intensity} flex items-center justify-center`}>
                                        <span className="text-xs text-white">{count || '-'}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GlassCard>
            </motion.div>
        </motion.div>
    );
}
