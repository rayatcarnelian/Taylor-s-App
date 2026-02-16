import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Calendar, Users, Trophy } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-taylor-red/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="z-10 max-w-md w-full flex flex-col items-center text-center space-y-8">
                {/* Logo / Icon */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-24 h-24 bg-gradient-to-br from-taylor-red to-[#8a1525] rounded-3xl flex items-center justify-center shadow-glow-red"
                >
                    <span className="text-5xl font-serif font-bold text-white">T</span>
                </motion.div>

                {/* Hero Text */}
                <div className="space-y-4">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold tracking-tight"
                    >
                        Experience Taylor's<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-taylor-red to-orange-500">
                            Like Never Before
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-lg"
                    >
                        Your all-in-one companion for campus life. Events, clubs, and rewards await.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-4 w-full"
                >
                    <FeatureCard icon={Calendar} title="Events" desc="Never miss out" delay={0.5} />
                    <FeatureCard icon={Users} title="Clubs" desc="Find your tribe" delay={0.6} />
                    <FeatureCard icon={Trophy} title="Rewards" desc="Earn while you learn" delay={0.7} />
                    <FeatureCard icon={Star} title="Exclusive" desc="Student perks" delay={0.8} />
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    onClick={onGetStarted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-full py-4 bg-white text-black rounded-xl font-bold text-lg flex items-center justify-center gap-2 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay }}
        className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
    >
        <Icon className="text-taylor-red" size={24} />
        <div className="text-center">
            <h3 className="font-bold text-white text-sm">{title}</h3>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    </motion.div>
);

export default LandingPage;
