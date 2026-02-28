'use client';

import { motion } from 'framer-motion';

export default function LoadingSkeleton({ className = '' }: { className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`bg-white/[0.06] rounded-xl ${className}`}
        />
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <LoadingSkeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <LoadingSkeleton key={i} className="h-28" />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LoadingSkeleton className="h-72" />
                <LoadingSkeleton className="h-72" />
            </div>
        </div>
    );
}
