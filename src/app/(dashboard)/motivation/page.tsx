'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlassCard from '@/components/ui/GlassCard';
import { MOTIVATIONAL_QUOTES, FITNESS_TIPS } from '@/lib/constants';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Relatable fitness images for quote backgrounds (rotate with quotes)
const quoteImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80&auto=format&fit=crop',
];

// Mindset pillars with images
const mindsetPillars = [
    {
        icon: '🎯', title: 'Consistency',
        desc: 'Show up every day. Small steps compound into massive results.',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80&auto=format&fit=crop',
        color: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
        icon: '💎', title: 'Discipline',
        desc: 'Motivation fades. Discipline is what separates winners.',
        image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80&auto=format&fit=crop',
        color: 'from-purple-500/20 to-purple-500/5',
    },
    {
        icon: '🔥', title: 'Intensity',
        desc: 'Train hard, recover harder. Every rep counts.',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80&auto=format&fit=crop',
        color: 'from-orange-500/20 to-orange-500/5',
    },
    {
        icon: '🧘', title: 'Recovery',
        desc: 'Muscles grow during rest. Sleep, stretch, and refuel.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80&auto=format&fit=crop',
        color: 'from-green-500/20 to-green-500/5',
    },
];

// Challenge ideas
const dailyChallenges = [
    { title: '100 Push-ups', desc: 'Split across 4 sets throughout the day', icon: '💪', difficulty: 'Medium' },
    { title: '10K Steps', desc: 'Walk 10,000 steps before sunset', icon: '🚶', difficulty: 'Easy' },
    { title: '5 Min Plank', desc: 'Hold a plank for 5 total minutes today', icon: '🧱', difficulty: 'Hard' },
    { title: 'No Sugar Day', desc: 'Zero refined sugar for 24 hours', icon: '🍬', difficulty: 'Medium' },
    { title: '4L Water', desc: 'Drink 4 liters of water today', icon: '💧', difficulty: 'Easy' },
    { title: '30 Min Cardio', desc: 'Run, cycle, or jump rope for 30 min', icon: '🏃', difficulty: 'Medium' },
];

export default function MotivationPage() {
    const [quoteIdx, setQuoteIdx] = useState(0);
    const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);
    const [tip, setTip] = useState(FITNESS_TIPS[0]);
    const [streak, setStreak] = useState(0);
    const [disciplineScore, setDisciplineScore] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [challengeAccepted, setChallengeAccepted] = useState<Record<string, boolean>>({});
    const [todayChallenge, setTodayChallenge] = useState(dailyChallenges[0]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        const qIdx = dayOfYear % MOTIVATIONAL_QUOTES.length;
        setQuoteIdx(qIdx);
        setQuote(MOTIVATIONAL_QUOTES[qIdx]);
        setTip(FITNESS_TIPS[dayOfYear % FITNESS_TIPS.length]);
        setTodayChallenge(dailyChallenges[dayOfYear % dailyChallenges.length]);

        // Load liked state
        const likedQuotes = JSON.parse(localStorage.getItem('physique_liked_quotes') || '[]');
        setLiked(likedQuotes.includes(qIdx));
        setLikeCount(likedQuotes.length);

        // Load challenge state
        const accepted = JSON.parse(localStorage.getItem('physique_challenges') || '{}');
        setChallengeAccepted(accepted);

        // Calculate streak
        let s = 0;
        for (let i = 0; i < 30; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toISOString().split('T')[0];
            const data = localStorage.getItem(`physique_habits_${key}`);
            if (data) {
                const habits = JSON.parse(data);
                const completed = habits.filter((h: { completed: boolean }) => h.completed).length;
                if (completed >= 3) s++;
                else break;
            } else {
                if (i === 0) continue;
                break;
            }
        }
        setStreak(s);
        setDisciplineScore(Math.min(100, Math.round((s / 30) * 100)));
    }, []);

    const refreshQuote = useCallback(() => {
        const idx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
        setQuoteIdx(idx);
        setQuote(MOTIVATIONAL_QUOTES[idx]);
        setLiked(JSON.parse(localStorage.getItem('physique_liked_quotes') || '[]').includes(idx));
    }, []);

    const refreshTip = useCallback(() => {
        setTip(FITNESS_TIPS[Math.floor(Math.random() * FITNESS_TIPS.length)]);
    }, []);

    const toggleLike = () => {
        const likedQuotes: number[] = JSON.parse(localStorage.getItem('physique_liked_quotes') || '[]');
        if (liked) {
            const updated = likedQuotes.filter((i) => i !== quoteIdx);
            localStorage.setItem('physique_liked_quotes', JSON.stringify(updated));
            setLikeCount(updated.length);
        } else {
            likedQuotes.push(quoteIdx);
            localStorage.setItem('physique_liked_quotes', JSON.stringify(likedQuotes));
            setLikeCount(likedQuotes.length);
        }
        setLiked(!liked);
    };

    const copyQuote = () => {
        navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const acceptChallenge = (idx: number) => {
        const today = new Date().toISOString().split('T')[0];
        const key = `${today}_${idx}`;
        const updated = { ...challengeAccepted, [key]: !challengeAccepted[key] };
        setChallengeAccepted(updated);
        localStorage.setItem('physique_challenges', JSON.stringify(updated));
    };

    const todayKey = new Date().toISOString().split('T')[0];

    // Discipline ring circumference
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (disciplineScore / 100) * circumference;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                    🔥 Motivation Engine
                </h1>
                <p className="text-sm text-gray-400 mt-1">Stay disciplined, stay hungry</p>
            </motion.div>

            {/* ─── Hero Quote with Background Image ─── */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="overflow-hidden">
                    <div className="relative min-h-[260px] md:min-h-[300px] flex flex-col justify-end">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={quoteIdx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={quoteImages[quoteIdx % quoteImages.length]}
                                    alt="Motivation"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/70 to-[#0a0a12]/20" />

                        <div className="relative z-10 p-6 md:p-8">
                            <p className="text-xs text-cyan-400 uppercase tracking-widest mb-3">💡 Quote of the Day</p>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={quote.text}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p className="text-xl md:text-2xl text-white italic leading-relaxed font-light">
                                        &ldquo;{quote.text}&rdquo;
                                    </p>
                                    <p className="text-sm text-cyan-400 mt-3 font-medium">— {quote.author}</p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Interactive buttons */}
                            <div className="flex items-center gap-3 mt-5">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleLike}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${liked
                                        ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                                        : 'bg-white/[0.06] text-gray-400 border border-white/[0.06] hover:text-pink-400'
                                        }`}
                                >
                                    <motion.span
                                        animate={liked ? { scale: [1, 1.4, 1] } : {}}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {liked ? '❤️' : '🤍'}
                                    </motion.span>
                                    {liked ? 'Liked' : 'Like'}
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={copyQuote}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-gray-400 border border-white/[0.06] hover:text-cyan-400 transition-all cursor-pointer"
                                >
                                    {copied ? '✅' : '📋'} {copied ? 'Copied!' : 'Copy'}
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={refreshQuote}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-gray-400 border border-white/[0.06] hover:text-cyan-400 transition-all cursor-pointer"
                                >
                                    🔄 New Quote
                                </motion.button>

                                {likeCount > 0 && (
                                    <span className="text-xs text-gray-500 ml-auto">{likeCount} quotes saved</span>
                                )}
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* ─── Streak & Discipline with Animated Ring ─── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassCard hover={false} glow="cyan" className="p-6 overflow-hidden">
                    <div className="relative flex items-center gap-5">
                        <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80&auto=format&fit=crop"
                                alt="Streak"
                                fill
                                className="object-cover rounded-xl opacity-30"
                                unoptimized
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.span
                                    className="text-3xl"
                                    animate={{ scale: [1, 1.15, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    🔥
                                </motion.span>
                            </div>
                        </div>
                        <div>
                            <motion.p
                                className="text-4xl font-bold text-white"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                            >
                                {streak}
                            </motion.p>
                            <p className="text-sm text-gray-400">Day Streak</p>
                            <p className="text-xs text-cyan-400 mt-1">
                                {streak >= 7 ? '🏆 Incredible!' : streak >= 3 ? '💪 Keep pushing!' : '🌱 Build it!'}
                            </p>
                        </div>
                    </div>
                </GlassCard>

                <GlassCard hover={false} glow="purple" className="p-6">
                    <div className="flex items-center gap-5">
                        {/* SVG Ring */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                                <motion.circle
                                    cx="50" cy="50" r={radius} fill="none"
                                    stroke="url(#grad)" strokeWidth="6" strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: dashOffset }}
                                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                                />
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.span
                                    className="text-xl font-bold text-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    {disciplineScore}%
                                </motion.span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Discipline Score</p>
                            <p className="text-xs text-purple-400 mt-1">Based on last 30 days</p>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* ─── Daily Challenge ─── */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="overflow-hidden">
                    <div className="relative">
                        <div className="absolute inset-0">
                            <Image
                                src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80&auto=format&fit=crop"
                                alt="Challenge"
                                fill
                                className="object-cover opacity-15"
                                unoptimized
                            />
                        </div>
                        <div className="relative p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs text-orange-400 uppercase tracking-widest font-medium">⚡ Today&apos;s Challenge</p>
                                    <h3 className="text-lg font-bold text-white mt-1">{todayChallenge.icon} {todayChallenge.title}</h3>
                                </div>
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${todayChallenge.difficulty === 'Easy' ? 'bg-green-500/15 text-green-400' :
                                    todayChallenge.difficulty === 'Medium' ? 'bg-yellow-500/15 text-yellow-400' :
                                        'bg-red-500/15 text-red-400'
                                    }`}>
                                    {todayChallenge.difficulty}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400">{todayChallenge.desc}</p>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => acceptChallenge(dailyChallenges.indexOf(todayChallenge))}
                                className={`mt-4 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${challengeAccepted[`${todayKey}_${dailyChallenges.indexOf(todayChallenge)}`]
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                                    }`}
                            >
                                {challengeAccepted[`${todayKey}_${dailyChallenges.indexOf(todayChallenge)}`]
                                    ? '✅ Challenge Accepted!'
                                    : '🚀 Accept Challenge'}
                            </motion.button>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>

            {/* ─── Fitness Tip ─── */}
            <motion.div variants={itemVariants}>
                <GlassCard hover={false} className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24">
                        <Image
                            src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=200&q=80&auto=format&fit=crop"
                            alt="Fitness tip"
                            fill
                            className="object-cover rounded-bl-3xl opacity-20"
                            unoptimized
                        />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-white font-[family-name:var(--font-outfit)]">🧠 Fitness Tip</h3>
                            <button onClick={refreshTip} className="text-xs text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer">
                                🔄 New Tip
                            </button>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={tip}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-gray-300 leading-relaxed"
                            >
                                {tip}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </GlassCard>
            </motion.div>

            {/* ─── Mindset Pillars with Images ─── */}
            <motion.div variants={itemVariants}>
                <h3 className="text-base font-semibold text-white mb-3 font-[family-name:var(--font-outfit)]">🧠 Mindset Pillars</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mindsetPillars.map((pillar) => (
                        <motion.div
                            key={pillar.title}
                            whileHover={{ y: -4, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <GlassCard hover={false} className="overflow-hidden group">
                                <div className="relative h-32">
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${pillar.color} from-[#0a0a12] via-[#0a0a12]/70 to-transparent`} />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{pillar.icon}</span>
                                            <h4 className="text-base font-bold text-white">{pillar.title}</h4>
                                        </div>
                                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">{pillar.desc}</p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
