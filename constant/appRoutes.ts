export const ROUTES = {
    Tabs: '(tabs)',
    Index: 'index',
    Login: 'login',
    Signup: 'signup',
    Profile: 'profile',
    AddPost: 'add-post',
    Home: "home",
    PostDetails: "post-details/[postId]",
    followers: "followers",
    followings: "followings",
    comments: "comments"
};



export const TABS_PATHS = {
    Index: '/home',
    Profile: '/profile',
    AddPost: '/add-post'
}

export const ROUTER_PATHS = {
    Login: '/login',
    Signup: '/signup',
    Profile: '/profile',
    AddPost: '/add-post',
    PostDetails: '/post-details/postId',
    followers: '/followers',
    followings: "/followings",
    comments: "/comments"
} as const