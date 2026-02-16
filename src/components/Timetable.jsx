import { motion } from 'framer-motion';
import { timetable } from '../data/events';

export default function Timetable() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-0 z-30 bg-nexus-dark/90 backdrop-blur-xl border-b border-white/5 px-5 py-3"
        >
            {/* Section Label */}
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-taylor-red"></div>
                    <p className="text-[11px] font-inter font-medium text-gray-400 uppercase tracking-widest">
                        Today's Schedule
                    </p>
                </div>
                <p className="text-[11px] font-inter text-gray-600">
                    Sun, 16 Feb
                </p>
            </div>

            {/* Scrollable Timeline */}
            <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
                {timetable.map((block, index) => (
                    <motion.div
                        key={block.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`flex-shrink-0 rounded-xl px-4 py-3 min-w-[170px] transition-all duration-300 ${block.type === 'free'
                            ? 'bg-gradient-to-br from-balance-accent/15 to-balance-accent/5 border border-balance-accent/25 shadow-glow-green'
                            : 'glass hover:bg-white/5'
                            }`}
                    >
                        <p className={`text-[10px] font-inter font-semibold uppercase tracking-wider mb-1 ${block.type === 'free' ? 'text-balance-accent' : 'text-gray-500'
                            }`}>
                            {block.time.split(' - ')[0]} – {block.time.split(' - ')[1]}
                        </p>
                        <p className={`text-sm font-outfit font-semibold leading-tight ${block.type === 'free' ? 'text-balance-accent' : 'text-white'
                            }`}>
                            {block.subject}
                        </p>
                        {block.room && (
                            <p className="text-[10px] font-inter text-gray-500 mt-1">{block.room}</p>
                        )}
                        {block.type === 'free' && (
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-balance-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-balance-accent"></span>
                                </span>
                                <p className="text-[10px] font-inter text-balance-accent/90">Searching...</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
