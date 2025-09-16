export const athleteProfile = {
  name: "Rahul Sharma",
  avatar: "https://via.placeholder.com/100",
  testsCompleted: 12,
  recentScore: 78.5,
  rank: 145,
  totalAthletes: 15420,
  achievements: [
    { id: 1, name: "First Test", icon: "medal", earned: true },
    { id: 2, name: "Week Streak", icon: "whatshot", earned: true },
    { id: 3, name: "Form Master", icon: "gps-fixed", earned: false }
  ],
  recentActivity: [
    { test: "Push-ups", score: 22, date: "2024-09-16", time: "14:30" },
    { test: "Sit-ups", score: 35, date: "2024-09-15", time: "16:45" },
    { test: "Plank", score: 45, date: "2024-09-14", time: "10:20" }
  ]
};

export const testsData = [
  {
    id: 1,
    name: "Push-ups",
    category: "Strength",
    difficulty: "Medium",
    estimatedTime: "2-3 min",
    icon: "fitness-center",
    lastScore: 22,
    benchmark: 85,
    description: "Test upper body strength and endurance"
  },
  {
    id: 2,
    name: "Vertical Jump",
    category: "Agility",
    difficulty: "Easy",
    estimatedTime: "1-2 min",
    icon: "trending-up",
    lastScore: null,
    benchmark: 90,
    description: "Measure explosive leg power"
  },
  {
    id: 3,
    name: "Sit-ups",
    category: "Strength",
    difficulty: "Easy",
    estimatedTime: "2-3 min",
    icon: "accessibility",
    lastScore: 35,
    benchmark: 80,
    description: "Core strength and endurance test"
  },
  {
    id: 4,
    name: "Plank",
    category: "Strength",
    difficulty: "Hard",
    estimatedTime: "3-5 min",
    icon: "remove",
    lastScore: 45,
    benchmark: 120,
    description: "Core stability and endurance"
  },
  {
    id: 5,
    name: "Sprint 100m",
    category: "Endurance",
    difficulty: "Medium",
    estimatedTime: "1-2 min",
    icon: "directions-run",
    lastScore: null,
    benchmark: 15,
    description: "Speed and cardiovascular fitness"
  }
];

export const categories = [
  { name: "Strength", count: 6, icon: "fitness-center", color: "#FF5722" },
  { name: "Endurance", count: 4, icon: "directions-run", color: "#2196F3" },
  { name: "Agility", count: 5, icon: "flash-on", color: "#FF9800" },
  { name: "Flexibility", count: 3, icon: "self-improvement", color: "#9C27B0" }
];

export const aiCoachData = {
  chatHistory: [
    { id: 1, sender: 'coach', message: 'Great job on your push-up test! Ready to improve your form?', timestamp: '14:30' },
    { id: 2, sender: 'user', message: 'Yes, how can I improve?', timestamp: '14:32' },
    { id: 3, sender: 'coach', message: 'Focus on keeping your core tight and lowering slowly. Try 3 sets of 8 perfect reps.', timestamp: '14:33' }
  ],
  currentPlan: {
    name: "Upper Body Strength",
    week: 2,
    progress: 65,
    exercises: [
      { name: "Push-ups", sets: 3, reps: 12, completed: true },
      { name: "Plank", duration: "60s", completed: false }
    ]
  },
  nutritionScore: 78,
  mealSuggestions: [
    { name: "Protein Bowl", calories: 420, protein: 32 },
    { name: "Recovery Smoothie", calories: 280, protein: 25 }
  ]
};

export const communityData = {
  leaderboard: [
    { rank: 1, name: "Priya Patel", location: "Mumbai", totalScore: 1250, avatar: "https://via.placeholder.com/50" },
    { rank: 2, name: "Arjun Singh", location: "Delhi", totalScore: 1180, avatar: "https://via.placeholder.com/50" },
    { rank: 3, name: "Sneha Reddy", location: "Hyderabad", totalScore: 1155, avatar: "https://via.placeholder.com/50" },
    { rank: 145, name: "Rahul Sharma", location: "Pune", totalScore: 785, avatar: "https://via.placeholder.com/50", isCurrentUser: true }
  ],
  activeCompetitions: [
    { name: "Maharashtra Push-up Challenge", participants: 1200, endDate: "2024-09-25", prize: "State Recognition" },
    { name: "Weekly Flexibility Contest", participants: 450, endDate: "2024-09-20", prize: "Yoga Mat" }
  ]
};

export const gamificationData = {
  userPoints: 2340,
  dailyStreak: 7,
  weeklyChallenge: {
    name: "Complete 5 Different Tests",
    progress: 3,
    total: 5,
    reward: 100
  },
  badges: [
    { id: 1, name: "First Test", icon: "medal", category: "Starter", earned: true, points: 10 },
    { id: 2, name: "Perfect Form", icon: "gps-fixed", category: "Technique", earned: true, points: 25 },
    { id: 3, name: "Week Warrior", icon: "whatshot", category: "Consistency", earned: false, progress: 5, requirement: 7 },
    { id: 4, name: "Strength Master", icon: "fitness-center", category: "Performance", earned: false, progress: 2, requirement: 10 }
  ],
  recentAchievements: [
    { name: "Perfect Form", date: "2024-09-16", points: 25 },
    { name: "5-Day Streak", date: "2024-09-15", points: 50 }
  ]
};