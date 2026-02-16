import { useState } from 'react';
import Timetable from '../components/Timetable';
import EventFeed from '../components/EventFeed';
import ModeToggle from '../components/ModeToggle';

export default function Home() {
    const [mode, setMode] = useState('focus');

    const toggleMode = () => {
        setMode((prev) => (prev === 'focus' ? 'balance' : 'focus'));
    };

    return (
        <div className="max-w-4xl mx-auto md:p-8">
            {/* Desktop Header for Home */}
            <div className="hidden md:flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Refocus Your Day</h2>
                    <p className="text-gray-400">Manage your energy with Focus and Balance modes.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Could put extra actions here */}
                </div>
            </div>

            <div className="md:grid md:grid-cols-[1fr_350px] md:gap-8 items-start">
                <div className="space-y-6">
                    <Timetable />
                    <div className="md:hidden">
                        <ModeToggle mode={mode} onToggle={toggleMode} />
                    </div>
                    <div className="hidden md:block">
                        {/* Desktop Toggle (Optional: Can keep it in sidebar or here) */}
                        <ModeToggle mode={mode} onToggle={toggleMode} />
                    </div>
                </div>

                <div className="mt-6 md:mt-0">
                    <EventFeed mode={mode} />
                </div>
            </div>
        </div>
    );
}
