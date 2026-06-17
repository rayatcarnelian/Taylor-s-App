import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Compass, User } from 'lucide-react';
import Header from './components/Header';
import Timetable from './components/Timetable';
import ModeToggle from './components/ModeToggle';
import EventFeed from './components/EventFeed';
import EventDetailModal from './components/EventDetailModal';
import NotificationCenter from './components/NotificationCenter';
import ShineRadarChart from './components/ShineRadarChart';
import SchedulePage from './components/SchedulePage';
import AdminDashboard from './components/AdminDashboard';
import { clubs } from './data/clubs';
import ClubCard from './components/ClubCard';
import { rewards } from './data/rewards';
import RewardCard from './components/RewardCard';
import { leaderboardData } from './data/leaderboard';
import LeaderboardRow from './components/LeaderboardRow';
import LandingPage from './pages/LandingPage';
import { initializeDB } from './data/db';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import { merchantDeals } from './data/campus';
import { currentUser } from './data/students';
import Chatbot from './components/Chatbot';
import { supabase } from './components/GoogleLogin';

// Explore Page - Clubs & Merchant Deals
const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('clubs'); // 'clubs' | 'deals'

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-5 pt-8 pb-24">
            <h1 className="text-2xl font-bold text-white mb-2">Explore Campus</h1>
            <p className="text-gray-400 text-sm mb-6">Find your community.</p>

            {/* Section Toggle */}
            <div className="flex gap-2 mb-5">
                <button
                    onClick={() => setActiveSection('clubs')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-outfit font-semibold transition-all duration-300 ${activeSection === 'clubs'
                        ? 'bg-taylor-red/20 text-taylor-red border border-taylor-red/30'
                        : 'glass text-gray-500 hover:text-gray-300'
                        }`}
                >
                    🏛️ Clubs & Societies
                </button>
                <button
                    onClick={() => setActiveSection('deals')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-outfit font-semibold transition-all duration-300 ${activeSection === 'deals'
                        ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                        : 'glass text-gray-500 hover:text-gray-300'
                        }`}
                >
                    🏷️ Deals & Discounts
                </button>
            </div>

            {activeSection === 'clubs' && (
                <>
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

                    {/* Clubs */}
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
                </>
            )}

            {activeSection === 'deals' && (
                <div className="space-y-3">
                    <div className="glass rounded-xl p-3 flex items-center gap-2 mb-4">
                        <span className="text-sm">📍</span>
                        <p className="text-[11px] font-inter text-gray-400">
                            Showing deals near <span className="text-white font-medium">{currentUser.campusZone}</span> • Powered by your free slots
                        </p>
                    </div>
                    {merchantDeals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="glass rounded-2xl overflow-hidden"
                        >
                            <div className={`h-1 bg-gradient-to-r ${deal.bgGradient}`} />
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${deal.bgGradient} flex items-center justify-center text-xl shadow-lg`}>
                                            {deal.logo}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-outfit font-bold text-white">{deal.title}</h3>
                                            <p className="text-[11px] font-inter text-gray-400">{deal.merchant}</p>
                                        </div>
                                    </div>
                                    {deal.isActive && (
                                        <span className="text-[9px] font-inter font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                                            ACTIVE
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs font-inter text-gray-500 mb-3">{deal.description}</p>
                                <div className="flex items-center gap-3 text-[10px] font-inter text-gray-600">
                                    <span>🕐 {deal.validTime}</span>
                                    <span>📍 {deal.zone}</span>
                                    <span>📅 {deal.validDays.join(', ')}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function App() {
    const [activeTab, setActiveTab] = useState('home'); // 'home' | 'schedule' | 'explore' | 'profile'
    const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing' | 'login' | 'app'
    const [userRole, setUserRole] = useState('student'); // 'student' | 'admin' | 'super_admin'
    const [mode, setMode] = useState('focus'); // 'focus' | 'balance'
    const [points, setPoints] = useState(1240);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventDetail, setShowEventDetail] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);

    useEffect(() => {
        initializeDB();

        // Check active session on load
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUserRole('student');
                setCurrentScreen('app');
                setActiveTab('home');
            }
        });

        // Listen for auth changes (e.g., returning from Google login)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setUserRole('student');
                setCurrentScreen('app');
                setActiveTab('home');
            } else {
                setCurrentScreen('landing');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const toggleMode = () => {
        setMode(prev => prev === 'focus' ? 'balance' : 'focus');
    };

    // Mode toggle removed from global scope; it's now scoped to Profile page only.

    const handleCheckIn = () => {
        window.open('https://docs.google.com/forms', '_blank');
        setPoints(prev => prev + 50);
        alert("🎉 Check-in page opened. Complete the form to finish your attendance.");
    };

    const handleRedeem = (cost) => {
        if (points >= cost) {
            setPoints(prev => prev - cost);
            alert(`🎁 Redeemed! -${cost} points.`);
        } else {
            alert("❌ Not enough points!");
        }
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowEventDetail(true);
    };

    const handleRSVP = (eventId) => {
        // In a real app, this would call the API
        console.log('RSVP toggled for:', eventId);
    };

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'schedule', icon: Calendar, label: 'Schedule' },
        { id: 'explore', icon: Compass, label: 'Explore' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="min-h-screen bg-mesh flex justify-center items-start font-sans text-gray-900 bg-[#050508]">
            {/* Mobile Container */}
            <div className="w-full max-w-[430px] h-screen bg-[#050508] relative flex flex-col shadow-2xl overflow-hidden border-x border-white/5">
                <AnimatePresence mode="wait">
                    {currentScreen === 'landing' && (
                        <motion.div
                            key="landing"
                            className="h-full"
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LandingPage onGetStarted={() => setCurrentScreen('login')} />
                        </motion.div>
                    )}
                    
                    {currentScreen === 'login' && (
                        <motion.div
                            key="login"
                            className="absolute inset-0 z-50 bg-[#050508]"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <LoginPage onLogin={(role) => {
                                setUserRole(role);
                                setCurrentScreen('app');
                                setActiveTab('home');
                            }} />
                        </motion.div>
                    )}

                    {currentScreen === 'app' && (
                        <motion.div
                            key="app"
                            className="flex flex-col h-full absolute inset-0 bg-[#050508]"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            {/* Decorative Top Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-taylor-red via-taylor-red-light to-taylor-red z-50 pointer-events-none" />

                            {/* Header */}
                            <div className="flex-none z-40 bg-[#050508]/80 backdrop-blur-md sticky top-0">
                                <Header
                                    points={points}
                                    onNotificationClick={() => setShowNotifications(true)}
                                    onOpenAdmin={() => setShowAdmin(true)}
                                    userRole={userRole}
                                />
                            </div>

                            {/* Main Content */}
                            <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar pb-24 relative">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'home' && (
                                        <motion.div
                                            key="home"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.2 }}
                                            className={`transition-all duration-500 ${
                                                mode === 'focus'
                                                    ? 'bg-[#071b2f]'
                                                    : 'bg-gradient-to-br from-[#0f2a27] via-[#050508] to-[#0d1f1a]'
                                            }`}
                                        >
                                            <div className="px-5 pt-6 pb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Current mode</p>
                                                    <h2 className="text-2xl font-bold text-white">{mode === 'focus' ? 'Focus Mode' : 'Balance Mode'}</h2>
                                                </div>
                                                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold ${mode === 'focus' ? 'bg-blue-500/15 text-blue-200 border border-blue-400/20' : 'bg-teal-400/10 text-teal-300 border border-teal-300/20'}`}>
                                                    <span className={`w-2 h-2 rounded-full ${mode === 'focus' ? 'bg-blue-400' : 'bg-teal-300'}`} />
                                                    {mode === 'focus' ? 'Deep focus' : 'Chill balance'}
                                                </div>
                                            </div>

                                            <Timetable />
                                            <ModeToggle mode={mode} onToggle={toggleMode} />
                                            <EventFeed mode={mode} onCheckIn={handleCheckIn} onEventClick={handleEventClick} />
                                        </motion.div>
                                    )}
                                    {activeTab === 'schedule' && (
                                        <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <SchedulePage />
                                        </motion.div>
                                    )}
                                    {activeTab === 'explore' && (
                                        <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Explore />
                                        </motion.div>
                                    )}
                                    {activeTab === 'profile' && (
                                        <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Profile points={points} onRedeem={handleRedeem} onOpenAdmin={() => setShowAdmin(true)} mode={mode} />
                                        </motion.div>
                                    )}
                                    {/* 'privacy' tab removed — PrivacyDashboard merged into Profile page */}
                                </AnimatePresence>
                            </main>

                            {/* Bottom Navigation */}
                            <nav className="absolute bottom-0 left-0 right-0 bg-[#050508]/90 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex justify-between items-center z-50">
                                {navItems.map((item) => {
                                    const isActive = activeTab === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`flex flex-col items-center gap-1 transition-colors duration-200 ${isActive ? 'text-taylor-red' : 'text-gray-500 hover:text-gray-300'
                                                }`}
                                        >
                                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                            <span className="text-[9px] font-medium font-inter tracking-wide">{item.label}</span>
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

                {/* Event Detail Modal */}
                <EventDetailModal
                    event={selectedEvent}
                    isOpen={showEventDetail}
                    onClose={() => setShowEventDetail(false)}
                    onCheckIn={handleCheckIn}
                    onRSVP={handleRSVP}
                />

                {/* Notification Center */}
                <NotificationCenter
                    isOpen={showNotifications}
                    onClose={() => setShowNotifications(false)}
                />
            </div>

            {/* Admin Dashboard Full-Screen Overlay */}
            <AnimatePresence>
                {showAdmin && (
                    <motion.div
                        key="admin-overlay"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[200] bg-[#050508] overflow-y-auto"
                    >
                        <AdminDashboard onBack={() => setShowAdmin(false)} userRole={userRole} />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* AI Chatbot */}
            <Chatbot />
        </div>
    );
}
