export const timetable = [
    {
        id: 1,
        time: "8:00 AM - 10:00 AM",
        subject: "Data Structures",
        type: "class",
        room: "Block E, R302",
    },
    {
        id: 2,
        time: "10:00 AM - 12:00 PM",
        subject: "Advanced Database",
        type: "class",
        room: "Block D, Lab 5",
    },
    {
        id: 3,
        time: "12:00 PM - 2:00 PM",
        subject: "Software Engineering",
        type: "class",
        room: "Block C, R108",
    },
    {
        id: 4,
        time: "2:00 PM - 4:00 PM",
        subject: "Free Slot Detected",
        type: "free",
        room: null,
    },
    {
        id: 5,
        time: "4:00 PM - 5:00 PM",
        subject: "Tutorial: OS",
        type: "class",
        room: "Block A, R201",
    },
];

export const events = [
    {
        id: "EVT-001",
        title: "Imagine Hack: 24-Hour Code Marathon",
        host: "Taylor's Agents of Tech",
        time: "2:00 PM - 4:00 PM",
        location: "Block D, Computer Lab 3",
        category: "focus", // Mapped from 'mode'
        match_score: "98%",
        friends_attending: 4,
        description: "Collaborate, design, and code your own tech solutions in our annual hackathon.",
        icon: "CodeBracketIcon",
        accent: "#FF3B5C", // Kept for consistency
        tag: "Technology", // Mapped from 'category'
        emoji: "💻" // Fallback
    },
    {
        id: "EVT-002",
        title: "Cybersecurity Industry Panel",
        host: "Taylor's IT Society",
        time: "3:00 PM - 5:00 PM",
        location: "Lecture Theatre 12",
        category: "focus",
        match_score: "92%",
        friends_attending: 2,
        description: "Insights and advice from leading industrial players in the cybersecurity sector.",
        icon: "ShieldCheckIcon",
        accent: "#FF6B4A",
        tag: "Career",
        emoji: "🛡️"
    },
    {
        id: "EVT-003",
        title: "Latte Art Masterclass",
        host: "Taylor's Barista Club",
        time: "2:00 PM - 3:30 PM",
        location: "Syopz Mall, Student Lounge",
        category: "balance",
        match_score: "85%",
        friends_attending: 0,
        description: "Step away from the screen and learn the fundamentals of espresso pulling and milk texturing.",
        icon: "BeakerIcon",
        accent: "#C8102E",
        tag: "Creative",
        emoji: "☕"
    },
    {
        id: "EVT-004",
        title: "Sunset Yoga & Mindfulness",
        host: "Taylor's Psychology Society",
        time: "2:00 PM - 3:00 PM",
        location: "Lakeside Deck",
        category: "balance",
        match_score: "88%",
        friends_attending: 1,
        description: "A guided session to de-stress, stretch, and reset your mind between intense lecture blocks.",
        icon: "HeartIcon",
        accent: "#FF2D55",
        tag: "Wellness",
        emoji: "🧘"
    },
    {
        id: "EVT-005",
        title: "BizPod Startup Networking Tea",
        host: "BizPod Incubator",
        time: "4:00 PM - 5:30 PM",
        location: "BizPod Co-Working Space",
        category: "balance",
        match_score: "90%",
        friends_attending: 3,
        description: "Mix and mingle with student founders and expand your network outside of your faculty.",
        icon: "UserGroupIcon",
        accent: "#4EEAAF",
        tag: "Social",
        emoji: "🤝"
    }
];
