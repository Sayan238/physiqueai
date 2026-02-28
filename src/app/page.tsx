'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GradientButton from '@/components/ui/GradientButton';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const features = [
  { icon: '🧮', title: 'Smart Calculator', desc: 'BMI, TDEE, macros & timeline — instant results', image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=600&q=80', gradient: 'from-cyan-500/80 to-blue-500/80' },
  { icon: '🥗', title: 'AI Diet Plans', desc: 'Indian-friendly meal plans for your exact goals', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', gradient: 'from-green-500/80 to-emerald-500/80' },
  { icon: '💪', title: 'AI Workouts', desc: 'PPL, beginner splits & core routines generated for you', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', gradient: 'from-purple-500/80 to-pink-500/80' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Beautiful charts for weight, calories & protein', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', gradient: 'from-orange-500/80 to-amber-500/80' },
  { icon: '✅', title: 'Habit Tracker', desc: 'Build consistency with daily habit monitoring', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80', gradient: 'from-teal-500/80 to-cyan-500/80' },
  { icon: '🔥', title: 'Motivation Engine', desc: 'Daily quotes & discipline scoring to keep you going', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', gradient: 'from-red-500/80 to-rose-500/80' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6 },
  },
};

import { useState, useEffect } from 'react';

// ... other imports ...

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-[#06060a] relative overflow-hidden">
      {/* Animated Background Orbs */}
      <AnimatedBackground />

      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${isScrolled
          ? 'bg-[#06060a]/70 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-cyan-500/20"
          >
            P
          </motion.div>
          <span className="text-2xl font-black text-white font-[family-name:var(--font-outfit)] tracking-tight group-hover:text-cyan-400 transition-colors">
            Physique<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              Sign In
            </motion.button>
          </Link>
          <Link href="/signup">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GradientButton size="sm">Get Started</GradientButton>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section with Background Image */}
      <section ref={heroRef} className="relative z-10 overflow-hidden">
        {/* Hero Background Image */}
        <motion.div
          style={{ y: heroImageY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&auto=format&fit=crop"
            alt="Fitness hero background"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="hero-image-overlay" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 md:pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-gray-300 mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI-Powered Fitness Engine
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-[family-name:var(--font-outfit)] max-w-4xl leading-tight"
          >
            Transform Your Body With{' '}
            <motion.span
              className="gradient-text-cyan inline-block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%', background: 'linear-gradient(135deg, #00e5ff, #0091ea, #a855f7, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              AI Precision
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mt-6 leading-relaxed"
          >
            Personalized Indian diet plans, intelligent workout routines, and smart progress tracking
            — all powered by AI. Your fitness coach that actually understands you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          >
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <GradientButton size="lg" variant="cyan">
                  Start Free — No Credit Card
                </GradientButton>
              </motion.div>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl text-sm text-gray-300 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-all cursor-pointer backdrop-blur-sm"
              >
                I already have an account
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats with counting effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-8 md:gap-16 mt-16 text-center"
          >
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Meals Generated', value: '50K+' },
              { label: 'Workouts Created', value: '30K+' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.15 }}
              >
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-outfit)]">
            Everything You Need to <span className="gradient-text-purple">Succeed</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A complete AI fitness ecosystem designed for the Indian lifestyle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative flex flex-col overflow-hidden rounded-[24px] bg-[#0A0A12] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 shadow-2xl group"
            >
              {/* Image Banner */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-transparent to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-500`} />
              </div>

              {/* Content Panel */}
              <div className="relative z-10 flex-1 flex flex-col p-6 pt-0 bg-[#0A0A12]">
                {/* Floating Icon */}
                <div className="relative -mt-8 mb-4">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-[18px] bg-[#12121A] border-2 border-[#1E1E28] shadow-2xl flex items-center justify-center text-3xl relative overflow-hidden group-hover:border-white/20 transition-colors duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`} />
                    <span className="relative z-10 drop-shadow-lg">{feature.icon}</span>
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{feature.desc}</p>

                {/* Subtle bottom glow line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-20 bg-[#06060a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-medium mb-4">
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-outfit)]">
            Start Free, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Update Later</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Get started today with our powerful core features completely for free.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 rounded-[32px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl p-8 md:p-10 flex flex-col relative overflow-hidden group hover:border-cyan-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:opacity-20 transition-opacity">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white">$0</span>
              <span className="text-gray-500 font-medium">/forever</span>
            </div>
            <p className="text-sm text-gray-400 mb-8 max-w-xs">Everything you need to kickstart your fitness journey.</p>

            <ul className="space-y-4 mb-10 flex-1">
              {['AI Diet Plans', 'Smart Workouts', 'Progress Dashboard', 'Daily Motivation Quotes', 'Habit Tracker'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 text-[10px]">✓</span>
                  </div>
                  <span className="text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup" className="w-full">
              <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/10">
                Get Started Now
              </button>
            </Link>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 rounded-[32px] bg-gradient-to-b from-[#120B2E] to-[#0A0A12] border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.1)] p-8 md:p-10 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:opacity-20 transition-opacity">👑</div>
            <div className="absolute top-0 center w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

            <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] text-white font-bold tracking-wider uppercase mb-4">
              Coming Soon
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Pro</h3>
            <div className="flex items-baseline gap-2 mb-6 opacity-40">
              <span className="text-5xl font-black text-white">$9</span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            <p className="text-sm text-gray-400 mb-8 max-w-xs">Advanced AI coaching and premium features. Upgrade later.</p>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                'Everything in Basic',
                '1-on-1 AI Conversational Coach',
                'Advanced Form Checking via Camera',
                'Premium Indian Recipes & Macros',
                'Exportable Weekly Reports'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                    <span className="text-purple-400 text-[10px]">✓</span>
                  </div>
                  <span className="text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 font-semibold transition-colors cursor-not-allowed">
              Join Waitlist
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Image */}
      <section className="relative z-10 px-6 py-24 md:py-32 overflow-hidden flex items-center justify-center">
        {/* CTA Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&auto=format&fit=crop"
            alt="Workout motivation"
            fill
            className="object-cover object-center opacity-20"
            unoptimized
          />
          <div className="absolute inset-0 bg-[#06060a]/80 backdrop-blur-sm" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative z-10 w-full max-w-5xl rounded-3xl bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-hidden group"
        >
          {/* Animated glow orb behind card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-10">

            {/* Left Content */}
            <div className="flex-1 text-center md:text-left z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Your Journey Starts Here
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-outfit)] leading-tight mb-6">
                  Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Physique?</span>
                </h2>

                <ul className="space-y-4 mb-8 text-left max-w-sm mx-auto md:mx-0">
                  {[
                    'AI-powered personalized diet plans',
                    'Intelligent workout generation',
                    'Advanced progress tracking'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0 text-cyan-400 text-xs">
                        ✓
                      </div>
                      <span className="text-sm font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Content / Button */}
            <div className="flex-shrink-0 z-10 flex flex-col items-center">
              <Link href="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/btn"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-lg opacity-40 group-hover/btn:opacity-80 transition duration-500 group-hover/btn:duration-200" />
                  <button className="relative flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-[#06060a] border border-white/10 text-white font-semibold text-lg hover:bg-white/[0.02] transition-colors min-w-[240px]">
                    Create Free Account
                    <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </motion.div>
              </Link>
              <p className="text-xs text-gray-500 mt-4 font-light text-center">
                No credit card required. Cancel anytime.
              </p>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 text-center">
        <p className="text-xs text-gray-600">
          © 2026 PhysiqueAI. Built with 💪 for fitness enthusiasts.
        </p>
      </footer>
    </div>
  );
}
