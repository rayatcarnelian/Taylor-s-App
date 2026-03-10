import { motion } from 'framer-motion';
import { getUnreadCount } from '../data/notifications';
import { Shield } from 'lucide-react';

export default function Header({ points, onNotificationClick, onOpenAdmin, userRole }) {
    const unreadCount = getUnreadCount();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-between px-5 pt-6 pb-4"
        >
            {/* Profile Section */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E31837] to-[#8a1525] flex items-center justify-center text-white font-serif font-bold text-2xl shadow-glow-red border border-white/10">
                        T
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-inter tracking-wide uppercase">Taylor's University</p>
                    <div className="flex items-center gap-2">
                        <h1 className="text-base font-outfit font-semibold text-white leading-tight">
                            Rayat
                        </h1>
                        <div className="px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center gap-1">
                            <span className="text-[10px] font-bold text-yellow-500">💎 {points}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Icons mapping */}
            <div className="flex items-center gap-2">
                {/* Admin Access Button (Hidden for Students) */}
                {userRole !== 'student' && (
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onOpenAdmin}
                        className="relative p-2.5 rounded-xl glass hover:bg-white/5 transition-colors bg-purple-500/10 border border-purple-500/20"
                    >
                        <Shield size={20} className="text-purple-400" />
                    </motion.button>
                )}

                {/* Notification Bell */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onNotificationClick}
                    className="relative p-2.5 rounded-xl glass hover:bg-white/5 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {/* Unread badge */}
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-taylor-red rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-[#050508]">
                            {unreadCount}
                        </span>
                    )}
                </motion.button>
            </div>
        </motion.header>
    );
}
