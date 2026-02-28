import { User } from '@/types';
import { FITNESS_TIPS, MOTIVATIONAL_QUOTES } from './constants';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

const GREETING_PATTERNS = [
    /^(hi|hello|hey|sup|yo|hola)/i,
];

const BMI_PATTERNS = [
    /bmi/i, /body mass/i,
];

const CALORIE_PATTERNS = [
    /calori/i, /tdee/i, /surplus|deficit/i, /maintenance/i, /how (much|many).*(eat|calori)/i,
];

const PROTEIN_PATTERNS = [
    /protein/i, /how much protein/i, /macro/i,
];

const WEIGHT_LOSS_PATTERNS = [
    /lose weight/i, /fat loss/i, /weight loss/i, /cut/i, /lean/i, /slim/i, /reduce/i,
];

const MUSCLE_GAIN_PATTERNS = [
    /gain muscle/i, /muscle gain/i, /bulk/i, /build muscle/i, /mass/i, /bigger/i, /hypertrophy/i,
];

const WORKOUT_PATTERNS = [
    /workout/i, /exercise/i, /gym/i, /training plan/i, /split/i, /ppl/i, /push pull/i, /routine/i,
];

const DIET_PATTERNS = [
    /diet/i, /meal/i, /food/i, /eat/i, /nutrition|nutrient/i, /what.*eat/i, /indian.*food/i,
];

const SIXPACK_PATTERNS = [
    /six.?pack/i, /abs/i, /core/i, /stomach/i, /belly/i,
];

const MOTIVATION_PATTERNS = [
    /motivat/i, /inspire/i, /quit/i, /give up/i, /lazy/i, /disciplin/i, /consistency/i,
];

const SLEEP_PATTERNS = [
    /sleep/i, /rest/i, /recovery/i,
];

const SUPPLEMENT_PATTERNS = [
    /supplement/i, /creatine/i, /whey/i, /bcaa/i, /pre.?workout/i, /vitamin/i,
];

const WATER_PATTERNS = [
    /water/i, /hydra/i, /drink/i,
];

function matchesAny(msg: string, patterns: RegExp[]): boolean {
    return patterns.some(p => p.test(msg));
}

function calcBMI(weight: number, heightCm: number): number {
    const m = heightCm / 100;
    return Math.round((weight / (m * m)) * 10) / 10;
}

export function generateAIResponse(message: string, user: User | null, history: ChatMessage[]): string {
    const msg = message.trim();
    const name = user?.name?.split(' ')[0] || 'champ';
    const weight = user?.weight;
    const height = user?.height;
    const goal = user?.goal;
    const bmi = user?.bmi || (weight && height ? calcBMI(weight, height) : null);
    const calories = user?.calorieTarget;
    const protein = user?.proteinTarget;

    // Greeting
    if (GREETING_PATTERNS.some(p => p.test(msg)) && msg.length < 20) {
        return `Hey ${name}! 💪 I'm your AI fitness coach. Ask me anything about:\n\n• 📏 **BMI & body stats**\n• 🔥 **Calories & macros**\n• 🥗 **Diet & Indian meal ideas**\n• 🏋️ **Workouts & training**\n• 💊 **Supplements**\n• 😴 **Sleep & recovery**\n• 🔥 **Motivation**\n\nWhat's on your mind?`;
    }

    // BMI
    if (matchesAny(msg, BMI_PATTERNS)) {
        if (bmi) {
            const category = bmi < 18.5 ? 'underweight' : bmi < 25 ? 'normal/healthy' : bmi < 30 ? 'overweight' : 'obese';
            return `Your current BMI is **${bmi}** (${category} range).\n\n${bmi < 18.5
                ? '📈 Focus on eating in a caloric surplus with protein-rich foods to gain healthy weight.'
                : bmi < 25
                    ? '✅ Great! You are in the healthy range. Keep up your current routine!'
                    : '🔥 Consider a caloric deficit of 300-500 kcal/day combined with strength training to drop body fat safely.'
                }\n\n💡 **Tip:** Head to the **Calculator** page for a full breakdown of your stats.`;
        }
        return `I'd love to calculate your BMI, but I need your height and weight first! 📏\n\nGo to **Profile → Edit Profile** and fill in your measurements. Then come back and ask me again!`;
    }

    // Calories
    if (matchesAny(msg, CALORIE_PATTERNS)) {
        if (calories) {
            const goalText = goal === 'fat_loss' ? 'a caloric deficit for fat loss'
                : goal === 'muscle_gain' ? 'a caloric surplus for muscle gain'
                    : goal === 'six_pack' ? 'a slight deficit to reveal abs'
                        : 'maintenance';
            return `Based on your profile, your daily calorie target is **${calories} kcal** (${goalText}).\n\n**Quick breakdown:**\n• Protein: ${protein || '~150'}g (${((protein || 150) * 4)} kcal)\n• Remaining calories split between carbs & fats\n\n📊 Track your intake daily on the **Progress** page!\n\n💡 **Indian tip:** A meal of dal + rice + sabzi is ~400-500 kcal with 15-20g protein.`;
        }
        return `I haven't calculated your calorie target yet because your profile isn't complete. 📋\n\nHead to **Profile** and add your age, height, weight, and goal. I'll then give you a precise calorie target!`;
    }

    // Protein
    if (matchesAny(msg, PROTEIN_PATTERNS)) {
        const targetP = protein || (weight ? Math.round(weight * 1.8) : null);
        if (targetP) {
            return `Your protein target is **${targetP}g/day** 🥩\n\nThat's about **${(targetP / 4).toFixed(0)} meals with ~${Math.round(targetP / 4)}g protein each**.\n\n**Top Indian protein sources:**\n🥚 4 eggs = 24g protein\n🍗 100g chicken breast = 31g\n🫘 1 cup rajma/chole = 15g\n🧀 100g paneer = 18g\n🥛 1 scoop whey = 24g\n🐟 100g fish = 20g\n\n💡 **Pro tip:** Distribute protein evenly across 4-5 meals for optimal absorption.`;
        }
        return `To calculate your ideal protein intake, I need your weight. The general rule is **1.6–2.2g per kg of bodyweight**.\n\nUpdate your weight in **Profile** and I'll give you precise numbers!`;
    }

    // Weight loss
    if (matchesAny(msg, WEIGHT_LOSS_PATTERNS)) {
        return `Here's your **fat loss blueprint**, ${name}: 🔥\n\n**1. Calorie Deficit**\n• Eat 300-500 kcal below your TDEE${calories ? ` (your target: ~${calories} kcal)` : ''}\n• Never go below 1200 kcal/day\n\n**2. High Protein**\n• ${protein ? `Aim for ${protein}g protein daily` : '1.8-2g per kg bodyweight'}\n• Keeps you full and preserves muscle\n\n**3. Strength Training**\n• Lift 3-4x/week to preserve muscle mass\n• Focus on compound movements\n\n**4. Cardio**\n• 10,000 steps/day (~500 kcal burned)\n• 2-3 HIIT sessions/week (optional)\n\n**5. Indian diet tips:**\n• Replace white rice with brown rice or roti\n• Dal + veggies for dinner (high protein, low cal)\n• Avoid fried snacks — switch to roasted makhana\n\n⚡ Realistic pace: 0.5-1 kg/week fat loss.`;
    }

    // Muscle gain
    if (matchesAny(msg, MUSCLE_GAIN_PATTERNS)) {
        return `Here's your **muscle gain plan**, ${name}: 💪\n\n**1. Calorie Surplus**\n• Eat 200-400 kcal above your TDEE${calories ? ` (aim for ~${(calories || 0) + 300} kcal)` : ''}\n• Clean surplus = less fat gain\n\n**2. Protein Priority**\n• ${protein ? `Hit ${protein}g protein daily` : '2g per kg bodyweight'}\n• Distribute across 4-5 meals\n\n**3. Training**\n• Progressive overload is KEY\n• PPL split or Upper/Lower, 4-6 days/week\n• Focus on compound lifts first\n\n**4. Recovery**\n• Sleep 7-8 hours minimum\n• Rest muscles 48-72 hours between sessions\n\n**5. Indian bulk foods:**\n• Post-workout: Banana shake + whey\n• Meals: Rice + chicken/paneer + dal\n• Snacks: Peanut butter roti, boiled eggs\n\n⚡ Realistic gains: 0.5-1 kg muscle/month (beginner).`;
    }

    // Workout
    if (matchesAny(msg, WORKOUT_PATTERNS)) {
        return `Here's what I recommend for you, ${name}: 🏋️\n\n${user?.workoutExperience === 'beginner' || !user?.workoutExperience
            ? '**Beginner Full Body (3 days/week)**\n\n**Day A:** Squats, Bench Press, Rows, Shoulder Press, Planks\n**Day B:** Deadlifts, Incline DB Press, Lat Pulldown, Lunges, Bicep Curls\n\nAlternate A/B with rest days between.'
            : '**Push Pull Legs (6 days/week)**\n\n**Push:** Bench Press, OHP, Incline DB, Lateral Raise, Tricep Dips\n**Pull:** Deadlift, Rows, Lat Pulldown, Face Pulls, Bicep Curls\n**Legs:** Squats, Leg Press, Romanian DL, Leg Curl, Calf Raises'
            }\n\n📋 **Key principles:**\n• Progressive overload each week\n• 3-4 sets per exercise, 8-12 reps\n• Rest 60-90 seconds between sets\n\nCheck out the **Workout** page for a detailed plan generated just for you!`;
    }

    // Diet
    if (matchesAny(msg, DIET_PATTERNS)) {
        return `Here's a sample **Indian-friendly meal plan** for you, ${name}: 🥗\n\n**🌅 Breakfast (7-8 AM)**\nEgg omelette (3 eggs) + 2 multigrain toasts + banana\n→ ~380 kcal, 22g protein\n\n**🥜 Snack (10:30 AM)**\n Handful of almonds + apple\n→ ~200 kcal, 6g protein\n\n**🍛 Lunch (1 PM)**\nChicken breast / paneer + brown rice + dal + salad\n→ ~550 kcal, 40g protein\n\n**💪 Pre-workout (4 PM)**\nBanana + peanut butter roti\n→ ~250 kcal, 8g protein\n\n**🥤 Post-workout**\nWhey protein shake + banana\n→ ~280 kcal, 28g protein\n\n**🌙 Dinner (8 PM)**\nGrilled fish/chicken + roti + sabzi\n→ ~400 kcal, 35g protein\n\n📊 Total: ~2060 kcal, ~139g protein\n\nFor a fully customized plan, check the **Diet Plan** page!`;
    }

    // Six pack
    if (matchesAny(msg, SIXPACK_PATTERNS)) {
        return `Getting a six-pack requires two things: **low body fat + strong core**. Here's the plan: 🎯\n\n**1. Body Fat Target**\n• Men: Below 12% body fat\n• Women: Below 18% body fat\n• This is mostly diet — you can't out-train a bad diet!\n\n**2. Core Workout (3-4x/week)**\n• Hanging leg raises: 3 × 12\n• Cable crunches: 3 × 15\n• Planks: 3 × 60 seconds\n• Ab wheel rollouts: 3 × 10\n• Bicycle crunches: 3 × 20\n• Russian twists: 3 × 15 each side\n\n**3. Diet for abs**\n• Caloric deficit of 300-400 kcal\n• High protein (${protein ? `${protein}g` : '2g/kg'})\n• Avoid bloating foods: excessive dairy, beans, carbonated drinks\n• Eat anti-inflammatory foods: turmeric, ginger, green tea\n\n⏱️ Timeline: 8-16 weeks depending on current body fat.`;
    }

    // Motivation
    if (matchesAny(msg, MOTIVATION_PATTERNS)) {
        const q = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
        const tip = FITNESS_TIPS[Math.floor(Math.random() * FITNESS_TIPS.length)];
        return `I got you, ${name}! Here's your dose of fire: 🔥\n\n> *"${q.text}"*\n> — **${q.author}**\n\n**Remember this:**\n• You don't need motivation — you need **discipline**\n• Results come from what you do **consistently**, not occasionally\n• Every rep counts. Every meal matters. Every hour of sleep builds you up\n\n💡 **Today's tip:** ${tip}\n\nYou've already taken the hardest step by showing up. Now keep going! 💪`;
    }

    // Sleep
    if (matchesAny(msg, SLEEP_PATTERNS)) {
        return `Sleep is when your body BUILDS muscle. Here's how to optimize it: 😴\n\n**Sleep Goals:**\n• 7-9 hours per night\n• Consistent sleep schedule\n• Dark, cool room (18-20°C)\n\n**Recovery Tips:**\n• Avoid screens 30 min before bed\n• No caffeine after 3 PM\n• Post-workout shake within 30 min\n• Stretching or foam rolling helps recovery\n• Consider magnesium before bed\n\n**Why it matters:**\n• Growth hormone peaks during deep sleep\n• Poor sleep increases cortisol (stores belly fat)\n• Missing 1 hour of sleep = 30% lower testosterone\n\n💡 **Indian remedy:** Warm turmeric milk (haldi doodh) before bed improves sleep quality!`;
    }

    // Supplements
    if (matchesAny(msg, SUPPLEMENT_PATTERNS)) {
        return `Here are the **only supplements worth your money**, ${name}: 💊\n\n**Tier 1 — Essential:**\n✅ **Whey Protein** — If you can't hit protein targets from food (~24g/scoop)\n✅ **Creatine Monohydrate** — 5g/day, most researched supplement ever\n✅ **Vitamin D3** — Most Indians are deficient, 2000-4000 IU/day\n\n**Tier 2 — Helpful:**\n🟡 **Fish Oil / Omega 3** — For joints & heart health\n🟡 **Multivitamin** — Insurance policy for micronutrients\n🟡 **Magnesium** — Improves sleep and recovery\n\n**Skip these:**\n❌ BCAAs (waste if you eat enough protein)\n❌ Fat burners (glorified caffeine pills)\n❌ Mass gainers (overpriced sugar)\n❌ Testosterone boosters (don't work)\n\n💡 **Budget tip:** ₹2500/month for whey + creatine covers 90% of your needs.`;
    }

    // Water
    if (matchesAny(msg, WATER_PATTERNS)) {
        const waterTarget = weight ? Math.round(weight * 0.04 * 10) / 10 : 3.5;
        return `Hydration is crucial for performance and fat loss! 💧\n\n**Your target:** ~${waterTarget} liters/day (${Math.round(waterTarget / 0.3)} glasses)\n\n**When to drink:**\n• 🌅 500ml right after waking up\n• 💪 500ml during workout\n• 🍽️ 1 glass before each meal\n• 📱 Set hourly reminders\n\n**Signs of dehydration:**\n• Dark yellow urine\n• Headaches\n• Fatigue / low energy\n• Muscle cramps\n\n💡 **Indian tip:** Add lemon, mint, or jeera to water for extra benefits and taste!`;
    }

    // Default / unknown
    return `Great question, ${name}! 🤔 I can help you with:\n\n• **"How much protein do I need?"**\n• **"How to lose weight fast"**\n• **"Give me a workout plan"**\n• **"Six pack exercises"**\n• **"Indian diet plan"**\n• **"What supplements should I take?"**\n• **"Motivate me"**\n• **"How much water"**\n• **"BMI check"**\n• **"Calorie target"**\n\nTry asking any of these! 💪`;
}
