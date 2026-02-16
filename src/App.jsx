import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Compass, User } from 'lucide-react';
import Header from './components/Header';
import Timetable from './components/Timetable';
import ModeToggle from './components/ModeToggle';
import EventFeed from './components/EventFeed';
import { clubs } from './data/clubs';
import ClubCard from './components/ClubCard';
import { rewards } from './data/rewards';
import RewardCard from './components/RewardCard';
import { leaderboardData } from './data/leaderboard';
import LeaderboardRow from './components/LeaderboardRow';
import LandingPage from './pages/LandingPage';

// Placeholder Pages (Inlined for simplicity and stability)
const Schedule = () => (
    <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">📅</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Full Schedule</h1>
        <p className="text-gray-400 text-sm">Syncing your academic calendar...</p>
    </div>
);

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-5 pt-8 pb-24">
            <h1 className="text-2xl font-bold text-white mb-2">Explore Campus</h1>
            <p className="text-gray-400 text-sm mb-6">Find your community.</p>

            {/* Search */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">🔍</span>
                </div>
                <input
                    type="text"
                    placeholder="Search clubs, societies..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-taylor-red transition-colors text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Content */}
            <div className="space-y-4">
                {filteredClubs.map(club => (
                    <ClubCard key={club.id} club={club} />
                ))}
            </div>

            {filteredClubs.length === 0 && (
                <div className="text-center py-10 text-gray-500 text-sm">
                    No clubs found matching "{searchTerm}"
                </div>
            )}
        </div>
    );
};

const Profile = ({ points, onRedeem }) => (
    <div className="p-6 pb-24">
        <h1 className="text-2xl font-bold text-white mb-6">Student Profile</h1>

        {/* Stats Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E31837] to-[#8a1525] flex items-center justify-center text-4xl font-serif font-bold text-white shadow-glow-red border border-white/10">
                T
            </div>
            <div>
                <h2 className="text-lg font-bold text-white">Hazem</h2>
                <p className="text-sm text-gray-400">Year 2 • IT</p>
                <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <span className="text-[10px] font-bold text-yellow-500">💎 {points} Points</span>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-1">
                <span className="text-gray-400 text-[10px] uppercase tracking-wider">Events</span>
                <span className="text-white font-bold text-xl">12</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-1">
                <span className="text-gray-400 text-[10px] uppercase tracking-wider">Focus Score</span>
                <span className="text-taylor-red font-bold text-xl">98%</span>
            </div>
        </div>

        {/* Rewards Shop */}
        <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                Rewards Shop <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">Spend your points</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
                {rewards.map(reward => (
                    <RewardCard
                        key={reward.id}
                        reward={reward}
                        userPoints={points}
                        onRedeem={onRedeem}
                    />
                ))}
            </div>
        </div>

        {/* Leaderboard */}
        <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                Campus Leaderboard <span className="text-xs font-normal text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">Top 5</span>
            </h2>
            <div className="space-y-3">
                {leaderboardData.map((student, index) => (
                    <LeaderboardRow
                        key={index}
                        index={index}
                        student={student.isUser ? { ...student, points: points } : student}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default function App() {
    const [mode, setMode] = useState('focus'); // 'focus' | 'balance'
    const [activeTab, setActiveTab] = useState('home'); // 'home' | 'schedule' | 'explore' | 'profile'
    const [showLanding, setShowLanding] = useState(true);
    const [points, setPoints] = useState(1240); // Gamification State

    const toggleMode = () => setMode((prev) => (prev === 'focus' ? 'balance' : 'focus'));

    const handleCheckIn = () => {
        setPoints(prev => prev + 50);
        alert("🎉 Checked in! +50 Nexus Points earned!");
    };

    const handleRedeem = (cost) => {
        if (points >= cost) {
            setPoints(prev => prev - cost);
            alert(`🎁 Redeemed! -${cost} points.`);
        } else {
            alert("❌ Not enough points!");
        }
    };

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'schedule', icon: Calendar, label: 'Schedule' },
        { id: 'explore', icon: Compass, label: 'Explore' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="min-h-screen bg-mesh flex justify-center items-start font-sans text-gray-900 bg-[#050508]">
            {/* Mobile Container - Centered Phone View */}
            <div className="w-full max-w-[430px] h-screen bg-[#050508] relative flex flex-col shadow-2xl overflow-hidden border-x border-white/5">
                <AnimatePresence mode="wait">
                    {showLanding ? (
                        <motion.div
                            key="landing"
                            className="h-full"
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LandingPage onGetStarted={() => setShowLanding(false)} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="app"
                            className="flex flex-col h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Decorative Top Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-taylor-red via-taylor-red-light to-taylor-red z-50 pointer-events-none" />

                            {/* Header - Always Visible */}
                            <div className="flex-none z-40 bg-[#050508]/80 backdrop-blur-md sticky top-0">
                                <Header points={points} />
                            </div>

                            {/* Main Content Area - Scrollable */}
                            <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar pb-24 relative">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'home' && (
                                        <motion.div
                                            key="home"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Timetable />
                                            <ModeToggle mode={mode} onToggle={toggleMode} />
                                            <EventFeed mode={mode} onCheckIn={handleCheckIn} />
                                        </motion.div>
                                    )}
                                    {activeTab === 'schedule' && (
                                        <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Schedule />
                                        </motion.div>
                                    )}
                                    {activeTab === 'explore' && (
                                        <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Explore />
                                        </motion.div>
                                    )}
                                    {activeTab === 'profile' && (
                                        <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Profile points={points} onRedeem={handleRedeem} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </main>

                            {/* Bottom Navigation - Fixed */}
                            <nav className="absolute bottom-0 left-0 right-0 bg-[#050508]/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-50">
                                {navItems.map((item) => {
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-taylor-red' : 'text-gray-500 hover:text-gray-300'
                                                }`}
                                        >
                                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                            <span className="text-[10px] font-medium font-inter tracking-wide">{item.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-pill"
                                                    className="absolute -bottom-1 w-1 h-1 bg-taylor-red rounded-full"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
