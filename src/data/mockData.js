// Mock data for the Eco-Learning Platform

export const user = {
  id: "user1",
  name: "Alex Green",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  ecoPoints: 2750,
  level: 8,
  pointsToNextLevel: 250,
  totalTreesPlanted: 23,
  wasteReduced: 45.6, // kg
  waterSaved: 1240, // liters
  joinedDate: "2024-01-15"
};

export const lessons = [
  {
    id: "l1",
    title: "Renewable Energy Basics",
    category: "Energy",
    summary: "Learn about solar, wind, and hydroelectric power sources and their environmental impact.",
    estimatedTime: 15,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
    completed: true,
    progress: 100
  },
  {
    id: "l2", 
    title: "Waste Reduction Strategies",
    category: "Waste Management",
    summary: "Discover effective methods to reduce, reuse, and recycle materials in daily life.",
    estimatedTime: 20,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
    completed: false,
    progress: 60
  },
  {
    id: "l3",
    title: "Biodiversity Conservation", 
    category: "Biodiversity",
    summary: "Understand the importance of protecting ecosystems and endangered species.",
    estimatedTime: 25,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    completed: false,
    progress: 0
  },
  {
    id: "l4",
    title: "Climate Change Science",
    category: "Climate",
    summary: "Explore the causes and effects of global climate change and mitigation strategies.",
    estimatedTime: 30,
    image: "https://images.unsplash.com/photo-1569163139290-de82fb4f6093?w=400",
    completed: false,
    progress: 0
  },
  {
    id: "l5",
    title: "Sustainable Transportation",
    category: "Transportation",
    summary: "Learn about eco-friendly transportation options and their environmental benefits.",
    estimatedTime: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    completed: true,
    progress: 100
  },
  {
    id: "l6",
    title: "Water Conservation",
    category: "Water",
    summary: "Master techniques for saving water at home and understanding water cycle impacts.",
    estimatedTime: 22,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    completed: false,
    progress: 30
  }
];

export const challenges = [
  {
    id: "c1",
    title: "Plant a Tree",
    description: "Plant a tree in your local area and document the process with photos.",
    difficulty: "Easy",
    points: 100,
    submitted: true,
    proofImageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300",
    category: "Nature",
    deadline: "2024-12-31"
  },
  {
    id: "c2",
    title: "Zero Waste Week",
    description: "Complete one full week generating minimal waste and track your progress.",
    difficulty: "Medium", 
    points: 200,
    submitted: false,
    proofImageUrl: null,
    category: "Waste",
    deadline: "2024-11-30"
  },
  {
    id: "c3",
    title: "Community Clean-up",
    description: "Organize or join a local community clean-up event in your neighborhood.",
    difficulty: "Medium",
    points: 250,
    submitted: false,
    proofImageUrl: null,
    category: "Community",
    deadline: "2024-12-15"
  },
  {
    id: "c4",
    title: "Energy Audit",
    description: "Conduct a comprehensive energy audit of your home and implement improvements.",
    difficulty: "Hard",
    points: 300,
    submitted: false,
    proofImageUrl: null,
    category: "Energy",
    deadline: "2024-12-20"
  },
  {
    id: "c5",
    title: "Plastic-Free Day",
    description: "Go one full day without using any single-use plastics and document alternatives used.",
    difficulty: "Easy",
    points: 75,
    submitted: true,
    proofImageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
    category: "Lifestyle", 
    deadline: "2024-10-31"
  },
  {
    id: "c6",
    title: "Rain Water Harvesting",
    description: "Set up a rainwater collection system and track water saved over one month.",
    difficulty: "Hard",
    points: 400,
    submitted: false,
    proofImageUrl: null,
    category: "Water",
    deadline: "2025-01-15"
  }
];

export const leaderboard = [
  {
    id: "user1",
    name: "Alex Green", 
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    points: 2750,
    rank: 4,
    level: 8,
    badgeCount: 12
  },
  {
    id: "user2",
    name: "Maya Earth",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya", 
    points: 3850,
    rank: 1,
    level: 12,
    badgeCount: 18
  },
  {
    id: "user3",
    name: "Sam Ocean",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    points: 3200,
    rank: 2,
    level: 10,
    badgeCount: 15
  },
  {
    id: "user4", 
    name: "River Stone",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=River",
    points: 2950,
    rank: 3,
    level: 9,
    badgeCount: 14
  },
  {
    id: "user5",
    name: "Luna Forest",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    points: 2650,
    rank: 5,
    level: 7,
    badgeCount: 11
  },
  {
    id: "user6",
    name: "Sage Mountain",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sage",
    points: 2400,
    rank: 6,
    level: 7,
    badgeCount: 10
  },
  {
    id: "user7",
    name: "Sky Walker",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sky",
    points: 2100,
    rank: 7,
    level: 6,
    badgeCount: 8
  }
];

export const badges = [
  {
    id: "b1",
    name: "Tree Planter",
    description: "Plant your first tree and help restore nature",
    unlocked: true,
    icon: "🌱",
    rarity: "common",
    unlockedDate: "2024-09-15"
  },
  {
    id: "b2",
    name: "Waste Warrior",
    description: "Complete a zero-waste challenge",
    unlocked: true,
    icon: "♻️", 
    rarity: "common",
    unlockedDate: "2024-09-20"
  },
  {
    id: "b3",
    name: "Energy Saver",
    description: "Reduce your energy consumption by 25%",
    unlocked: false,
    icon: "⚡",
    rarity: "uncommon",
    unlockedDate: null
  },
  {
    id: "b4",
    name: "Community Leader",
    description: "Organize a community environmental event",
    unlocked: false,
    icon: "👥",
    rarity: "rare",
    unlockedDate: null
  },
  {
    id: "b5",
    name: "Water Guardian",
    description: "Save 1000+ liters of water in a month",
    unlocked: true,
    icon: "💧",
    rarity: "uncommon",
    unlockedDate: "2024-08-30"
  },
  {
    id: "b6",
    name: "Eco Champion",
    description: "Reach level 10 and complete 50+ challenges",
    unlocked: false,
    icon: "🏆",
    rarity: "legendary",
    unlockedDate: null
  },
  {
    id: "b7",
    name: "Green Commuter",
    description: "Use sustainable transport for 30 days",
    unlocked: true,
    icon: "🚲",
    rarity: "common",
    unlockedDate: "2024-09-10"
  },
  {
    id: "b8", 
    name: "Nature Photographer",
    description: "Document 25+ biodiversity observations",
    unlocked: false,
    icon: "📸",
    rarity: "uncommon",
    unlockedDate: null
  }
];

export const communityPosts = [
  {
    id: "p1",
    author: {
      name: "Maya Earth",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      level: 12
    },
    content: "Just completed my 50th tree planting! 🌳 The local forest is looking so much greener. Who wants to join me for the next community planting event this weekend?",
    timestamp: "2024-10-15T14:30:00Z",
    likes: 24,
    comments: 8,
    pinned: false,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
  },
  {
    id: "p2",
    author: {
      name: "River Stone", 
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=River",
      level: 9
    },
    content: "🎉 ANNOUNCEMENT: New partnership with local schools! We're launching eco-education programs in 15 schools this month. Together we can make a bigger impact!",
    timestamp: "2024-10-14T09:15:00Z",
    likes: 42,
    comments: 15,
    pinned: true,
    imageUrl: null
  },
  {
    id: "p3",
    author: {
      name: "Sam Ocean",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam", 
      level: 10
    },
    content: "Completed my first month of zero-waste living! It's challenging but so rewarding. My top 3 tips: 1) Always carry a reusable bag 2) Buy in bulk 3) Compost everything organic 🌱",
    timestamp: "2024-10-13T16:45:00Z",
    likes: 18,
    comments: 6,
    pinned: false,
    imageUrl: null
  },
  {
    id: "p4",
    author: {
      name: "Luna Forest",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
      level: 7
    },
    content: "Amazing sunrise during our beach cleanup this morning! Collected over 200kg of plastic waste. The ocean creatures will thank us 🐢✨",
    timestamp: "2024-10-12T18:20:00Z", 
    likes: 31,
    comments: 12,
    pinned: false,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500"
  }
];

export const recentActivity = [
  {
    id: "a1",
    type: "badge_earned",
    description: "Earned 'Water Guardian' badge",
    timestamp: "2024-10-15T10:30:00Z",
    points: 50
  },
  {
    id: "a2", 
    type: "challenge_completed",
    description: "Completed 'Plant a Tree' challenge",
    timestamp: "2024-10-14T14:20:00Z",
    points: 100
  },
  {
    id: "a3",
    type: "lesson_finished",
    description: "Finished 'Renewable Energy Basics' lesson",
    timestamp: "2024-10-13T16:15:00Z",
    points: 25
  },
  {
    id: "a4",
    type: "level_up",
    description: "Reached level 8!",
    timestamp: "2024-10-12T12:00:00Z",
    points: 0
  }
];

export const dailyChallenges = [
  {
    id: "dc1",
    title: "Turn off unused devices",
    description: "Unplug electronics when not in use for 2 hours",
    points: 10,
    completed: true
  },
  {
    id: "dc2",
    title: "Use a reusable water bottle",
    description: "Avoid single-use plastic bottles today",
    points: 15,
    completed: false
  },
  {
    id: "dc3",
    title: "Take public transport",
    description: "Use public transport or walk instead of driving",
    points: 20,
    completed: false
  }
];

export const campaigns = [
  {
    id: "camp1",
    title: "Save the Forests Campaign",
    description: "Join our global effort to plant 1 million trees this year",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
    progress: 750000,
    goal: 1000000,
    endDate: "2024-12-31",
    participants: 15420
  },
  {
    id: "camp2", 
    title: "Ocean Cleanup Initiative",
    description: "Help remove plastic waste from our oceans and waterways",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600", 
    progress: 325,
    goal: 500,
    endDate: "2024-11-30",
    participants: 8750
  }
];