import { students as initialStudents } from './students';
import { adminUsers as initialAdmins } from './admin';

// Initialize the database if it doesn't exist
export const initializeDB = () => {
    if (!localStorage.getItem('taylors_students')) {
        localStorage.setItem('taylors_students', JSON.stringify(initialStudents));
    }
    if (!localStorage.getItem('taylors_admins')) {
        localStorage.setItem('taylors_admins', JSON.stringify(initialAdmins));
    }
};

// Students DB Operations
export const getStudents = () => {
    const data = localStorage.getItem('taylors_students');
    return data ? JSON.parse(data) : [];
};

export const createStudent = (studentData) => {
    const students = getStudents();
    
    // Check if email already exists
    if (students.find(s => s.email === studentData.email)) {
        throw new Error('An account with this email already exists.');
    }

    const newStudent = {
        id: `STU-${String(students.length + 1).padStart(3, '0')}`,
        year: 1, // default
        programme: 'New Student', // default
        faculty: 'Unknown', // default
        avatar: studentData.name.charAt(0).toUpperCase(),
        avatarGradient: 'from-blue-500 to-indigo-600', // default
        points: 0,
        eventsAttended: 0,
        focusScore: 50,
        balanceScore: 50,
        streak: 0,
        joinedClubs: [],
        interests: [],
        campusZone: 'Main Campus',
        tgcProgress: { knowledge: 0, problemSolving: 0, communication: 0, teamwork: 0, ethics: 0, leadership: 0, lifelong: 0, entrepreneurial: 0 },
        shineProgress: { service: 0, hospitality: 0, innovation: 0, networking: 0, excellence: 0 },
        privacySettings: { shareActivity: true, shareTimetable: false, allowTelemetry: true, showOnLeaderboard: false },
        ...studentData
    };

    students.push(newStudent);
    localStorage.setItem('taylors_students', JSON.stringify(students));
    return newStudent;
};

// Admins DB Operations
export const getAdmins = () => {
    const data = localStorage.getItem('taylors_admins');
    return data ? JSON.parse(data) : [];
};

export const createAdmin = (adminData, creatorRole) => {
    if (creatorRole !== 'Super Admin') {
        throw new Error('Only Super Admins can create new Admin accounts.');
    }

    const admins = getAdmins();

    // Check if email already exists
    if (admins.find(a => a.email === adminData.email)) {
        throw new Error('An admin account with this email already exists.');
    }

    const newAdmin = {
        id: `ADMIN-${String(admins.length + 1).padStart(3, '0')}`,
        avatar: adminData.name.charAt(0).toUpperCase(),
        lastLogin: new Date().toISOString(),
        ...adminData
    };

    admins.push(newAdmin);
    localStorage.setItem('taylors_admins', JSON.stringify(admins));
    return newAdmin;
};

// Auth operations
export const login = (email, password) => {
    const admins = getAdmins();
    const adminMatch = admins.find(a => a.email === email && a.password === password);
    
    if (adminMatch) {
        return { user: adminMatch, type: adminMatch.role === 'Super Admin' ? 'super_admin' : 'admin' };
    }

    const students = getStudents();
    const studentMatch = students.find(s => s.email === email && s.password === password);
    
    if (studentMatch) {
        return { user: studentMatch, type: 'student' };
    }

    return null; // Invalid credentials
};
