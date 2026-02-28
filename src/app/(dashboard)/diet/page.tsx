'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { generateDietPlan } from '@/lib/diet-generator';
import { MealPlan } from '@/types';
import { DIET_LABELS } from '@/lib/constants';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const mealMeta: Record<string, { label: string; icon: string; time: string }> = {
    breakfast: { label: 'Breakfast', icon: '🌅', time: '7:00 - 8:00 AM' },
    midMorning: { label: 'Mid-Morning Snack', icon: '🥜', time: '10:30 AM' },
    lunch: { label: 'Lunch', icon: '🍛', time: '12:30 - 1:30 PM' },
    preWorkout: { label: 'Pre-Workout', icon: '⚡', time: '4:00 PM' },
    postWorkout: { label: 'Post-Workout', icon: '🏋️', time: '6:30 PM' },
    dinner: { label: 'Dinner', icon: '🌙', time: '8:00 - 9:00 PM' },
};

// Map each specific meal name → a matching food photo
const mealImages: Record<string, string> = {
    // Breakfasts
    'Oats with Banana & Almonds': 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80&auto=format&fit=crop',
    'Paneer Paratha + Curd': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80&auto=format&fit=crop',
    'Poha with Peanuts': 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&q=80&auto=format&fit=crop',
    'Moong Dal Chilla': 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80&auto=format&fit=crop',
    'Idli Sambar + Chutney': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80&auto=format&fit=crop',
    'Egg Bhurji + Toast': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80&auto=format&fit=crop',
    'Omelette + Paratha': 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&q=80&auto=format&fit=crop',
    'Boiled Eggs + Oats': 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80&auto=format&fit=crop',
    'Egg Dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80&auto=format&fit=crop',

    // Lunches (Veg)
    'Rajma Chawal + Salad': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80&auto=format&fit=crop',
    'Chole + Roti + Raita': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80&auto=format&fit=crop',
    'Paneer Tikka + Rice': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80&auto=format&fit=crop',
    'Dal Tadka + Roti + Sabzi': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80&auto=format&fit=crop',
    'Palak Paneer + Rice': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80&auto=format&fit=crop',

    // Lunches (Non-Veg)
    'Chicken Curry + Rice': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80&auto=format&fit=crop',
    'Tandoori Chicken + Roti': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80&auto=format&fit=crop',
    'Fish Curry + Rice': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&q=80&auto=format&fit=crop',
    'Egg Curry + Roti': 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80&auto=format&fit=crop',
    'Chicken Biryani + Raita': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80&auto=format&fit=crop',

    // Dinners (Veg)
    'Paneer Bhurji + Roti': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80&auto=format&fit=crop',
    'Mixed Dal + Rice': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80&auto=format&fit=crop',
    'Tofu Stir-fry + Roti': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&auto=format&fit=crop',
    'Khichdi + Kadhi': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80&auto=format&fit=crop',
    'Mushroom Curry + Roti': 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80&auto=format&fit=crop',

    // Dinners (Non-Veg)
    'Grilled Chicken + Salad': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=80&auto=format&fit=crop',
    'Egg Bhurji + Roti': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80&auto=format&fit=crop',
    'Fish Tikka + Salad': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&q=80&auto=format&fit=crop',
    'Chicken Soup + Bread': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80&auto=format&fit=crop',

    // Snacks (Veg)
    'Paneer Tikka (6 pieces)': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80&auto=format&fit=crop',
    'Roasted Chana': 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80&auto=format&fit=crop',
    'Protein Smoothie': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80&auto=format&fit=crop',
    'Sprouts Chaat': 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&q=80&auto=format&fit=crop',
    'Greek Yogurt + Nuts': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80&auto=format&fit=crop',

    // Snacks (Non-Veg)
    'Boiled Eggs (4)': 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80&auto=format&fit=crop',
    'Chicken Tikka (6 pieces)': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80&auto=format&fit=crop',

    // Pre-Workout
    'Banana + Peanut Butter': 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80&auto=format&fit=crop',
    'Oats + Black Coffee': 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&q=80&auto=format&fit=crop',
    'Apple + Almonds': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80&auto=format&fit=crop',

    // Post-Workout
    'Whey Shake + Banana': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80&auto=format&fit=crop',
    'Paneer Wrap': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80&auto=format&fit=crop',
    'Egg Sandwich': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80&auto=format&fit=crop',
};

const defaultMealImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&auto=format&fit=crop';

function getMealImage(mealName: string): string {
    return mealImages[mealName] || defaultMealImage;
}

export default function DietPage() {
    const { user } = useAuth();
    const [plan, setPlan] = useState<MealPlan | null>(null);

    const generatePlan = () => {
        const newPlan = generateDietPlan(
            user?.calorieTarget || 2200,
            user?.proteinTarget || 150,
            user?.dietPreference || 'non_veg'
        );
        setPlan(newPlan);
        localStorage.setItem('physique_diet', JSON.stringify(newPlan));
    };

    useEffect(() => {
        const saved = localStorage.getItem('physique_diet');
        if (saved) {
            setPlan(JSON.parse(saved));
        } else {
            generatePlan();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!plan) return null;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-start justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                        🥗 AI Diet Plan
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Personalized Indian meals • {DIET_LABELS[user?.dietPreference || 'non_veg']}
                    </p>
                </div>
                <GradientButton onClick={generatePlan} variant="green" size="sm">
                    🔄 Regenerate Plan
                </GradientButton>
            </motion.div>

            {/* Hero Banner */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="overflow-hidden">
                    <div className="relative h-36 md:h-44">
                        <Image
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format&fit=crop"
                            alt="Healthy food spread"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <p className="text-xs text-gray-300 uppercase tracking-wider mb-1">Daily Nutrition Overview</p>
                            <div className="grid grid-cols-4 gap-3">
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-white">{plan.totalCalories}<span className="text-xs text-gray-400"> kcal</span></p>
                                    <p className="text-[10px] text-gray-400">Calories</p>
                                </div>
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-cyan-400">{plan.totalProtein}<span className="text-xs text-gray-400">g</span></p>
                                    <p className="text-[10px] text-gray-400">Protein</p>
                                </div>
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-purple-400">{plan.totalCarbs}<span className="text-xs text-gray-400">g</span></p>
                                    <p className="text-[10px] text-gray-400">Carbs</p>
                                </div>
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-orange-400">{plan.totalFats}<span className="text-xs text-gray-400">g</span></p>
                                    <p className="text-[10px] text-gray-400">Fats</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* Meal Cards */}
            {(['breakfast', 'midMorning', 'lunch', 'preWorkout', 'postWorkout', 'dinner'] as const).map((key) => {
                const meal = plan[key];
                const meta = mealMeta[key];
                return (
                    <motion.div key={key} variants={itemVariants}>
                        <GlassCard hover className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                                {/* Meal Image */}
                                <div className="relative w-full sm:w-40 h-36 sm:h-auto flex-shrink-0 group">
                                    <Image
                                        src={getMealImage(meal.name)}
                                        alt={meta.label}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a12]/80 hidden sm:block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/80 to-transparent sm:hidden" />
                                    {/* Calorie badge on image */}
                                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-cyan-400 text-xs font-semibold">
                                        {meal.calories} kcal
                                    </div>
                                </div>

                                {/* Meal Info */}
                                <div className="flex-1 p-5">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{meta.icon}</span>
                                            <div>
                                                <h3 className="text-base font-semibold text-white">{meta.label}</h3>
                                                <p className="text-xs text-gray-500">{meta.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-white mt-3 font-medium">{meal.name}</p>
                                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">{meal.description}</p>
                                    <div className="flex items-center gap-4 mt-3">
                                        <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium">P: {meal.protein}g</span>
                                        <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-medium">C: {meal.carbs}g</span>
                                        <span className="px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs font-medium">F: {meal.fats}g</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
