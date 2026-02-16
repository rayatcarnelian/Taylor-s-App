export default function Explore() {
    return (
        <div className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🔍</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Explore Campus</h1>
            <p className="text-gray-400 max-w-sm">
                Discover new clubs, events, and hidden gems around Taylor's Lakeside Campus.
            </p>
            <div className="mt-6 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search for clubs, events..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-taylor-red transition-colors"
                />
            </div>
        </div>
    );
}
