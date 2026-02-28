// ── User & Auth Types ──────────────────────────────────────
export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  googleId?: string;
  age?: number;
  gender?: 'male' | 'female';
  height?: number;
  weight?: number;
  goalWeight?: number;
  goal?: 'muscle_gain' | 'fat_loss' | 'six_pack' | 'maintenance';
  dietPreference?: 'veg' | 'non_veg' | 'eggetarian';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'extra_active';
  workoutExperience?: 'beginner' | 'intermediate' | 'advanced';
  bmi?: number;
  tdee?: number;
  calorieTarget?: number;
  proteinTarget?: number;
  profileComplete?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

// ── Fitness Calculator Types ───────────────────────────────
export interface FitnessResults {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  waterIntake: number;
  timelineWeeks: number;
}

// ── Diet Types ─────────────────────────────────────────────
export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description?: string;
}

export interface MealPlan {
  breakfast: Meal;
  midMorning: Meal;
  lunch: Meal;
  preWorkout: Meal;
  postWorkout: Meal;
  dinner: Meal;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

// ── Workout Types ──────────────────────────────────────────
export interface Exercise {
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  rest: string;
  tip?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  name: string;
  description: string;
  daysPerWeek: number;
  schedule: WorkoutDay[];
}

// ── Progress Types ─────────────────────────────────────────
export interface ProgressEntry {
  _id?: string;
  date: string;
  weight: number;
  caloriesConsumed: number;
  proteinConsumed: number;
  waterGlasses: number;
  notes?: string;
}

// ── Habit Types ────────────────────────────────────────────
export interface HabitItem {
  name: string;
  icon: string;
  target: number;
  achieved: number;
  unit: string;
  completed: boolean;
}

export interface DailyHabits {
  _id?: string;
  date: string;
  habits: HabitItem[];
}

// ── Onboarding Form Types ──────────────────────────────────
export interface OnboardingData {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  goalWeight: number;
  goal: 'muscle_gain' | 'fat_loss' | 'six_pack' | 'maintenance';
  dietPreference: 'veg' | 'non_veg' | 'eggetarian';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'extra_active';
  workoutExperience: 'beginner' | 'intermediate' | 'advanced';
}
