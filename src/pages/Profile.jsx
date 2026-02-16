export default function Profile() {
    return (
        <div className="p-6 md:p-10">
            <h1 className="text-2xl font-bold text-white mb-6">Student Profile</h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center md:flex-row md:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-taylor-red to-taylor-red-dark flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                    H
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-bold text-white">Hazem</h2>
                    <p className="text-gray-400 mb-4">Year 2 • Bachelor of Information Technology</p>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">Agents of Tech</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">Dean's List</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">Hackathon Winner</span>
                    </div>
                </div>

                <button className="px-4 py-2 border border-white/20 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                    Edit Profile
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">My Stats</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Events Attended</span>
                            <span className="text-white font-semibold">12</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Focus Hours</span>
                            <span className="text-white font-semibold">48h</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Settings</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Notifications</span>
                            <span className="text-green-400 font-semibold">On</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Dark Mode</span>
                            <span className="text-green-400 font-semibold">On</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
