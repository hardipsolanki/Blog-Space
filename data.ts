export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  coverPhoto?: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing?: boolean;
}

export interface Post {
  id: string;
  author: User;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  readTime: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'sarah_johnson',
    fullName: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Travel blogger & photographer 📸',
    coverPhoto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop',
    followers: 2453,
    following: 387,
    posts: 142,
    isFollowing: false,
  },
  {
    id: '2',
    username: 'alex_tech',
    fullName: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Full-stack developer | Tech enthusiast',
    coverPhoto: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=300&fit=crop',
    followers: 5821,
    following: 521,
    posts: 89,
    isFollowing: true,
  },
  {
    id: '3',
    username: 'emma_lifestyle',
    fullName: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bio: 'Lifestyle & wellness coach 🌿',
    followers: 3214,
    following: 612,
    posts: 203,
    isFollowing: false,
  },
  {
    id: '4',
    username: 'mike_fitness',
    fullName: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    bio: 'Personal trainer | Nutrition expert',
    followers: 8932,
    following: 234,
    posts: 321,
    isFollowing: true,
  },
  {
    id: '5',
    username: 'lisa_foodie',
    fullName: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    bio: 'Food blogger & recipe creator',
    followers: 4521,
    following: 789,
    posts: 267,
    isFollowing: false,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    author: mockUsers[1],
    title: 'Getting Started with React Server Components',
    excerpt: 'Learn how to build faster web applications using the latest React features and server-side rendering techniques.',
    content: 'React Server Components represent a paradigm shift in how we build React applications...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    category: 'Technology',
    readTime: '5 min read',
    timestamp: '2h ago',
    likes: 234,
    comments: 18,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    author: mockUsers[0],
    title: '10 Hidden Gems in Southeast Asia',
    excerpt: 'Discover breathtaking destinations off the beaten path that most tourists miss in their Southeast Asian adventures.',
    content: 'Southeast Asia is full of incredible hidden destinations...',
    coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
    category: 'Travel',
    readTime: '8 min read',
    timestamp: '5h ago',
    likes: 542,
    comments: 34,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: '3',
    author: mockUsers[2],
    title: 'Morning Routines That Changed My Life',
    excerpt: 'How I transformed my productivity and well-being by optimizing my morning routine with science-backed habits.',
    content: 'A good morning routine sets the tone for the entire day...',
    category: 'Lifestyle',
    readTime: '6 min read',
    timestamp: '1d ago',
    likes: 891,
    comments: 67,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '4',
    author: mockUsers[3],
    title: 'Build Muscle: The Complete Guide',
    excerpt: 'Everything you need to know about strength training, nutrition, and recovery for optimal muscle growth.',
    content: 'Building muscle requires a combination of proper training, nutrition, and rest...',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
    category: 'Fitness',
    readTime: '12 min read',
    timestamp: '2d ago',
    likes: 1023,
    comments: 89,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: '5',
    author: mockUsers[4],
    title: 'Homemade Pasta: A Step-by-Step Guide',
    excerpt: 'Master the art of making fresh pasta from scratch with this detailed guide and professional tips.',
    content: 'Making pasta at home is easier than you think...',
    coverImage: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=400&fit=crop',
    category: 'Food',
    readTime: '10 min read',
    timestamp: '3d ago',
    likes: 678,
    comments: 45,
    isLiked: false,
    isBookmarked: false,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    user: mockUsers[0],
    text: 'This is exactly what I needed! Thanks for sharing this comprehensive guide.',
    timestamp: '1h ago',
    likes: 12,
    replies: [
      {
        id: '1-1',
        user: mockUsers[1],
        text: 'Glad you found it helpful! Let me know if you have any questions.',
        timestamp: '45m ago',
        likes: 3,
      },
    ],
  },
  {
    id: '2',
    user: mockUsers[2],
    text: 'Great article! I would love to see more content like this.',
    timestamp: '2h ago',
    likes: 8,
  },
  {
    id: '3',
    user: mockUsers[3],
    text: 'Very informative and well-written. Bookmarked for future reference!',
    timestamp: '3h ago',
    likes: 15,
  },
];

export const categories = [
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Fitness',
  'Business',
  'Design',
  'Photography',
];
