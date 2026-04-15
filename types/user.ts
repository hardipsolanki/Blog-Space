export interface User {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
    coverPhoto?: string;
    followers: number;
    following: number;
    posts: number;
    isFollowing?: boolean;
}

export interface UserSignupReq {
    username: string;
    fullName: string;
    email: string;
    password: string;
    avatar: File;
    coverPhoto?: File;

}
export interface UserSignupRes {
    statusCode: number;
    message: string;
    data: {
        _id: string;
        name: string;
        username: string;
        email: string;
        avatar: string;
        coverImage: string;
        token: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    success: boolean;
}