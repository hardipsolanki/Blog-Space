export const ROUTES = {
    Tabs: '(tabs)',
    Index: 'index',
    Login: 'login',
    Signup: 'signup',
    Profile: 'profile/[username]',
    AddPost: 'add-post',
    Home: "home",
    PostDetails: "post-details/[postId]",
    followers: "followers/[userId]",
    followings: "followings/[userId]",
    comments: "comments/[postId]",
    setting: "setting"
};



export const TABS_PATHS = {
    Index: '/(tabs)/home',
    Profile: '/profile',
    AddPost: '/add-post',
    UserProfile: '/(tabs)/profile/[username]',
} as const

export const ROUTER_PATHS = {
    Login: '/login',
    Signup: '/signup',
    Profile: '/profile',
    AddPost: '/add-post',
    PostDetails: '/post-details/[postId]',
    followers: "/followers/[userId]",
    followings: "/followings/[userId]",
    comments: "/comments/[postId]",
    setting: "/setting"
} as const