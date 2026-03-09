import { motion } from 'framer-motion';
import { useState } from 'react';
import { weeklyTimetable, events } from '../data/events';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function SchedulePage() {
    const [selectedDay, setSelectedDay] = useState(() => {
        const today = new Date().getDay();
        // 0=Sun, 1=Mon...5=Fri, 6=Sat → map to our day index
        return today >= 1 && today <= 5 ? today - 1 : 0;
    });

    const dayName = days[selectedDay];
    const slots = weeklyTimetable[dayName] || [];

    // Find events on this day that fit free slots
    const freeSlots = slots.filter(s => s.type === 'free');
    const matchingEvents = events.filter(evt => {
        // Demo: show events that match any free slot time roughly
        return freeSlots.length > 0;
    }).slice(0, 3); // Limit to top 3

    return (
        <div className="px-5 pt-6 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-outfit font-bold text-white">Schedule</h1>
                    <p className="text-sm font-inter text-gray-500">Week of March 2, 2026</p>
                </div>
                <div className="flex items-center gap-1">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-balance-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-balance-accent"></span>
                    </span>
                    <span className="text-[10px] font-inter text-balance-accent font-medium">CAMS Synced</span>
                </div>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 mb-6">
                {days.map((day, index) => {
                    const dayShort = day.slice(0, 3);
                    const dayDate = 2 + index; // March 2-6
                    const isActive = selectedDay === index;
                    const hasFreeSlot = (weeklyTimetable[day] || []).some(s => s.type === 'free');

                    return (
                        <motion.button
                            key={day}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDay(index)}
                            className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 relative ${isActive
                                    ? 'bg-gradient-to-b from-taylor-red to-taylor-red-dark text-white shadow-glow-red'
                                    : 'glass text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            <span className="text-[10px] font-inter font-medium uppercase">{dayShort}</span>
                            <span className={`text-sm font-outfit font-bold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                {dayDate}
                            </span>
                            {hasFreeSlot && !isActive && (
                                <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-balance-accent" />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-white/5" />

                <div className="space-y-3">
                    {slots.map((slot, index) => {
                        const isFree = slot.type === 'free';
                        const startTime = slot.time.split(' - ')[0];
                        const endTime = slot.time.split(' - ')[1];

                        return (
                            <motion.div
                                key={slot.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="flex items-start gap-4"
                            >
                                {/* Time dot */}
                                <div className="flex flex-col items-center flex-shrink-0 w-[44px]">
                                    <div className={`w-3 h-3 rounded-full border-2 z-10 ${isFree
                                            ? 'bg-balance-accent border-balance-accent shadow-glow-green'
                                            : 'bg-[#0a0a12] border-white/20'
                                        }`} />
                                    <span className="text-[9px] font-inter text-gray-600 mt-1">{startTime}</span>
                                </div>

                                {/* Slot card */}
                                <div className={`flex-1 rounded-xl p-4 transition-all duration-300 ${isFree
                                        ? 'bg-gradient-to-r from-balance-accent/10 to-balance-accent/5 border border-balance-accent/20'
                                        : 'glass'
                                    }`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`text-sm font-outfit font-semibold ${isFree ? 'text-balance-accent' : 'text-white'
                                            }`}>
                                            {slot.subject}
                                        </h3>
                                        <span className="text-[10px] font-inter text-gray-500">
                                            {startTime} – {endTime}
                                        </span>
                                    </div>

                                    {slot.room && (
                                        <p className="text-[11px] font-inter text-gray-500 flex items-center gap-1">
                                            📍 {slot.room}
                                        </p>
                                    )}

                                    {slot.zone && (
                                        <span className="inline-block text-[9px] font-inter text-gray-600 mt-1 px-2 py-0.5 rounded bg-white/5">
                                            Zone: {slot.zone}
                                        </span>
                                    )}

                                    {isFree && (
                                        <div className="mt-3 pt-3 border-t border-balance-accent/10">
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-balance-accent opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-balance-accent"></span>
                                                </span>
                                                <span className="text-[10px] font-inter text-balance-accent/80 font-medium">
                                                    AI found {matchingEvents.length} events for this slot
                                                </span>
                                            </div>
                                            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                                                {matchingEvents.slice(0, 2).map((evt) => (
                                                    <div
                                                        key={evt.id}
                                                        className="flex-shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/5 min-w-[160px]"
                                                    >
                                                        <p className="text-[10px] font-inter font-bold text-green-400 mb-0.5">
                                                            {evt.match_score || '—'} Match
                                                        </p>
                                                        <p className="text-[11px] font-outfit font-semibold text-white truncate">
                                                            {evt.title}
                                                        </p>
                                                        <p className="text-[9px] font-inter text-gray-500">{evt.time || 'TBD'}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Free slots summary */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 glass rounded-2xl p-4"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-outfit font-semibold text-white">
                            {freeSlots.length} Free Slot{freeSlots.length !== 1 ? 's' : ''} Today
                        </h3>
                        <p className="text-[11px] font-inter text-gray-500">
                            {freeSlots.length > 0
                                ? `${matchingEvents.length} matched events available`
                                : 'No free time detected — all slots booked'}
                        </p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-lg text-[10px] font-inter font-bold ${freeSlots.length > 0
                            ? 'bg-balance-accent/10 text-balance-accent border border-balance-accent/20'
                            : 'bg-white/5 text-gray-500'
                        }`}>
                        {freeSlots.length > 0 ? '🟢 Available' : '🔴 Full Day'}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
