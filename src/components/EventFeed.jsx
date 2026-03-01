import { motion, AnimatePresence } from 'framer-motion';
import { events } from '../data/events';
import {
    CodeBracketIcon,
    ShieldCheckIcon,
    BeakerIcon,
    HeartIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import { tgcDefinitions } from '../data/students';
import { getProximityLabel } from '../data/campus';
import { currentUser } from '../data/students';

const iconMap = {
    CodeBracketIcon: CodeBracketIcon,
    ShieldCheckIcon: ShieldCheckIcon,
    BeakerIcon: BeakerIcon,
    HeartIcon: HeartIcon,
    UserGroupIcon: UserGroupIcon,
};

export default function EventFeed({ mode, onCheckIn, onEventClick }) {
    const filteredEvents = events.filter((e) => e.category === mode);
    const isFocus = mode === 'focus';

    return (
        <div className="px-5 pb-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={{
                            backgroundColor: isFocus ? '#FF3B5C' : '#4EEAAF',
                        }}
                        className="w-1.5 h-1.5 rounded-full"
                    />
                    <p className="text-[11px] font-inter font-medium text-gray-400 uppercase tracking-widest">
                        {isFocus ? 'High-Intensity Matches' : 'Holistic Suggestions'}
                    </p>
                </div>
                <p className="text-[11px] font-inter text-gray-600">
                    {filteredEvents.length} events
                </p>
            </div>

            {/* Event Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="flex flex-col gap-3"
                >
                    {filteredEvents.map((event, index) => {
                        const IconComponent = iconMap[event.icon];
                        const proximity = event.zone ? getProximityLabel(currentUser.campusZone, event.zone) : null;

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onEventClick?.(event)}
                                className="group relative rounded-2xl glass overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/10"
                            >
                                {/* Accent Left Border */}
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                                    style={{ backgroundColor: event.accent }}
                                />

                                <div className="p-4 pl-5">
                                    {/* Top Metadata Row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[10px] font-inter font-bold bg-gray-700/50 text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                                                {event.match_score} Match
                                            </span>
                                            {event.friends_attending > 0 && (
                                                <span className="text-[10px] font-inter text-gray-400 flex items-center gap-1">
                                                    👥 {event.friends_attending} friends
                                                </span>
                                            )}
                                            {proximity && proximity.minutes !== null && (
                                                <span
                                                    className="text-[10px] font-inter flex items-center gap-1 px-1.5 py-0.5 rounded"
                                                    style={{ color: proximity.color, backgroundColor: proximity.color + '15' }}
                                                >
                                                    📍 {proximity.label}
                                                </span>
                                            )}
                                        </div>
                                        {IconComponent ? (
                                            <IconComponent className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <span className="text-xl">{event.emoji}</span>
                                        )}
                                    </div>

                                    {/* Title & Host */}
                                    <div className="mb-2">
                                        <h3 className="text-[15px] font-outfit font-semibold text-white leading-tight mb-0.5 group-hover:text-white/90 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-[11px] font-inter text-gray-500">
                                            by <span className="text-gray-300">{event.host}</span>
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-xs font-inter text-gray-400 leading-relaxed mb-3 line-clamp-2">
                                        {event.description}
                                    </p>

                                    {/* TGC Tags */}
                                    {event.tgcTags?.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {event.tgcTags.slice(0, 3).map((tag) => {
                                                const def = tgcDefinitions[tag];
                                                return (
                                                    <span
                                                        key={tag}
                                                        className="text-[9px] font-inter font-medium px-1.5 py-0.5 rounded"
                                                        style={{
                                                            backgroundColor: def?.color + '12',
                                                            color: def?.color,
                                                        }}
                                                    >
                                                        {def?.icon} {def?.label?.split(' ')[0]}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Bottom Meta Row */}
                                    <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1">
                                        {/* Social Proof Bubbles */}
                                        <div className="flex items-center -space-x-2">
                                            {(event.friendNames || []).slice(0, 3).map((name, i) => (
                                                <div key={i} className={`w-5 h-5 rounded-full border border-[#1a1a26] flex items-center justify-center text-[8px] font-bold text-white ${['bg-blue-500', 'bg-purple-500', 'bg-yellow-500'][i]
                                                    }`}>
                                                    {name[0]}
                                                </div>
                                            ))}
                                            {event.friends_attending > 0 && (
                                                <span className="text-[9px] text-gray-500 ml-3 font-medium">+{event.friends_attending} going</span>
                                            )}
                                        </div>

                                        <button
                                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-semibold text-white transition-colors flex items-center gap-1.5 border border-white/5 active:scale-95"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCheckIn();
                                            }}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                            Check-in
                                        </button>
                                    </div>
                                </div>

                                {/* Shimmer */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
