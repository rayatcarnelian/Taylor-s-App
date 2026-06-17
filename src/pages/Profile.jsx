import { useRef } from 'react';
import { LogOut } from 'lucide-react';
import PrivacyDashboard from '../components/PrivacyDashboard';
import FocusMeterWidget from '../components/FocusMeterWidget';

export default function Profile({ points, onRedeem, onOpenAdmin, mode, onLogout }) {
    const dataRef = useRef(null);

    return (
        <div className="p-6 pb-24">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Student Profile</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => dataRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-4 py-2 bg-taylor-red hover:bg-taylor-red-light text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        My Data
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-medium rounded-lg transition-all duration-200 border border-red-500/20"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-taylor-red to-[#8a1525] flex items-center justify-center text-3xl font-bold text-white">
                        H
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">Rayat</h2>
                        <p className="text-sm text-gray-400 mb-2">Year 2 • Information Technology</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">Agents of Tech</span>
                            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">Dean's List</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Events Attended</p>
                    <p className="text-2xl font-bold text-white">12</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Points</p>
                    <p className="text-2xl font-bold text-taylor-red">💎 {points}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Focus Hours</p>
                    <p className="text-2xl font-bold text-white">48h</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Clubs</p>
                    <p className="text-2xl font-bold text-purple-400">4</p>
                </div>
            </div>

            {/* Focus vs Balance AI Summary */}
            <FocusMeterWidget currentMode={mode || 'focus'} />

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                    <span className="text-xs text-gray-400">Updated just now</span>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-2xl bg-blue-500/10 text-blue-200 flex items-center justify-center">✓</span>
                        <div>
                            <p className="text-white font-medium">Checked in to AI Workshop</p>
                            <p className="text-xs text-gray-500">Today • 2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-2xl bg-teal-400/10 text-teal-200 flex items-center justify-center">⚡</span>
                        <div>
                            <p className="text-white font-medium">Switched to Balance mode</p>
                            <p className="text-xs text-gray-500">Yesterday • 9:00 AM</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-2xl bg-purple-500/10 text-purple-200 flex items-center justify-center">⭐</span>
                        <div>
                            <p className="text-white font-medium">Unlocked 12th event badge</p>
                            <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Data Section */}
            <div
                ref={dataRef}
                className="rounded-2xl p-6 bg-[#0a0506]"
            >
                <PrivacyDashboard />
            </div>
        </div>
    );
}
