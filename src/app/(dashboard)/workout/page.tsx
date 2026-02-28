'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { generateWorkoutPlan } from '@/lib/workout-generator';
import { WorkoutPlan } from '@/types';
import { GOAL_LABELS, EXPERIENCE_LABELS } from '@/lib/constants';

// Muscle group → Unsplash workout images
const muscleImages: Record<string, string> = {
    // Chest
    'Chest': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80&auto=format&fit=crop',
    // Back
    'Back': 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&q=80&auto=format&fit=crop',
    'Lats': 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=400&q=80&auto=format&fit=crop',
    // Shoulders
    'Shoulders': 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&q=80&auto=format&fit=crop',
    'Front Delts': 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&q=80&auto=format&fit=crop',
    'Side Delts': 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&q=80&auto=format&fit=crop',
    'Rear Delts': 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&q=80&auto=format&fit=crop',
    // Arms
    'Triceps': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80&auto=format&fit=crop',
    'Biceps': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80&auto=format&fit=crop',
    // Legs
    'Quads': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80&auto=format&fit=crop',
    'Hamstrings': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80&auto=format&fit=crop',
    'Glutes': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80&auto=format&fit=crop',
    'Calves': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80&auto=format&fit=crop',
    // Core
    'Core': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop',
    'Lower Abs': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop',
    'Upper Abs': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop',
    'Obliques': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop',
    'Lower Back': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop',
    'Deep Core': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop',
    // Full Body / Cardio
    'Full Body': 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80&auto=format&fit=crop',
    'Cardio': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80&auto=format&fit=crop',
    'HIIT': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80&auto=format&fit=crop',
    'Compound': 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80&auto=format&fit=crop',
};

// Day focus → banner images
const dayBannerImages: Record<string, string> = {
    'Chest, Shoulders, Triceps': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&auto=format&fit=crop',
    'Back, Biceps, Rear Delts': 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80&auto=format&fit=crop',
    'Quads, Hamstrings, Glutes, Calves': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80&auto=format&fit=crop',
    'All Major Muscle Groups': 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80&auto=format&fit=crop',
    'Abs, Obliques, Lower Back': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
    'Fat Burning, Endurance': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80&auto=format&fit=crop',
};

const defaultImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80&auto=format&fit=crop';

function getExerciseImage(muscleGroup: string): string {
    return muscleImages[muscleGroup] || defaultImage;
}

function getDayBanner(focus: string): string {
    return dayBannerImages[focus] || defaultImage;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WorkoutPage() {
    const { user } = useAuth();
    const [plan, setPlan] = useState<WorkoutPlan | null>(null);
    const [expandedDay, setExpandedDay] = useState<number>(0);

    useEffect(() => {
        const workout = generateWorkoutPlan(
            user?.goal || 'muscle_gain',
            user?.workoutExperience || 'beginner'
        );
        setPlan(workout);
    }, [user]);

    if (!plan) return null;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                    💪 AI Workout Plan
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    {GOAL_LABELS[user?.goal || 'muscle_gain']} • {EXPERIENCE_LABELS[user?.workoutExperience || 'beginner']}
                </p>
            </motion.div>

            {/* Plan Overview with Image */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} glow="purple" className="overflow-hidden">
                    <div className="relative h-32 md:h-40">
                        <Image
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop"
                            alt="Workout plan"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-end gap-4">
                                <div className="text-4xl">🏋️</div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{plan.name}</h2>
                                    <p className="text-sm text-gray-300 mt-0.5">{plan.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-medium backdrop-blur-sm">
                                    {plan.daysPerWeek} days/week
                                </span>
                                <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-medium backdrop-blur-sm">
                                    {plan.schedule[0]?.exercises.length || 0} exercises/day
                                </span>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Workout Days */}
            {plan.schedule.map((day, dayIndex) => (
                <motion.div key={dayIndex} variants={itemVariants}>
                    <GlassCard
                        hover
                        className="overflow-hidden"
                        onClick={() => setExpandedDay(expandedDay === dayIndex ? -1 : dayIndex)}
                    >
                        {/* Day Header with Background Image */}
                        <div className="relative">
                            <div className="absolute inset-0 h-full">
                                <Image
                                    src={getDayBanner(day.focus)}
                                    alt={day.focus}
                                    fill
                                    className="object-cover opacity-20"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12]/90 to-[#0a0a12]/70" />
                            </div>
                            <div className="relative p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${expandedDay === dayIndex ? 'bg-cyan-500 text-white' : 'bg-white/[0.06] text-gray-400'
                                        }`}>
                                        {dayIndex + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-white">{day.day}</h3>
                                        <p className="text-xs text-gray-400">{day.focus}</p>
                                    </div>
                                </div>
                                <motion.span
                                    animate={{ rotate: expandedDay === dayIndex ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-gray-400"
                                >
                                    ▼
                                </motion.span>
                            </div>
                        </div>

                        {/* Exercises with Images */}
                        <AnimatePresence>
                            {expandedDay === dayIndex && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 space-y-3 border-t border-white/[0.06] pt-4">
                                        {day.exercises.map((exercise, exIndex) => (
                                            <motion.div
                                                key={exIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: exIndex * 0.07 }}
                                                className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.1] transition-colors group"
                                            >
                                                {/* Exercise Image */}
                                                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={getExerciseImage(exercise.muscleGroup)}
                                                        alt={exercise.muscleGroup}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        unoptimized
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                                </div>

                                                {/* Exercise Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between flex-wrap gap-2">
                                                        <div>
                                                            <p className="text-sm font-medium text-white">{exercise.name}</p>
                                                            <p className="text-xs text-gray-500">{exercise.muscleGroup}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-[11px]">
                                                                {exercise.sets} × {exercise.reps}
                                                            </span>
                                                            <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 text-[11px]">
                                                                Rest: {exercise.rest}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {exercise.tip && (
                                                        <p className="text-xs text-gray-400 mt-2 flex items-start gap-1">
                                                            <span className="text-yellow-400">💡</span> {exercise.tip}
                                                        </p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </GlassCard>
                </motion.div>
            ))}
        </motion.div>
    );
}
