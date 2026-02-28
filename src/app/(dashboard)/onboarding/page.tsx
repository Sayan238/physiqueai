'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { calculateFitness } from '@/lib/calculator';
import { OnboardingData } from '@/types';

const steps = ['Personal Info', 'Fitness Goals', 'Experience'];

export default function OnboardingPage() {
    const { updateUser } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<Partial<OnboardingData>>({
        gender: 'male',
        goal: 'muscle_gain',
        dietPreference: 'non_veg',
        activityLevel: 'moderate',
        workoutExperience: 'beginner',
    });

    const update = (field: string, value: string | number) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleComplete = () => {
        const results = calculateFitness(
            data.age || 22,
            data.gender || 'male',
            data.height || 175,
            data.weight || 70,
            data.goalWeight || 75,
            data.goal || 'muscle_gain',
            data.activityLevel || 'moderate'
        );

        updateUser({
            ...data as OnboardingData,
            bmi: results.bmi,
            tdee: results.tdee,
            calorieTarget: results.calorieTarget,
            proteinTarget: results.proteinTarget,
            profileComplete: true,
        });

        // Save onboarding data to localStorage
        localStorage.setItem('physique_onboarding', JSON.stringify(data));
        localStorage.setItem('physique_results', JSON.stringify(results));

        router.push('/calculator');
    };

    return (
        <div className="p-4 md:p-6 max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    {steps.map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${i <= step ? 'bg-cyan-500 text-white' : 'bg-white/[0.06] text-gray-500'
                                }`}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            <span className={`text-sm hidden sm:inline ${i <= step ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                            {i < steps.length - 1 && (
                                <div className={`w-12 md:w-20 h-0.5 mx-2 transition-colors ${i < step ? 'bg-cyan-500' : 'bg-white/[0.08]'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <GlassCard hover={false} className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">Personal Info</h2>
                            <p className="text-sm text-gray-400 mb-6">Tell us about yourself so we can personalize your plan</p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Age</label>
                                        <input type="number" value={data.age || ''} onChange={e => update('age', parseInt(e.target.value))}
                                            placeholder="22" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Gender</label>
                                        <select value={data.gender} onChange={e => update('gender', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none">
                                            <option value="male" className="bg-[#141420]">Male</option>
                                            <option value="female" className="bg-[#141420]">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Height (cm)</label>
                                        <input type="number" value={data.height || ''} onChange={e => update('height', parseInt(e.target.value))}
                                            placeholder="175" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Weight (kg)</label>
                                        <input type="number" value={data.weight || ''} onChange={e => update('weight', parseInt(e.target.value))}
                                            placeholder="70" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Goal Weight (kg)</label>
                                    <input type="number" value={data.goalWeight || ''} onChange={e => update('goalWeight', parseInt(e.target.value))}
                                        placeholder="75" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all" />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <GradientButton onClick={() => setStep(1)}>Next →</GradientButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <GlassCard hover={false} className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">Fitness Goals</h2>
                            <p className="text-sm text-gray-400 mb-6">What do you want to achieve?</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Your Goal</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: 'muscle_gain', label: '💪 Muscle Gain', desc: 'Build lean muscle' },
                                            { value: 'fat_loss', label: '🔥 Fat Loss', desc: 'Burn fat efficiently' },
                                            { value: 'six_pack', label: '🎯 Six Pack', desc: 'Get shredded abs' },
                                            { value: 'maintenance', label: '⚡ Maintenance', desc: 'Stay in shape' },
                                        ].map(g => (
                                            <button key={g.value} onClick={() => update('goal', g.value)}
                                                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${data.goal === g.value ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]'
                                                    }`}>
                                                <p className="text-sm font-medium text-white">{g.label}</p>
                                                <p className="text-xs text-gray-500 mt-1">{g.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Diet Preference</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { value: 'veg', label: '🥦 Veg' },
                                            { value: 'non_veg', label: '🍗 Non-Veg' },
                                            { value: 'eggetarian', label: '🥚 Eggetarian' },
                                        ].map(d => (
                                            <button key={d.value} onClick={() => update('dietPreference', d.value)}
                                                className={`p-3 rounded-xl border text-center text-sm transition-all cursor-pointer ${data.dietPreference === d.value ? 'border-cyan-500/50 bg-cyan-500/10 text-white' : 'border-white/[0.08] bg-white/[0.02] text-gray-400 hover:bg-white/[0.04]'
                                                    }`}>
                                                {d.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Activity Level</label>
                                    <select value={data.activityLevel} onChange={e => update('activityLevel', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none">
                                        <option value="sedentary" className="bg-[#141420]">Sedentary (Desk Job)</option>
                                        <option value="light" className="bg-[#141420]">Lightly Active (1-2 days/week)</option>
                                        <option value="moderate" className="bg-[#141420]">Moderately Active (3-5 days/week)</option>
                                        <option value="active" className="bg-[#141420]">Very Active (6-7 days/week)</option>
                                        <option value="extra_active" className="bg-[#141420]">Athlete (2x per day)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button onClick={() => setStep(0)} className="px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">← Back</button>
                                <GradientButton onClick={() => setStep(2)}>Next →</GradientButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                        <GlassCard hover={false} className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">Experience Level</h2>
                            <p className="text-sm text-gray-400 mb-6">This helps us create the perfect workout plan for you</p>

                            <div className="space-y-3">
                                {[
                                    { value: 'beginner', label: '🌱 Beginner', desc: 'Less than 6 months of training' },
                                    { value: 'intermediate', label: '💪 Intermediate', desc: '6 months to 2 years of consistent training' },
                                    { value: 'advanced', label: '🏆 Advanced', desc: '2+ years of serious training' },
                                ].map(exp => (
                                    <button key={exp.value} onClick={() => update('workoutExperience', exp.value)}
                                        className={`w-full p-5 rounded-xl border text-left transition-all cursor-pointer ${data.workoutExperience === exp.value ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]'
                                            }`}>
                                        <p className="text-base font-medium text-white">{exp.label}</p>
                                        <p className="text-sm text-gray-500 mt-1">{exp.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button onClick={() => setStep(1)} className="px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">← Back</button>
                                <GradientButton variant="green" onClick={handleComplete}>
                                    🚀 Complete & See Results
                                </GradientButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
