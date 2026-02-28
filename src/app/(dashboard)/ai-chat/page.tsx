'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { generateAIResponse } from '@/lib/ai-coach';

interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const SUGGESTION_CHIPS = [
    '💪 Workout plan',
    '🥗 Indian diet plan',
    '🔥 How to lose weight',
    '🥩 Protein sources',
    '🎯 Six pack abs',
    '💊 Supplements',
    '📏 Check my BMI',
    '🔥 Motivate me',
    '😴 Sleep tips',
    '💧 Water intake',
];

export default function AIChatPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            role: 'assistant',
            content: `Hey ${user?.name?.split(' ')[0] || 'champ'}! 🤖💪 I'm your **AI Fitness Coach**. Ask me anything about diet, workouts, supplements, or fitness goals. I give personalized advice based on your profile!\n\nTry tapping one of the suggestions below to get started.`,
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const userMsg: Message = {
            id: Date.now(),
            role: 'user',
            content: trimmed,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking delay for realism
        const thinkTime = 600 + Math.random() * 800;
        await new Promise(resolve => setTimeout(resolve, thinkTime));

        const response = generateAIResponse(trimmed, user, messages.map(m => ({ role: m.role, content: m.content })));

        const aiMsg: Message = {
            id: Date.now() + 1,
            role: 'assistant',
            content: response,
            timestamp: new Date(),
        };

        setIsTyping(false);
        setMessages(prev => [...prev, aiMsg]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleChip = (chip: string) => {
        // Remove emoji prefix for cleaner query
        const cleaned = chip.replace(/^[^\w]+/, '').trim();
        sendMessage(cleaned);
    };

    // Simple markdown renderer for bold and line breaks
    const renderContent = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, i) => {
            // Bold markers
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            const rendered = parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                }
                // Italic markers
                const italicParts = part.split(/(\*[^*]+\*)/g);
                return italicParts.map((ip, k) => {
                    if (ip.startsWith('*') && ip.endsWith('*') && !ip.startsWith('**')) {
                        return <em key={`${j}-${k}`} className="text-gray-300 italic">{ip.slice(1, -1)}</em>;
                    }
                    return <span key={`${j}-${k}`}>{ip}</span>;
                });
            });

            if (line.trim() === '') return <br key={i} />;
            if (line.startsWith('> ')) {
                return (
                    <div key={i} className="border-l-2 border-cyan-500/40 pl-3 my-1 text-gray-300 italic">
                        {rendered}
                    </div>
                );
            }
            if (line.startsWith('• ') || line.startsWith('- ')) {
                return <p key={i} className="ml-2 my-0.5">{rendered}</p>;
            }
            return <p key={i} className="my-0.5">{rendered}</p>;
        });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] p-4 md:p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                    🤖 AI Fitness Coach
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Your personal fitness advisor — powered by AI, personalized for you
                </p>
            </motion.div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-thin">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] md:max-w-[70%] ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20'
                                    : 'bg-white/[0.04] border border-white/[0.08]'
                                } rounded-2xl px-5 py-4`}>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs">
                                            🤖
                                        </div>
                                        <span className="text-xs text-cyan-400 font-medium">PhysiqueAI Coach</span>
                                    </div>
                                )}
                                <div className="text-sm text-gray-300 leading-relaxed">
                                    {renderContent(msg.content)}
                                </div>
                                <p className="text-[10px] text-gray-600 mt-2 text-right">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xs">
                                    🤖
                                </div>
                                <span className="text-xs text-cyan-400 font-medium">PhysiqueAI Coach</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 rounded-full bg-cyan-400" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-cyan-400" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-cyan-400" />
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {messages.length <= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2 mb-4"
                >
                    {SUGGESTION_CHIPS.map((chip) => (
                        <button
                            key={chip}
                            onClick={() => handleChip(chip)}
                            className="px-3 py-1.5 text-xs rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all cursor-pointer"
                        >
                            {chip}
                        </button>
                    ))}
                </motion.div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="flex-shrink-0">
                <GlassCard hover={false} className="p-3">
                    <div className="flex items-center gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about fitness..."
                            disabled={isTyping}
                            className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-30 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </GlassCard>
            </form>
        </div>
    );
}
