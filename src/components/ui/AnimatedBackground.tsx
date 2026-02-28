'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const orbs = [
    { size: 300, x: '10%', y: '20%', color: 'rgba(0,229,255,0.06)', duration: 20, delay: 0 },
    { size: 250, x: '80%', y: '10%', color: 'rgba(168,85,247,0.06)', duration: 25, delay: 2 },
    { size: 200, x: '50%', y: '60%', color: 'rgba(0,229,255,0.04)', duration: 18, delay: 4 },
    { size: 350, x: '20%', y: '80%', color: 'rgba(168,85,247,0.05)', duration: 22, delay: 1 },
    { size: 150, x: '70%', y: '40%', color: 'rgba(57,255,20,0.03)', duration: 16, delay: 3 },
    { size: 180, x: '90%', y: '70%', color: 'rgba(0,229,255,0.04)', duration: 19, delay: 5 },
];

// Deterministic particle data to avoid hydration mismatch
const particleData = [
    { w: 2, left: '5%', top: '12%', dur: 4, del: 0.5, color: 'rgba(0,229,255,0.4)' },
    { w: 3, left: '15%', top: '35%', dur: 5, del: 1.2, color: 'rgba(168,85,247,0.4)' },
    { w: 1.5, left: '25%', top: '58%', dur: 3.5, del: 2.0, color: 'rgba(0,229,255,0.4)' },
    { w: 2.5, left: '35%', top: '8%', dur: 6, del: 0.8, color: 'rgba(168,85,247,0.4)' },
    { w: 1, left: '45%', top: '72%', dur: 4.5, del: 3.0, color: 'rgba(0,229,255,0.4)' },
    { w: 3, left: '55%', top: '25%', dur: 5.5, del: 1.5, color: 'rgba(168,85,247,0.4)' },
    { w: 2, left: '65%', top: '90%', dur: 3.8, del: 0.3, color: 'rgba(0,229,255,0.4)' },
    { w: 1.5, left: '75%', top: '45%', dur: 6.5, del: 2.5, color: 'rgba(168,85,247,0.4)' },
    { w: 2.5, left: '85%', top: '15%', dur: 4.2, del: 4.0, color: 'rgba(0,229,255,0.4)' },
    { w: 1, left: '92%', top: '65%', dur: 5.8, del: 1.0, color: 'rgba(168,85,247,0.4)' },
    { w: 3, left: '8%', top: '82%', dur: 3.2, del: 3.5, color: 'rgba(0,229,255,0.4)' },
    { w: 2, left: '30%', top: '42%', dur: 4.8, del: 0.7, color: 'rgba(168,85,247,0.4)' },
    { w: 1.5, left: '50%', top: '5%', dur: 5.2, del: 2.3, color: 'rgba(0,229,255,0.4)' },
    { w: 2.5, left: '70%', top: '78%', dur: 3.6, del: 4.5, color: 'rgba(168,85,247,0.4)' },
    { w: 1, left: '88%', top: '30%', dur: 6.2, del: 1.8, color: 'rgba(0,229,255,0.4)' },
    { w: 3, left: '20%', top: '95%', dur: 4.4, del: 0.1, color: 'rgba(168,85,247,0.4)' },
    { w: 2, left: '40%', top: '18%', dur: 5.6, del: 3.2, color: 'rgba(0,229,255,0.4)' },
    { w: 1.5, left: '60%', top: '55%', dur: 3.9, del: 2.8, color: 'rgba(168,85,247,0.4)' },
    { w: 2.5, left: '78%', top: '88%', dur: 4.7, del: 1.4, color: 'rgba(0,229,255,0.4)' },
    { w: 1, left: '95%', top: '48%', dur: 5.3, del: 4.2, color: 'rgba(168,85,247,0.4)' },
];

export default function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        filter: 'blur(40px)',
                    }}
                    animate={{
                        x: [0, 30, -20, 15, 0],
                        y: [0, -25, 15, -10, 0],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: orb.delay,
                    }}
                />
            ))}

            {/* Floating particles */}
            {particleData.map((p, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                        width: p.w,
                        height: p.w,
                        left: p.left,
                        top: p.top,
                        background: p.color,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.dur,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: p.del,
                    }}
                />
            ))}
        </div>
    );
}
