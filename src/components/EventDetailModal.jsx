import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, MapPin, Clock, Users, Calendar, Download, Star, ChevronRight } from 'lucide-react';
import { tgcDefinitions, shineDefinitions } from '../data/students';

// Generate .ics calendar file content
function generateICS(event) {
    const dtStart = event.date.replace(/-/g, '') + 'T' + event.time.split(' - ')[0].replace(/[: ]/g, '').replace('AM', '00').replace('PM', '00');
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Taylor's EventMind//EN
BEGIN:VEVENT
DTSTART:${dtStart}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}\\nHosted by ${event.host}
END:VEVENT
END:VCALENDAR`;
}

function downloadICS(event) {
    const content = generateICS(event);
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export default function EventDetailModal({ event, isOpen, onClose, onCheckIn, onRSVP }) {
    const [isRSVPd, setIsRSVPd] = useState(event?.isRSVPd || false);

    if (!event || !isOpen) return null;

    const matchBreakdown = event.match_breakdown || {};
    const capacityPercent = event.capacity ? Math.round((event.registered / event.capacity) * 100) : 0;
    const isFull = capacityPercent >= 100;

    const handleRSVP = () => {
        setIsRSVPd(!isRSVPd);
        onRSVP?.(event.id);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[101] max-w-[430px] mx-auto"
                    >
                        <div className="bg-[#0a0a12] rounded-t-3xl border-t border-x border-white/10 max-h-[85vh] overflow-y-auto hide-scrollbar">
                            {/* Drag Handle */}
                            <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-[#0a0a12] z-10">
                                <div className="w-10 h-1 rounded-full bg-white/20" />
                            </div>

                            {/* Header */}
                            <div className="px-5 pb-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        {/* Match Score Badge */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[11px] font-inter font-bold bg-green-500/10 text-green-400 px-2.5 py-1 rounded-lg border border-green-500/20">
                                                {event.match_score} Match
                                            </span>
                                            <span className="text-[11px] font-inter text-gray-500 px-2 py-1 rounded-lg bg-white/5">
                                                {event.tag}
                                            </span>
                                            {event.zone && (
                                                <span className="text-[11px] font-inter text-gray-500 px-2 py-1 rounded-lg bg-white/5 flex items-center gap-1">
                                                    <MapPin size={10} /> {event.zone}
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl font-outfit font-bold text-white leading-tight">
                                            {event.title}
                                        </h2>
                                        <p className="text-sm font-inter text-gray-400 mt-1">
                                            by <span className="text-gray-300">{event.host}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-xl glass hover:bg-white/10 transition-colors ml-3"
                                    >
                                        <X size={18} className="text-gray-400" />
                                    </button>
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="glass rounded-xl p-3 text-center">
                                        <Clock size={14} className="text-gray-400 mx-auto mb-1" />
                                        <p className="text-[10px] font-inter text-gray-500">Time</p>
                                        <p className="text-xs font-outfit font-semibold text-white">{event.time}</p>
                                    </div>
                                    <div className="glass rounded-xl p-3 text-center">
                                        <Calendar size={14} className="text-gray-400 mx-auto mb-1" />
                                        <p className="text-[10px] font-inter text-gray-500">Date</p>
                                        <p className="text-xs font-outfit font-semibold text-white">
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="glass rounded-xl p-3 text-center">
                                        <Users size={14} className="text-gray-400 mx-auto mb-1" />
                                        <p className="text-[10px] font-inter text-gray-500">Spots</p>
                                        <p className="text-xs font-outfit font-semibold text-white">
                                            {event.registered}/{event.capacity}
                                        </p>
                                    </div>
                                </div>

                                {/* Capacity Bar */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-inter text-gray-500">Capacity</span>
                                        <span className={`text-[10px] font-inter font-bold ${isFull ? 'text-red-400' : capacityPercent > 80 ? 'text-yellow-400' : 'text-green-400'}`}>
                                            {isFull ? 'FULL' : `${capacityPercent}% filled`}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full">
                                        <motion.div
                                            className={`h-full rounded-full ${isFull ? 'bg-red-500' : capacityPercent > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(capacityPercent, 100)}%` }}
                                            transition={{ duration: 0.8 }}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <h3 className="text-xs font-outfit font-semibold text-gray-300 mb-2">About</h3>
                                    <p className="text-sm font-inter text-gray-400 leading-relaxed">{event.description}</p>
                                </div>

                                {/* Match Score Breakdown */}
                                <div className="mb-4">
                                    <h3 className="text-xs font-outfit font-semibold text-gray-300 mb-2">Why this event matches you</h3>
                                    <div className="glass rounded-xl p-3 space-y-2">
                                        {[
                                            { label: 'Interest Fit', value: matchBreakdown.interest, icon: '🎯' },
                                            { label: 'Schedule Fit', value: matchBreakdown.schedule, icon: '📅' },
                                            { label: 'Proximity', value: matchBreakdown.proximity, icon: '📍' },
                                            { label: 'Social Signal', value: matchBreakdown.social, icon: '👥' },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center gap-3">
                                                <span className="text-sm">{item.icon}</span>
                                                <span className="text-[11px] font-inter text-gray-400 w-24">{item.label}</span>
                                                <div className="flex-1 h-1.5 bg-white/5 rounded-full">
                                                    <motion.div
                                                        className="h-full rounded-full bg-green-400"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.value || 0}%` }}
                                                        transition={{ duration: 0.6, delay: 0.2 }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-inter font-bold text-green-400 w-8 text-right">
                                                    {item.value || 0}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* TGC Tags */}
                                {event.tgcTags?.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-outfit font-semibold text-gray-300 mb-2">TGC Skills You Will Gain</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {event.tgcTags.map((tag) => {
                                                const def = tgcDefinitions[tag];
                                                return (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] font-inter font-medium px-2.5 py-1 rounded-lg border flex items-center gap-1"
                                                        style={{
                                                            backgroundColor: def?.color + '15',
                                                            borderColor: def?.color + '30',
                                                            color: def?.color,
                                                        }}
                                                    >
                                                        {def?.icon} {def?.label}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* SHINE Tags */}
                                {event.shineTags?.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-outfit font-semibold text-gray-300 mb-2">SHINE Progress</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {event.shineTags.map((tag) => {
                                                const def = shineDefinitions[tag];
                                                return (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] font-inter font-medium px-2.5 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center gap-1"
                                                    >
                                                        {def?.icon} {def?.label}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Friends Attending */}
                                {event.friendNames?.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-outfit font-semibold text-gray-300 mb-2">Friends Attending</h3>
                                        <div className="glass rounded-xl p-3 flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                {event.friendNames.slice(0, 3).map((name, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-8 h-8 rounded-full border-2 border-[#0a0a12] flex items-center justify-center text-[10px] font-bold text-white ${['bg-blue-500', 'bg-purple-500', 'bg-amber-500'][i % 3]
                                                            }`}
                                                    >
                                                        {name[0]}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-xs font-inter text-gray-400">
                                                <span className="text-white font-medium">{event.friendNames.join(', ')}</span> {event.friends_attending > 3 ? `and ${event.friends_attending - 3} more` : ''} are going
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Accessibility */}
                                {event.accessibility?.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-xs font-outfit font-semibold text-gray-300 mb-2">Accessibility</h3>
                                        <div className="flex gap-2">
                                            {event.accessibility.map((tag) => {
                                                const labels = {
                                                    wheelchair: { icon: '♿', label: 'Wheelchair Accessible' },
                                                    wifi: { icon: '📶', label: 'Free WiFi' },
                                                    'sign-language': { icon: '🤟', label: 'Sign Language' },
                                                };
                                                const info = labels[tag];
                                                return (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] font-inter text-gray-400 px-2 py-1 rounded-lg bg-white/5 flex items-center gap-1"
                                                    >
                                                        {info?.icon} {info?.label}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pb-6">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleRSVP}
                                        className={`flex-1 py-3.5 rounded-xl font-outfit font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${isRSVPd
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : isFull
                                                ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-taylor-red to-taylor-red-light text-white shadow-glow-red'
                                            }`}
                                        disabled={isFull && !isRSVPd}
                                    >
                                        {isRSVPd ? '✅ RSVP Confirmed' : isFull ? 'Event Full' : '🚀 RSVP Now'}
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => downloadICS(event)}
                                        className="px-4 py-3.5 rounded-xl glass hover:bg-white/10 transition-colors flex items-center gap-2"
                                    >
                                        <Download size={16} className="text-gray-300" />
                                        <span className="text-xs font-outfit font-semibold text-gray-300">.ics</span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
