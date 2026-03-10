import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Shield, ArrowRight, AlertCircle, Mail, BookOpen } from 'lucide-react';
import { login as dbLogin, createStudent } from '../data/db';

const LoginPage = ({ onLogin }) => {
    const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
    
    // Sign In State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Sign Up State
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regProgramme, setRegProgramme] = useState('');

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        const result = dbLogin(email, password);
        if (result) {
            onLogin(result.type);
        } else {
            setError('Invalid campus email or password.');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (!regEmail.endsWith('taylors.edu.my')) {
            setError('Please use a valid Taylor\'s University email.');
            return;
        }

        try {
            createStudent({
                name: regName,
                email: regEmail,
                password: regPassword,
                programme: regProgramme,
            });
            setSuccessMsg('Account created successfully! You can now log in.');
            setMode('signin'); // Switch back to login
            setEmail(regEmail);
            setPassword(regPassword);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleMockLogin = (role) => {
        onLogin(role);
    };

    return (
        <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans pb-24">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-taylor-red/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="z-10 max-w-md w-full flex flex-col items-center">
                
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 mb-6 bg-gradient-to-br from-taylor-red to-[#8a1525] rounded-3xl flex items-center justify-center shadow-glow-red"
                >
                    <span className="text-4xl font-serif font-bold text-white">T</span>
                </motion.div>

                {/* Tabs */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex bg-white/5 p-1 rounded-xl mb-6 w-full max-w-[240px]"
                >
                    <button 
                        onClick={() => { setMode('signin'); setError(''); setSuccessMsg(''); }}
                        className={`flex-1 py-1.5 text-xs font-inter font-bold rounded-lg transition-colors ${mode === 'signin' ? 'bg-taylor-red text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                        className={`flex-1 py-1.5 text-xs font-inter font-bold rounded-lg transition-colors ${mode === 'signup' ? 'bg-taylor-red text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Sign Up
                    </button>
                </motion.div>

                {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2 text-red-400 text-xs font-inter mb-4">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <span className="leading-tight">{error}</span>
                    </motion.div>
                )}

                {successMsg && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-start gap-2 text-green-400 text-xs font-inter mb-4">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" />
                        <span className="leading-tight">{successMsg}</span>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {mode === 'signin' ? (
                        <motion.form 
                            key="signin"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full space-y-4 mb-8"
                            onSubmit={handleSignIn}
                        >
                            <div className="space-y-1">
                                <label className="text-xs font-inter text-gray-400 ml-1">Campus Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input 
                                        type="email" 
                                        placeholder="name@sd.taylors.edu.my" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-taylor-red/50 text-white transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-inter text-gray-400 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-taylor-red/50 text-white transition-colors"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full py-3 mt-4 bg-taylor-red hover:bg-taylor-red-light text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-glow-red"
                            >
                                Sign In <ArrowRight size={16} />
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form 
                            key="signup"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full space-y-4 mb-8"
                            onSubmit={handleSignUp}
                        >
                            <div className="space-y-1">
                                <label className="text-[10px] font-inter uppercase tracking-wider text-gray-400 ml-1 block">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="e.g. John Doe" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-taylor-red/50 text-white"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-inter uppercase tracking-wider text-gray-400 ml-1 block">Campus Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input 
                                        type="email" 
                                        placeholder="john@sd.taylors.edu.my" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-taylor-red/50 text-white"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-inter uppercase tracking-wider text-gray-400 ml-1 block">Programme *</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Bachelor of Computer Science" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-taylor-red/50 text-white"
                                        value={regProgramme}
                                        onChange={(e) => setRegProgramme(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-inter uppercase tracking-wider text-gray-400 ml-1 block">Password *</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-taylor-red/50 text-white"
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        required minLength={6}
                                    />
                                </div>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full py-3 mt-4 bg-white hover:bg-gray-200 text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-glow"
                            >
                                Create Student Account
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Quick Access Demo Buttons - Kept for convenience during prototype presentation */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-[10px] uppercase tracking-wider font-inter text-gray-500">Quick Demo Access</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={() => handleMockLogin('admin')}
                            className="w-full py-3 glass hover:bg-white/10 rounded-xl flex items-center justify-between px-4 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                                    <Shield size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-outfit font-bold text-white group-hover:text-yellow-500 transition-colors">Admin (Event Manager)</p>
                                    <p className="text-[10px] font-inter text-gray-500">Faisal / Felzha</p>
                                </div>
                            </div>
                            <ArrowRight size={16} className="text-gray-600 group-hover:text-yellow-500 transition-colors" />
                        </button>

                        <button 
                            onClick={() => handleMockLogin('super_admin')}
                            className="w-full py-3 glass hover:bg-white/10 rounded-xl flex items-center justify-between px-4 transition-colors group border border-taylor-red/20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-taylor-red/20 text-taylor-red flex items-center justify-center">
                                    <Shield size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-outfit font-bold text-white group-hover:text-taylor-red transition-colors">Super Admin</p>
                                    <p className="text-[10px] font-inter text-gray-500">Danish</p>
                                </div>
                            </div>
                            <ArrowRight size={16} className="text-gray-600 group-hover:text-taylor-red transition-colors" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
