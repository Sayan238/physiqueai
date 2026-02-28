import { Meal, MealPlan } from '@/types';

interface MealOption {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    description: string;
}

const vegBreakfast: MealOption[] = [
    { name: 'Oats with Banana & Almonds', calories: 380, protein: 14, carbs: 52, fats: 12, description: 'Rolled oats cooked in milk with sliced banana, almonds & honey' },
    { name: 'Paneer Paratha + Curd', calories: 420, protein: 18, carbs: 48, fats: 16, description: '2 paneer-stuffed parathas with fresh curd' },
    { name: 'Poha with Peanuts', calories: 320, protein: 10, carbs: 50, fats: 8, description: 'Flattened rice with peanuts, onion, turmeric & lemon' },
    { name: 'Moong Dal Chilla', calories: 280, protein: 16, carbs: 36, fats: 6, description: '2 moong dal pancakes with mint chutney' },
    { name: 'Idli Sambar + Chutney', calories: 340, protein: 12, carbs: 56, fats: 4, description: '4 idlis with sambar and coconut chutney' },
];

const nonVegBreakfast: MealOption[] = [
    { name: 'Egg Bhurji + Toast', calories: 390, protein: 24, carbs: 30, fats: 18, description: '3 egg bhurji with 2 whole wheat toasts' },
    { name: 'Omelette + Paratha', calories: 440, protein: 26, carbs: 38, fats: 20, description: '3 egg masala omelette with 1 aloo paratha' },
    { name: 'Boiled Eggs + Oats', calories: 360, protein: 22, carbs: 40, fats: 12, description: '4 boiled eggs + oatmeal with milk & honey' },
    { name: 'Egg Dosa', calories: 380, protein: 20, carbs: 44, fats: 14, description: '2 egg dosas with coconut chutney' },
    ...vegBreakfast.slice(0, 2),
];

const vegLunch: MealOption[] = [
    { name: 'Rajma Chawal + Salad', calories: 520, protein: 22, carbs: 78, fats: 10, description: 'Rajma curry with brown rice and cucumber-onion salad' },
    { name: 'Chole + Roti + Raita', calories: 480, protein: 20, carbs: 64, fats: 14, description: 'Chickpea curry with 2 rotis and boondi raita' },
    { name: 'Paneer Tikka + Rice', calories: 540, protein: 28, carbs: 60, fats: 18, description: 'Grilled paneer tikka with jeera rice and mint chutney' },
    { name: 'Dal Tadka + Roti + Sabzi', calories: 460, protein: 18, carbs: 66, fats: 10, description: 'Yellow dal with 2 rotis and mixed vegetable sabzi' },
    { name: 'Palak Paneer + Rice', calories: 500, protein: 24, carbs: 58, fats: 16, description: 'Spinach paneer curry with steamed brown rice' },
];

const nonVegLunch: MealOption[] = [
    { name: 'Chicken Curry + Rice', calories: 560, protein: 38, carbs: 60, fats: 14, description: 'Boneless chicken curry with steamed brown rice' },
    { name: 'Tandoori Chicken + Roti', calories: 520, protein: 42, carbs: 40, fats: 16, description: 'Grilled tandoori chicken with 2 rotis and salad' },
    { name: 'Fish Curry + Rice', calories: 480, protein: 34, carbs: 54, fats: 12, description: 'Bengali-style fish curry with steamed rice' },
    { name: 'Egg Curry + Roti', calories: 440, protein: 24, carbs: 48, fats: 14, description: 'Boiled egg curry (3 eggs) with 2 rotis' },
    { name: 'Chicken Biryani + Raita', calories: 600, protein: 36, carbs: 70, fats: 16, description: 'One plate chicken biryani with cucumber raita' },
];

const vegDinner: MealOption[] = [
    { name: 'Paneer Bhurji + Roti', calories: 440, protein: 24, carbs: 40, fats: 18, description: 'Scrambled paneer with onion-tomato + 2 rotis' },
    { name: 'Mixed Dal + Rice', calories: 380, protein: 16, carbs: 58, fats: 6, description: 'Tri-dal (moong, masoor, toor) with jeera rice' },
    { name: 'Tofu Stir-fry + Roti', calories: 360, protein: 22, carbs: 38, fats: 12, description: 'Spiced tofu with bell peppers + 2 rotis' },
    { name: 'Khichdi + Kadhi', calories: 400, protein: 14, carbs: 62, fats: 8, description: 'Masala khichdi with besan kadhi and papad' },
    { name: 'Mushroom Curry + Roti', calories: 380, protein: 16, carbs: 46, fats: 12, description: 'Mushroom masala with 2 whole wheat rotis' },
];

const nonVegDinner: MealOption[] = [
    { name: 'Grilled Chicken + Salad', calories: 400, protein: 40, carbs: 12, fats: 18, description: 'Herb-grilled chicken breast with mixed green salad' },
    { name: 'Egg Bhurji + Roti', calories: 380, protein: 22, carbs: 36, fats: 16, description: '4 egg bhurji with 2 rotis' },
    { name: 'Fish Tikka + Salad', calories: 360, protein: 36, carbs: 10, fats: 16, description: 'Grilled fish tikka with cucumber-carrot salad' },
    { name: 'Chicken Soup + Bread', calories: 320, protein: 28, carbs: 30, fats: 8, description: 'Hot chicken soup with whole wheat bread' },
    ...vegDinner.slice(0, 2),
];

const vegSnacks: MealOption[] = [
    { name: 'Paneer Tikka (6 pieces)', calories: 220, protein: 16, carbs: 8, fats: 14, description: 'Air-fried paneer tikka cubes' },
    { name: 'Roasted Chana', calories: 160, protein: 10, carbs: 22, fats: 4, description: '1 cup roasted chickpeas with chaat masala' },
    { name: 'Protein Smoothie', calories: 240, protein: 20, carbs: 28, fats: 6, description: 'Banana + peanut butter + milk smoothie' },
    { name: 'Sprouts Chaat', calories: 180, protein: 12, carbs: 24, fats: 4, description: 'Mixed sprouts with onion, tomato & lemon' },
    { name: 'Greek Yogurt + Nuts', calories: 200, protein: 14, carbs: 16, fats: 8, description: 'Thick curd with almonds and walnuts' },
];

const nonVegSnacks: MealOption[] = [
    { name: 'Boiled Eggs (4)', calories: 280, protein: 24, carbs: 2, fats: 18, description: '4 whole boiled eggs with black pepper' },
    { name: 'Chicken Tikka (6 pieces)', calories: 240, protein: 30, carbs: 4, fats: 10, description: 'Grilled chicken tikka bites' },
    ...vegSnacks.slice(2),
];

const preWorkoutMeals: MealOption[] = [
    { name: 'Banana + Peanut Butter', calories: 220, protein: 6, carbs: 30, fats: 10, description: '1 banana with 1 tbsp peanut butter' },
    { name: 'Oats + Black Coffee', calories: 200, protein: 8, carbs: 34, fats: 4, description: 'Quick oats with black coffee' },
    { name: 'Apple + Almonds', calories: 180, protein: 4, carbs: 26, fats: 8, description: '1 apple with 8-10 almonds' },
];

const postWorkoutMeals: MealOption[] = [
    { name: 'Whey Shake + Banana', calories: 280, protein: 30, carbs: 32, fats: 4, description: 'Whey protein with banana & milk' },
    { name: 'Paneer Wrap', calories: 320, protein: 22, carbs: 28, fats: 12, description: 'Whole wheat wrap with paneer & veggies' },
    { name: 'Egg Sandwich', calories: 300, protein: 20, carbs: 30, fats: 10, description: 'Whole wheat bread with scrambled eggs & veggies' },
];

function pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateDietPlan(
    calorieTarget: number,
    proteinTarget: number,
    dietPreference: string
): MealPlan {
    const isNonVeg = dietPreference === 'non_veg';
    const isEgg = dietPreference === 'eggetarian';

    const breakfastPool = isNonVeg || isEgg ? nonVegBreakfast : vegBreakfast;
    const lunchPool = isNonVeg ? nonVegLunch : vegLunch;
    const dinnerPool = isNonVeg ? nonVegDinner : vegDinner;
    const snackPool = isNonVeg || isEgg ? nonVegSnacks : vegSnacks;

    const breakfast = pickRandom(breakfastPool);
    const midMorning = pickRandom(snackPool);
    const lunch = pickRandom(lunchPool);
    const preWorkout = pickRandom(preWorkoutMeals);
    const postWorkout = pickRandom(postWorkoutMeals);
    const dinner = pickRandom(dinnerPool);

    const totalCalories = breakfast.calories + midMorning.calories + lunch.calories +
        preWorkout.calories + postWorkout.calories + dinner.calories;
    const totalProtein = breakfast.protein + midMorning.protein + lunch.protein +
        preWorkout.protein + postWorkout.protein + dinner.protein;
    const totalCarbs = breakfast.carbs + midMorning.carbs + lunch.carbs +
        preWorkout.carbs + postWorkout.carbs + dinner.carbs;
    const totalFats = breakfast.fats + midMorning.fats + lunch.fats +
        preWorkout.fats + postWorkout.fats + dinner.fats;

    return {
        breakfast, midMorning, lunch, preWorkout, postWorkout, dinner,
        totalCalories, totalProtein, totalCarbs, totalFats,
    };
}
