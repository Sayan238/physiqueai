'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { calculateFitness } from '@/lib/calculator';
import { GOAL_LABELS, ACTIVITY_LABELS, DIET_LABELS, EXPERIENCE_LABELS } from '@/lib/constants';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || '',
        age: user?.age || '',
        gender: user?.gender || 'male',
        height: user?.height || '',
        weight: user?.weight || '',
        goalWeight: user?.goalWeight || '',
        goal: user?.goal || 'muscle_gain',
        dietPreference: user?.dietPreference || 'non_veg',
        activityLevel: user?.activityLevel || 'moderate',
        workoutExperience: user?.workoutExperience || 'beginner',
    });

    const update = (field: string, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const age = typeof form.age === 'string' ? parseInt(form.age) : form.age;
        const height = typeof form.height === 'string' ? parseInt(form.height) : form.height;
        const weight = typeof form.weight === 'string' ? parseInt(form.weight) : form.weight;
        const goalWeight = typeof form.goalWeight === 'string' ? parseInt(form.goalWeight) : form.goalWeight;

        // Calculate fitness data if all basic info provided
        let fitnessData = {};
        if (age && height && weight) {
            const results = calculateFitness(
                age, form.gender, height, weight,
                goalWeight || weight,
                form.goal as string,
                form.activityLevel as string
            );
            fitnessData = {
                bmi: results.bmi,
                tdee: results.tdee,
                calorieTarget: results.calorieTarget,
                proteinTarget: results.proteinTarget,
            };
            localStorage.setItem('physique_results', JSON.stringify(results));
        }

        updateUser({
            name: form.name,
            age,
            gender: form.gender as 'male' | 'female',
            height,
            weight,
            goalWeight,
            goal: form.goal as 'muscle_gain' | 'fat_loss' | 'six_pack' | 'maintenance',
            dietPreference: form.dietPreference as 'veg' | 'non_veg' | 'eggetarian',
            activityLevel: form.activityLevel as 'sedentary' | 'light' | 'moderate' | 'active' | 'extra_active',
            workoutExperience: form.workoutExperience as 'beginner' | 'intermediate' | 'advanced',
            profileComplete: true,
            ...fitnessData,
        });

        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all disabled:opacity-40";
    const selectClass = "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-cyan-500/50 transition-all appearance-none disabled:opacity-40";

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto"
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                        👤 My Profile
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">Manage your personal information and fitness settings</p>
                </div>
                {!editing ? (
                    <GradientButton onClick={() => setEditing(true)} size="sm">
                        ✏️ Edit Profile
                    </GradientButton>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-all cursor-pointer">
                            Cancel
                        </button>
                        <GradientButton onClick={handleSave} size="sm" variant="green">
                            💾 Save Changes
                        </GradientButton>
                    </div>
                )}
            </motion.div>

            {saved && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        ✅ Profile saved successfully! Calculator values have been updated.
                    </div>
                </motion.div>
            )}

            {/* Avatar & Name Card */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} glow="cyan" className="p-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                            {(form.name || user?.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            {editing ? (
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Display Name</label>
                                    <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                                        placeholder="Your name" className={inputClass} />
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xl font-bold text-white">{user?.name || 'Not set'}</p>
                                    <p className="text-sm text-gray-400">{user?.email || ''}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Body Measurements */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-6">
                    <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">📏 Body Measurements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Age</label>
                            {editing ? (
                                <input type="number" value={form.age} onChange={e => update('age', e.target.value)}
                                    placeholder="22" className={inputClass} />
                            ) : (
                                <p className="text-lg font-semibold text-white">{user?.age || <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Gender</label>
                            {editing ? (
                                <select value={form.gender} onChange={e => update('gender', e.target.value)} className={selectClass}>
                                    <option value="male" className="bg-[#141420]">Male</option>
                                    <option value="female" className="bg-[#141420]">Female</option>
                                </select>
                            ) : (
                                <p className="text-lg font-semibold text-white capitalize">{user?.gender || <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Height (cm)</label>
                            {editing ? (
                                <input type="number" value={form.height} onChange={e => update('height', e.target.value)}
                                    placeholder="175" className={inputClass} />
                            ) : (
                                <p className="text-lg font-semibold text-white">{user?.height ? `${user.height} cm` : <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Current Weight (kg)</label>
                            {editing ? (
                                <input type="number" value={form.weight} onChange={e => update('weight', e.target.value)}
                                    placeholder="70" className={inputClass} />
                            ) : (
                                <p className="text-lg font-semibold text-white">{user?.weight ? `${user.weight} kg` : <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Goal Weight (kg)</label>
                            {editing ? (
                                <input type="number" value={form.goalWeight} onChange={e => update('goalWeight', e.target.value)}
                                    placeholder="75" className={inputClass} />
                            ) : (
                                <p className="text-lg font-semibold text-white">{user?.goalWeight ? `${user.goalWeight} kg` : <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Fitness Preferences */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-6">
                    <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">🎯 Fitness Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Fitness Goal</label>
                            {editing ? (
                                <select value={form.goal} onChange={e => update('goal', e.target.value)} className={selectClass}>
                                    <option value="muscle_gain" className="bg-[#141420]">💪 Muscle Gain</option>
                                    <option value="fat_loss" className="bg-[#141420]">🔥 Fat Loss</option>
                                    <option value="six_pack" className="bg-[#141420]">🎯 Six Pack</option>
                                    <option value="maintenance" className="bg-[#141420]">⚡ Maintenance</option>
                                </select>
                            ) : (
                                <p className="text-lg font-semibold text-white">{GOAL_LABELS[user?.goal || ''] || <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Diet Preference</label>
                            {editing ? (
                                <select value={form.dietPreference} onChange={e => update('dietPreference', e.target.value)} className={selectClass}>
                                    <option value="veg" className="bg-[#141420]">🥦 Vegetarian</option>
                                    <option value="non_veg" className="bg-[#141420]">🍗 Non-Vegetarian</option>
                                    <option value="eggetarian" className="bg-[#141420]">🥚 Eggetarian</option>
                                </select>
                            ) : (
                                <p className="text-lg font-semibold text-white">{DIET_LABELS[user?.dietPreference || ''] || <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Activity Level</label>
                            {editing ? (
                                <select value={form.activityLevel} onChange={e => update('activityLevel', e.target.value)} className={selectClass}>
                                    <option value="sedentary" className="bg-[#141420]">Sedentary</option>
                                    <option value="light" className="bg-[#141420]">Lightly Active</option>
                                    <option value="moderate" className="bg-[#141420]">Moderately Active</option>
                                    <option value="active" className="bg-[#141420]">Very Active</option>
                                    <option value="extra_active" className="bg-[#141420]">Athlete</option>
                                </select>
                            ) : (
                                <p className="text-lg font-semibold text-white">{ACTIVITY_LABELS[user?.activityLevel || ''] || <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Experience Level</label>
                            {editing ? (
                                <select value={form.workoutExperience} onChange={e => update('workoutExperience', e.target.value)} className={selectClass}>
                                    <option value="beginner" className="bg-[#141420]">🌱 Beginner</option>
                                    <option value="intermediate" className="bg-[#141420]">💪 Intermediate</option>
                                    <option value="advanced" className="bg-[#141420]">🏆 Advanced</option>
                                </select>
                            ) : (
                                <p className="text-lg font-semibold text-white">{EXPERIENCE_LABELS[user?.workoutExperience || ''] || <span className="text-gray-600">Not set</span>}</p>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Calculated Stats (read-only) */}
            {user?.bmi && (
                <motion.div variants={itemVariants}>
                    <GlassCard hover={false} glow="purple" className="p-6">
                        <h3 className="text-base font-semibold text-white mb-4 font-[family-name:var(--font-outfit)]">📊 Your Calculated Stats</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <p className="text-xs text-gray-400">BMI</p>
                                <p className="text-2xl font-bold text-cyan-400">{user.bmi}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">TDEE</p>
                                <p className="text-2xl font-bold text-orange-400">{user.tdee}<span className="text-xs text-gray-400"> kcal</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Calorie Target</p>
                                <p className="text-2xl font-bold text-purple-400">{user.calorieTarget}<span className="text-xs text-gray-400"> kcal</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Protein Target</p>
                                <p className="text-2xl font-bold text-green-400">{user.proteinTarget}<span className="text-xs text-gray-400">g</span></p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3 text-center">These are auto-calculated based on your body measurements and goals</p>
                    </GlassCard>
                </motion.div>
            )}
        </motion.div>
    );
}
