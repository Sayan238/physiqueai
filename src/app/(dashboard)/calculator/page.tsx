'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import StatCard from '@/components/ui/StatCard';
import { calculateFitness } from '@/lib/calculator';
import { FitnessResults } from '@/types';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CalculatorPage() {
    const { user } = useAuth();
    const [results, setResults] = useState<FitnessResults | null>(null);

    useEffect(() => {
        // Load results from localStorage or recalculate
        const saved = localStorage.getItem('physique_results');
        if (saved) {
            setResults(JSON.parse(saved));
        } else if (user?.height && user?.weight) {
            const calc = calculateFitness(
                user.age || 22, user.gender || 'male',
                user.height, user.weight,
                user.goalWeight || user.weight,
                user.goal || 'maintenance',
                user.activityLevel || 'moderate'
            );
            setResults(calc);
        } else {
            // Demo data
            const calc = calculateFitness(22, 'male', 175, 70, 75, 'muscle_gain', 'moderate');
            setResults(calc);
        }
    }, [user]);

    if (!results) return null;

    const bmiColor = results.bmi < 18.5 ? 'text-yellow-400' : results.bmi < 25 ? 'text-green-400' : results.bmi < 30 ? 'text-orange-400' : 'text-red-400';

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                    🧮 Fitness Calculator
                </h1>
                <p className="text-sm text-gray-400 mt-1">Your personalized fitness numbers, calculated with science</p>
            </motion.div>

            {/* BMI Card - Featured */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} glow="cyan" className="p-6 md:p-8">
                    <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <p className="text-sm text-gray-400 mb-1">Body Mass Index (BMI)</p>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-5xl font-bold ${bmiColor}`}>{results.bmi}</span>
                                <span className={`text-lg ${bmiColor}`}>{results.bmiCategory}</span>
                            </div>
                            <div className="mt-4 w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((results.bmi / 40) * 100, 100)}%` }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className={`h-full rounded-full ${results.bmi < 18.5 ? 'bg-yellow-400' : results.bmi < 25 ? 'bg-green-400' : results.bmi < 30 ? 'bg-orange-400' : 'bg-red-400'
                                        }`}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Calorie & Macro Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="BMR" value={results.bmr} unit="kcal" icon="⚡" color="orange" />
                <StatCard title="TDEE" value={results.tdee} unit="kcal" icon="🔥" color="cyan" />
                <StatCard title="Calorie Target" value={results.calorieTarget} unit="kcal" icon="🎯" color="purple" />
                <StatCard title="Water Intake" value={results.waterIntake} unit="L/day" icon="💧" color="green" />
            </motion.div>

            {/* Macro Breakdown */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-5 font-[family-name:var(--font-outfit)]">
                        🍽️ Daily Macro Breakdown
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { name: 'Protein', value: results.proteinTarget, unit: 'g', color: 'cyan', percent: Math.round((results.proteinTarget * 4 / results.calorieTarget) * 100) },
                            { name: 'Carbs', value: results.carbTarget, unit: 'g', color: 'purple', percent: Math.round((results.carbTarget * 4 / results.calorieTarget) * 100) },
                            { name: 'Fats', value: results.fatTarget, unit: 'g', color: 'orange', percent: Math.round((results.fatTarget * 9 / results.calorieTarget) * 100) },
                        ].map(macro => (
                            <div key={macro.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                <p className="text-sm text-gray-400">{macro.name}</p>
                                <p className="text-2xl font-bold text-white mt-1">
                                    {macro.value}<span className="text-sm text-gray-400 ml-1">{macro.unit}</span>
                                </p>
                                <div className="mt-2 w-full h-1.5 rounded-full bg-white/[0.06]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${macro.percent}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`h-full rounded-full ${macro.color === 'cyan' ? 'bg-cyan-400' :
                                                macro.color === 'purple' ? 'bg-purple-400' : 'bg-orange-400'
                                            }`}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{macro.percent}% of calories</p>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </motion.div>

            {/* Timeline */}
            {results.timelineWeeks > 0 && (
                <motion.div variants={itemVariants}>
                    <GlassCard hover={false} glow="green" className="p-6">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">⏱️</span>
                            <div>
                                <p className="text-sm text-gray-400">Estimated Timeline to Goal</p>
                                <p className="text-2xl font-bold text-white">
                                    ~{results.timelineWeeks} weeks <span className="text-sm text-gray-400">({Math.round(results.timelineWeeks / 4)} months)</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Based on consistent diet and training adherence</p>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            )}
        </motion.div>
    );
}
