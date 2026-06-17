import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Target, Zap, ArrowRight, Save } from 'lucide-react';
import { supabase } from './GoogleLogin';

export default function FocusMeterWidget({ currentMode }) {
    const [loading, setLoading] = useState(false);
    const [aiData, setAiData] = useState(null);

    const fetchAIMeter = async () => {
        setLoading(true);
        try {
            const prompt = `
                You are an AI assistant for university students. 
                The student is currently in "${currentMode}" mode (Focus or Balance).
                Their self-reported stress level is: 6/10.
                Recent activities: Studied for 4 hours, Attended Tech Talk.
                
                Based on this, return a JSON object ONLY with the following structure:
                {
                  "focusScore": (integer between 0 and 100),
                  "balanceScore": (integer between 0 and 100),
                  "recommendation": (A short 2-sentence piece of personalized advice)
                }
            `;

            const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    response_format: { type: "json_object" }
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error?.message || 'Failed to fetch from Groq');
            
            const result = JSON.parse(data.choices[0].message.content);
            setAiData(result);
            
            // Try saving to Supabase if logged in
            try {
                const { data: userData } = await supabase.auth.getUser();
                if (userData?.user) {
                    await supabase.from('ai_meter_history').insert([{
                        user_id: userData.user.id,
                        mode: currentMode,
                        focus_score: result.focusScore,
                        balance_score: result.balanceScore,
                        recommendation: result.recommendation
                    }]);
                }
            } catch (dbError) {
                console.warn('Failed to save history to DB:', dbError);
            }
            
        } catch (error) {
            console.error('Failed to fetch AI meter:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch new data whenever the mode changes
        fetchAIMeter();
    }, [currentMode]);

    return (
        <div className="glass rounded-2xl p-5 w-full mt-4 border border-white/10">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-bold font-outfit">
                    <Brain className="text-taylor-red" size={20} />
                    <span>AI Status Meter</span>
                </div>
                <button 
                    onClick={fetchAIMeter}
                    disabled={loading}
                    className="text-xs text-taylor-red hover:text-white transition-colors disabled:opacity-50"
                >
                    {loading ? 'Analyzing...' : 'Refresh'}
                </button>
            </div>

            {loading && !aiData ? (
                <div className="animate-pulse flex flex-col gap-3">
                    <div className="h-4 bg-white/10 rounded w-full"></div>
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                </div>
            ) : aiData ? (
                <div className="space-y-4">
                    {/* Focus Bar */}
                    <div>
                        <div className="flex justify-between text-xs font-inter mb-1">
                            <span className="text-gray-300 flex items-center gap-1"><Zap size={12}/> Focus</span>
                            <span className="text-taylor-red font-bold">{aiData.focusScore}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${aiData.focusScore}%` }}
                                transition={{ duration: 1 }}
                                className="bg-gradient-to-r from-orange-500 to-taylor-red h-full"
                            />
                        </div>
                    </div>

                    {/* Balance Bar */}
                    <div>
                        <div className="flex justify-between text-xs font-inter mb-1">
                            <span className="text-gray-300 flex items-center gap-1"><Activity size={12}/> Wellness</span>
                            <span className="text-teal-400 font-bold">{aiData.balanceScore}%</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${aiData.balanceScore}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full"
                            />
                        </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-gray-300 font-inter mt-4 leading-relaxed">
                        <span className="text-white font-semibold">AI Recommendation: </span>
                        {aiData.recommendation}
                    </div>
                </div>
            ) : (
                <div className="text-sm text-red-400">Failed to load AI data. Please check your API key.</div>
            )}
        </div>
    );
}
