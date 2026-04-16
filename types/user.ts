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
type ImageFile = {
    uri: string;
    name: string;
    type: string;
};
export interface UserSignupReq {
    username: string;
    name: string;
    email: string;
    password: string;
    avatar: ImageFile;
    coverImage?: ImageFile;

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

export interface UserLoginReq {
    email: string;
    password: string;
}

export interface UserLoginRes {
    statusCode: number;
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
    success: boolean;
}

export interface CurrentUserReq {
    statusCode: number;
    message: string;
    data: User;
    success: boolean;
}