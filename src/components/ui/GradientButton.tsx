'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit';
    variant?: 'cyan' | 'purple' | 'green';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function GradientButton({
    children,
    onClick,
    type = 'button',
    variant = 'cyan',
    size = 'md',
    fullWidth = false,
    disabled = false,
    className = '',
}: GradientButtonProps) {
    const gradients: Record<string, string> = {
        cyan: 'from-cyan-500 to-blue-600',
        purple: 'from-purple-500 to-pink-600',
        green: 'from-green-400 to-emerald-600',
    };

    const sizes: Record<string, string> = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            className={`
        relative overflow-hidden rounded-xl font-semibold
        bg-gradient-to-r ${gradients[variant]}
        text-white shadow-lg
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200
        ${className}
      `}
        >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}
