"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const SESSION_KEY = "studyguide_session";
const USERS_KEY = "studyguide_user";

const DEFAULT_SUBJECTS = {
  math: { name: "Matemáticas", level: 1, progress: 0, exp: 0, completedLessons: [], currentLesson: 1 },
  english: { name: "Inglés", level: 1, progress: 0, exp: 0, completedLessons: [], currentLesson: 1 },
  biology: { name: "Biología", level: 1, progress: 0, exp: 0, completedLessons: [], currentLesson: 1 },
  social: { name: "Ciencias Sociales", level: 1, progress: 0, exp: 0, completedLessons: [], currentLesson: 1 },
};

const getDefaultUserData = (email, name) => ({
  email,
  name,
  password: "",
  level: 1,
  exp: 0,
  expToNext: 1000,
  coins: 0,
  streak: 0,
  joinDate: new Date().toLocaleDateString("es-ES", { month: "long", year: "numeric" }),
  avatar: null,
  subjects: { ...DEFAULT_SUBJECTS },
  completedDiagnostics: [],
  achievements: [],
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSession = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
      if (session?.email) {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
        const userData = users[session.email];
        if (userData) {
          const subjects = userData.subjects || { ...DEFAULT_SUBJECTS };
          setUser({
            name: userData.name,
            email: userData.email,
            level: userData.level || 1,
            exp: userData.exp || 0,
            expToNext: userData.expToNext || 1000,
            coins: userData.coins || 0,
            streak: userData.streak || 0,
            joinDate: userData.joinDate,
            avatar: userData.avatar,
            subjects,
            completedDiagnostics: userData.completedDiagnostics || [],
            achievements: userData.achievements || [],
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Error loading session:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
    
    const handleStorageChange = () => loadSession();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadSession]);

  const login = useCallback((email, password) => {
    if (typeof window === "undefined") return false;
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    const userData = users[email];
    if (!userData || userData.password !== password) {
      return false;
    }
    const sessionData = { email, name: userData.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    const subjects = userData.subjects || { ...DEFAULT_SUBJECTS };
    setUser({
      name: userData.name,
      email: userData.email,
      level: userData.level || 1,
      exp: userData.exp || 0,
      expToNext: userData.expToNext || 1000,
      coins: userData.coins || 0,
      streak: userData.streak || 0,
      joinDate: userData.joinDate,
      avatar: userData.avatar,
      subjects,
      completedDiagnostics: userData.completedDiagnostics || [],
      achievements: userData.achievements || [],
    });
    return true;
  }, []);

  const register = useCallback((userData) => {
    if (typeof window === "undefined") return false;
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    if (users[userData.email]) {
      return false;
    }
    const newUser = getDefaultUserData(userData.email, userData.name);
    newUser.password = userData.password;
    users[userData.email] = newUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const sessionData = { email: userData.email, name: userData.name };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    
    setUser({
      name: userData.name,
      email: userData.email,
      level: 1,
      exp: 0,
      expToNext: 1000,
      coins: 0,
      streak: 0,
      joinDate: newUser.joinDate,
      avatar: null,
      subjects: { ...DEFAULT_SUBJECTS },
      completedDiagnostics: [],
      achievements: [],
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const updateSubjectProgress = useCallback((subjectId, updates) => {
    if (!user || !user.subjects?.[subjectId]) return;
    
    const updatedSubject = { ...user.subjects[subjectId], ...updates };
    const updatedSubjects = { ...user.subjects, [subjectId]: updatedSubject };
    
    setUser(prev => {
      if (!prev) return prev;
      return { ...prev, subjects: updatedSubjects };
    });
    
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
      if (users[user.email]) {
        users[user.email].subjects = updatedSubjects;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
  }, [user]);

  const completeLesson = useCallback((subjectId, lessonId, expReward = 50, coinReward = 10) => {
    if (!user || !user.subjects?.[subjectId]) return;
    
    const subject = user.subjects[subjectId];
    const alreadyCompleted = subject.completedLessons?.includes(lessonId);
    if (alreadyCompleted) return;
    
    const newCompletedLessons = [...(subject.completedLessons || []), lessonId];
    const lessonsPerLevel = 10;
    const newProgress = Math.min(100, Math.round((newCompletedLessons.length / lessonsPerLevel) * 100));
    const newLevel = Math.min(5, Math.floor(newCompletedLessons.length / lessonsPerLevel) + 1);
    const newExp = user.exp + expReward;
    const newCoins = user.coins + coinReward;
    const newTotalExp = user.exp + expReward;
    
    const expToNext = user.level * 1000;
    let newUserLevel = user.level;
    let newExpToNext = expToNext;
    let leftoverExp = newTotalExp;
    
    while (leftoverExp >= newExpToNext && newUserLevel < 50) {
      leftoverExp -= newExpToNext;
      newUserLevel++;
      newExpToNext = newUserLevel * 1000;
    }
    
    const updatedSubject = {
      ...subject,
      completedLessons: newCompletedLessons,
      progress: newProgress,
      level: newLevel,
      exp: subject.exp + expReward,
      currentLesson: Math.min(lessonsPerLevel, newCompletedLessons.length + 1),
    };
    
    const updatedSubjects = { ...user.subjects, [subjectId]: updatedSubject };
    
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        subjects: updatedSubjects,
        exp: newTotalExp,
        coins: newCoins,
        level: newUserLevel,
        expToNext: newExpToNext - leftoverExp,
      };
    });
    
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
      if (users[user.email]) {
        users[user.email].subjects = updatedSubjects;
        users[user.email].exp = newTotalExp;
        users[user.email].coins = newCoins;
        users[user.email].level = newUserLevel;
        users[user.email].expToNext = newExpToNext - leftoverExp;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
    
    return { expReward, coinReward, newLevel: newUserLevel, leveledUp: newUserLevel > user.level };
  }, [user]);

  const completeDiagnostic = useCallback((subjectId, score, expReward = 200, coinReward = 50) => {
    if (!user) return;
    
    const alreadyCompleted = user.completedDiagnostics?.includes(subjectId);
    if (alreadyCompleted) return { alreadyDone: true };
    
    const newCompletedDiagnostics = [...(user.completedDiagnostics || []), subjectId];
    const newExp = user.exp + expReward;
    const newCoins = user.coins + coinReward;
    
    let newUserLevel = user.level;
    let newExpToNext = user.expToNext;
    let leftoverExp = newExp;
    
    while (leftoverExp >= newExpToNext && newUserLevel < 50) {
      leftoverExp -= newExpToNext;
      newUserLevel++;
      newExpToNext = newUserLevel * 1000;
    }
    
    const subject = user.subjects?.[subjectId];
    if (subject && score >= 70) {
      const newSubjectLevel = Math.min(5, subject.level + 1);
      const updatedSubject = {
        ...subject,
        level: newSubjectLevel,
        progress: 0,
        exp: subject.exp + expReward,
        currentLesson: 1,
        completedLessons: [],
      };
      const updatedSubjects = { ...user.subjects, [subjectId]: updatedSubject };
      
      setUser(prev => ({
        ...prev,
        subjects: updatedSubjects,
        completedDiagnostics: newCompletedDiagnostics,
        exp: newExp,
        coins: newCoins,
        level: newUserLevel,
        expToNext: newExpToNext - leftoverExp,
      }));
      
      if (typeof window !== "undefined") {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
        if (users[user.email]) {
          users[user.email].subjects = updatedSubjects;
          users[user.email].completedDiagnostics = newCompletedDiagnostics;
          users[user.email].exp = newExp;
          users[user.email].coins = newCoins;
          users[user.email].level = newUserLevel;
          users[user.email].expToNext = newExpToNext - leftoverExp;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      }
    } else {
      setUser(prev => ({
        ...prev,
        completedDiagnostics: newCompletedDiagnostics,
        exp: newExp,
        coins: newCoins,
        level: newUserLevel,
        expToNext: newExpToNext - leftoverExp,
      }));
      
      if (typeof window !== "undefined") {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
        if (users[user.email]) {
          users[user.email].completedDiagnostics = newCompletedDiagnostics;
          users[user.email].exp = newExp;
          users[user.email].coins = newCoins;
          users[user.email].level = newUserLevel;
          users[user.email].expToNext = newExpToNext - leftoverExp;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      }
    }
    
    return { expReward, coinReward, newLevel: newUserLevel, leveledUp: newUserLevel > user.level };
  }, [user]);

  const unlockAchievement = useCallback((achievementId) => {
    if (!user || user.achievements?.includes(achievementId)) return;
    
    const newAchievements = [...(user.achievements || []), achievementId];
    const expReward = 100;
    const coinReward = 50;
    
    setUser(prev => ({
      ...prev,
      achievements: newAchievements,
      exp: prev.exp + expReward,
      coins: prev.coins + coinReward,
    }));
    
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
      if (users[user.email]) {
        users[user.email].achievements = newAchievements;
        users[user.email].exp += expReward;
        users[user.email].coins += coinReward;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
  }, [user]);

  const refreshSession = useCallback(() => {
    loadSession();
  }, [loadSession]);

  const updateUser = useCallback((updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    if (typeof window !== "undefined") {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
      if (users[user.email]) {
        users[user.email] = { ...users[user.email], ...updates };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
  }, [user]);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshSession,
    updateUser,
    completeLesson,
    completeDiagnostic,
    unlockAchievement,
    updateSubjectProgress,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}