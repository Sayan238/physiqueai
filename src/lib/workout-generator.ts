import { WorkoutPlan, WorkoutDay } from '@/types';

const pushDay: WorkoutDay = {
    day: 'Push Day',
    focus: 'Chest, Shoulders, Triceps',
    exercises: [
        { name: 'Barbell Bench Press', muscleGroup: 'Chest', sets: 4, reps: '8-10', rest: '90s', tip: 'Increase weight by 2.5kg when you hit 10 reps for all sets' },
        { name: 'Incline Dumbbell Press', muscleGroup: 'Upper Chest', sets: 3, reps: '10-12', rest: '75s', tip: 'Keep a 30-45° incline for upper chest activation' },
        { name: 'Overhead Press', muscleGroup: 'Shoulders', sets: 4, reps: '8-10', rest: '90s', tip: 'Brace your core and avoid excessive back arch' },
        { name: 'Lateral Raises', muscleGroup: 'Side Delts', sets: 3, reps: '12-15', rest: '60s', tip: 'Lead with your elbows, light weight with control' },
        { name: 'Cable Flyes', muscleGroup: 'Chest', sets: 3, reps: '12-15', rest: '60s', tip: 'Squeeze at the peak contraction for 1 second' },
        { name: 'Tricep Pushdowns', muscleGroup: 'Triceps', sets: 3, reps: '12-15', rest: '60s', tip: 'Keep elbows pinned to your sides' },
        { name: 'Overhead Tricep Extension', muscleGroup: 'Triceps', sets: 3, reps: '10-12', rest: '60s', tip: 'Use a rope attachment for full range of motion' },
    ],
};

const pullDay: WorkoutDay = {
    day: 'Pull Day',
    focus: 'Back, Biceps, Rear Delts',
    exercises: [
        { name: 'Deadlift / Barbell Row', muscleGroup: 'Back', sets: 4, reps: '6-8', rest: '120s', tip: 'Maintain neutral spine throughout the movement' },
        { name: 'Lat Pulldowns', muscleGroup: 'Lats', sets: 4, reps: '10-12', rest: '75s', tip: 'Pull to upper chest, squeeze shoulder blades together' },
        { name: 'Seated Cable Row', muscleGroup: 'Mid Back', sets: 3, reps: '10-12', rest: '75s', tip: 'Focus on squeezing your back, not pulling with arms' },
        { name: 'Face Pulls', muscleGroup: 'Rear Delts', sets: 3, reps: '15-20', rest: '60s', tip: 'External rotate at the top of the movement' },
        { name: 'Barbell Curls', muscleGroup: 'Biceps', sets: 3, reps: '10-12', rest: '60s', tip: 'No swinging — slow eccentric for maximum growth' },
        { name: 'Hammer Curls', muscleGroup: 'Brachialis', sets: 3, reps: '10-12', rest: '60s', tip: 'Alternate arms or do both simultaneously' },
        { name: 'Reverse Flyes', muscleGroup: 'Rear Delts', sets: 3, reps: '12-15', rest: '60s', tip: 'Use light weight with perfect form' },
    ],
};

const legDay: WorkoutDay = {
    day: 'Leg Day',
    focus: 'Quads, Hamstrings, Glutes, Calves',
    exercises: [
        { name: 'Barbell Squats', muscleGroup: 'Quads', sets: 4, reps: '8-10', rest: '120s', tip: 'Go below parallel for full quad and glute activation' },
        { name: 'Romanian Deadlifts', muscleGroup: 'Hamstrings', sets: 4, reps: '10-12', rest: '90s', tip: 'Feel the stretch in your hamstrings, hinge at hips' },
        { name: 'Leg Press', muscleGroup: 'Quads', sets: 3, reps: '12-15', rest: '90s', tip: 'Place feet high on the platform for more glute activation' },
        { name: 'Walking Lunges', muscleGroup: 'Quads/Glutes', sets: 3, reps: '12 each', rest: '75s', tip: 'Keep your torso upright and core tight' },
        { name: 'Leg Curls', muscleGroup: 'Hamstrings', sets: 3, reps: '12-15', rest: '60s', tip: 'Slow eccentric for maximum hamstring tension' },
        { name: 'Calf Raises', muscleGroup: 'Calves', sets: 4, reps: '15-20', rest: '45s', tip: 'Full range of motion — stretch at bottom, squeeze at top' },
        { name: 'Hip Thrusts', muscleGroup: 'Glutes', sets: 3, reps: '10-12', rest: '75s', tip: 'Squeeze glutes hard at the top for 2 seconds' },
    ],
};

const fullBodyDay: WorkoutDay = {
    day: 'Full Body',
    focus: 'All Major Muscle Groups',
    exercises: [
        { name: 'Goblet Squats', muscleGroup: 'Quads', sets: 3, reps: '12-15', rest: '75s', tip: 'Hold a dumbbell at chest height, keep elbows inside knees' },
        { name: 'Dumbbell Bench Press', muscleGroup: 'Chest', sets: 3, reps: '10-12', rest: '75s', tip: 'Full range of motion, touch chest at bottom' },
        { name: 'Dumbbell Rows', muscleGroup: 'Back', sets: 3, reps: '10-12', rest: '60s', tip: 'Pull to hip, squeeze shoulder blade at top' },
        { name: 'Dumbbell Shoulder Press', muscleGroup: 'Shoulders', sets: 3, reps: '10-12', rest: '60s', tip: 'Seated variation for beginners for stability' },
        { name: 'Bicep Curls', muscleGroup: 'Biceps', sets: 2, reps: '12-15', rest: '45s', tip: 'Slow and controlled, no momentum' },
        { name: 'Tricep Dips', muscleGroup: 'Triceps', sets: 2, reps: '12-15', rest: '45s', tip: 'Use a bench for assisted dips if needed' },
        { name: 'Plank', muscleGroup: 'Core', sets: 3, reps: '30-60s', rest: '30s', tip: 'Keep your body in a straight line, squeeze core' },
    ],
};

const coreDay: WorkoutDay = {
    day: 'Core Day',
    focus: 'Abs, Obliques, Lower Back',
    exercises: [
        { name: 'Hanging Leg Raises', muscleGroup: 'Lower Abs', sets: 4, reps: '12-15', rest: '60s', tip: 'Control the movement, no swinging' },
        { name: 'Cable Crunches', muscleGroup: 'Upper Abs', sets: 3, reps: '15-20', rest: '45s', tip: 'Focus on flexing your spine, not pulling with arms' },
        { name: 'Russian Twists', muscleGroup: 'Obliques', sets: 3, reps: '20 total', rest: '45s', tip: 'Use a medicine ball or plate for added resistance' },
        { name: 'Plank', muscleGroup: 'Core', sets: 3, reps: '45-60s', rest: '30s', tip: 'Keep hips level, squeeze everything tight' },
        { name: 'Bicycle Crunches', muscleGroup: 'Obliques', sets: 3, reps: '20 total', rest: '45s', tip: 'Touch elbow to opposite knee with control' },
        { name: 'Ab Wheel Rollouts', muscleGroup: 'Full Core', sets: 3, reps: '10-12', rest: '60s', tip: 'Start from knees, extend as far as you can control' },
        { name: 'Dead Bug', muscleGroup: 'Deep Core', sets: 3, reps: '12 each', rest: '45s', tip: 'Press lower back into the floor throughout' },
    ],
};

const hiitCardio: WorkoutDay = {
    day: 'HIIT Cardio',
    focus: 'Fat Burning, Endurance',
    exercises: [
        { name: 'Jump Squats', muscleGroup: 'Full Body', sets: 4, reps: '30s on / 30s rest', rest: '30s', tip: 'Land softly, immediately go into next rep' },
        { name: 'Mountain Climbers', muscleGroup: 'Core/Cardio', sets: 4, reps: '30s on / 30s rest', rest: '30s', tip: 'Keep hips low, drive knees to chest' },
        { name: 'Burpees', muscleGroup: 'Full Body', sets: 3, reps: '10-12', rest: '45s', tip: 'Add a push-up at the bottom for extra intensity' },
        { name: 'High Knees', muscleGroup: 'Cardio', sets: 4, reps: '30s on / 30s rest', rest: '30s', tip: 'Pump your arms and drive knees high' },
        { name: 'Jumping Lunges', muscleGroup: 'Legs', sets: 3, reps: '20 total', rest: '45s', tip: 'Switch legs mid-air, land softly' },
        { name: 'Battle Ropes / Skipping', muscleGroup: 'Full Body', sets: 3, reps: '45s', rest: '45s', tip: 'Maintain maximum intensity throughout' },
    ],
};

export function generateWorkoutPlan(
    goal: string,
    experience: string
): WorkoutPlan {
    // Muscle Gain + Intermediate/Advanced → 6-day PPL
    if (goal === 'muscle_gain' && (experience === 'intermediate' || experience === 'advanced')) {
        return {
            name: 'Push Pull Legs (PPL)',
            description: '6-day high-volume split for maximum muscle hypertrophy. Each muscle group is trained twice per week with progressive overload.',
            daysPerWeek: 6,
            schedule: [
                { ...pushDay, day: 'Day 1 — Push' },
                { ...pullDay, day: 'Day 2 — Pull' },
                { ...legDay, day: 'Day 3 — Legs' },
                { ...pushDay, day: 'Day 4 — Push' },
                { ...pullDay, day: 'Day 5 — Pull' },
                { ...legDay, day: 'Day 6 — Legs' },
            ],
        };
    }

    // Muscle Gain + Beginner → 4-day Upper/Lower
    if (goal === 'muscle_gain' && experience === 'beginner') {
        return {
            name: 'Beginner Full Body Split',
            description: '4-day full body routine designed for beginners. Focus on learning proper form and building a strength foundation.',
            daysPerWeek: 4,
            schedule: [
                { ...fullBodyDay, day: 'Day 1 — Full Body A' },
                { ...fullBodyDay, day: 'Day 2 — Full Body B' },
                { ...fullBodyDay, day: 'Day 3 — Full Body A' },
                { ...fullBodyDay, day: 'Day 4 — Full Body B' },
            ],
        };
    }

    // Fat Loss → Full Body + HIIT
    if (goal === 'fat_loss') {
        return {
            name: 'Fat Loss Program',
            description: '5-day fat loss program combining full body strength training with HIIT cardio for maximum calorie burn.',
            daysPerWeek: 5,
            schedule: [
                { ...fullBodyDay, day: 'Day 1 — Strength' },
                { ...hiitCardio, day: 'Day 2 — HIIT Cardio' },
                { ...fullBodyDay, day: 'Day 3 — Strength' },
                { ...hiitCardio, day: 'Day 4 — HIIT Cardio' },
                { ...fullBodyDay, day: 'Day 5 — Strength' },
            ],
        };
    }

    // Six Pack → Core-focused + compound lifts
    if (goal === 'six_pack') {
        return {
            name: 'Six-Pack Program',
            description: '5-day program focused on core development with compound lifts and HIIT for fat burning to reveal abs.',
            daysPerWeek: 5,
            schedule: [
                { ...coreDay, day: 'Day 1 — Core + Abs' },
                { ...pushDay, day: 'Day 2 — Push' },
                { ...coreDay, day: 'Day 3 — Core + HIIT' },
                { ...pullDay, day: 'Day 4 — Pull' },
                { ...coreDay, day: 'Day 5 — Core + Legs' },
            ],
        };
    }

    // Maintenance — Moderate 4-day
    return {
        name: 'Maintenance Program',
        description: '4-day balanced program to maintain current physique with moderate volume and intensity.',
        daysPerWeek: 4,
        schedule: [
            { ...pushDay, day: 'Day 1 — Upper Push' },
            { ...legDay, day: 'Day 2 — Legs' },
            { ...pullDay, day: 'Day 3 — Upper Pull' },
            { ...coreDay, day: 'Day 4 — Core' },
        ],
    };
}
