export const APP_NAME = 'PhysiqueAI';
export const APP_DESCRIPTION = 'AI-Powered Fitness Coach — Personalized Diet & Workout Plans';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extra_active: 1.9,
};

export const GOAL_LABELS: Record<string, string> = {
    muscle_gain: 'Muscle Gain',
    fat_loss: 'Fat Loss',
    six_pack: 'Six Pack',
    maintenance: 'Maintenance',
};

export const DIET_LABELS: Record<string, string> = {
    veg: 'Vegetarian',
    non_veg: 'Non-Vegetarian',
    eggetarian: 'Eggetarian',
};

export const ACTIVITY_LABELS: Record<string, string> = {
    sedentary: 'Sedentary (Desk Job)',
    light: 'Lightly Active (1-2 days/week)',
    moderate: 'Moderately Active (3-5 days/week)',
    active: 'Very Active (6-7 days/week)',
    extra_active: 'Athlete (2x per day)',
};

export const EXPERIENCE_LABELS: Record<string, string> = {
    beginner: 'Beginner (< 6 months)',
    intermediate: 'Intermediate (6-24 months)',
    advanced: 'Advanced (2+ years)',
};

export const MOTIVATIONAL_QUOTES = [
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "Unknown" },
    { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
    { text: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Khloe Kardashian" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "The hard days are the best because that's when champions are made.", author: "Gabby Douglas" },
    { text: "Success isn't always about greatness. It's about consistency.", author: "Dwayne Johnson" },
    { text: "No matter how slow you go, you are still lapping everybody on the couch.", author: "Unknown" },
    { text: "Discipline is doing what needs to be done, even if you don't want to do it.", author: "Unknown" },
    { text: "You don't have to be extreme, just consistent.", author: "Unknown" },
    { text: "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.", author: "Arnold Schwarzenegger" },
    { text: "Strive for progress, not perfection.", author: "Unknown" },
    { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
    { text: "If it doesn't challenge you, it won't change you.", author: "Fred DeVito" },
    { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
    { text: "Don't limit your challenges, challenge your limits.", author: "Unknown" },
    { text: "Wake up with determination, go to bed with satisfaction.", author: "Unknown" },
    { text: "Sweat is fat crying.", author: "Unknown" },
    { text: "The only way to define your limits is by going beyond them.", author: "Arthur C. Clarke" },
    { text: "When you feel like quitting, think about why you started.", author: "Unknown" },
];

export const FITNESS_TIPS = [
    "Drink at least 3-4 liters of water daily to optimize muscle recovery.",
    "Sleep 7-8 hours per night — muscle grows during rest, not in the gym.",
    "Track your protein intake — aim for 1.6-2.2g per kg of bodyweight.",
    "Progressive overload is key: increase weight, reps, or sets each week.",
    "Don't skip warm-ups — 5-10 minutes prevents injuries and boosts performance.",
    "Eat your largest carb meal post-workout for optimal glycogen replenishment.",
    "Consistency beats intensity. Show up every day, even if it's a light session.",
    "Paneer, dal, chickpeas, and eggs are the best Indian protein sources.",
    "Reduce refined sugar and processed foods to accelerate fat loss.",
    "Creatine monohydrate (5g/day) is the most research-backed supplement.",
    "Take rest days seriously — overtraining leads to injury and burnout.",
    "Compound movements (squats, deadlifts, bench press) build the most muscle.",
    "Walking 10,000 steps daily burns ~500 extra calories for fat loss.",
    "Eat slowly and mindfully — it takes 20 minutes for satiety signals to reach your brain.",
    "Morning sunlight exposure improves sleep quality and testosterone levels.",
];
