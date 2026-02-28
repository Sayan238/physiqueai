import { FitnessResults } from '@/types';
import { ACTIVITY_MULTIPLIERS } from './constants';

export function calculateFitness(
    age: number,
    gender: 'male' | 'female',
    height: number, // cm
    weight: number, // kg
    goalWeight: number,
    goal: string,
    activityLevel: string
): FitnessResults {
    // BMI
    const heightM = height / 100;
    const bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    // BMR (Mifflin-St Jeor)
    const bmr =
        gender === 'male'
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;

    // TDEE
    const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
    const tdee = Math.round(bmr * multiplier);

    // Calorie Target
    let calorieAdjustment = 0;
    if (goal === 'muscle_gain') calorieAdjustment = 400;
    else if (goal === 'fat_loss') calorieAdjustment = -500;
    else if (goal === 'six_pack') calorieAdjustment = -600;
    const calorieTarget = Math.round(tdee + calorieAdjustment);

    // Protein Target (g/day)
    let proteinPerKg = 1.8;
    if (goal === 'muscle_gain') proteinPerKg = 2.2;
    else if (goal === 'fat_loss') proteinPerKg = 2.0;
    else if (goal === 'six_pack') proteinPerKg = 2.2;
    const proteinTarget = Math.round(weight * proteinPerKg);
    const proteinCalories = proteinTarget * 4;

    // Fat Target (25-30% of calories)
    const fatCalories = Math.round(calorieTarget * 0.25);
    const fatTarget = Math.round(fatCalories / 9);

    // Carb Target (remaining calories)
    const carbCalories = calorieTarget - proteinCalories - fatCalories;
    const carbTarget = Math.round(carbCalories / 4);

    // Water Intake (liters)
    const waterIntake = parseFloat((weight * 0.033).toFixed(1));

    // Timeline (weeks to reach goal weight)
    const weightDiff = Math.abs(weight - goalWeight);
    const dailyChange = Math.abs(calorieAdjustment) > 0 ? Math.abs(calorieAdjustment) : 300;
    // 7700 calories ≈ 1 kg of body fat
    const timelineWeeks = weightDiff > 0
        ? Math.round((weightDiff * 7700) / dailyChange / 7)
        : 0;

    return {
        bmi,
        bmiCategory,
        bmr: Math.round(bmr),
        tdee,
        calorieTarget,
        proteinTarget,
        carbTarget,
        fatTarget,
        waterIntake,
        timelineWeeks,
    };
}
