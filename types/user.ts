export type ImageFile = {
    uri: string;
    name: string;
    type: string;
};

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    coverImage?: string;
    createdAt: string;
}
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
        coverImage?: string;
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
        AccessToken: string;
        RefreshToken: string;
    };
    success: boolean;
}

export interface CurrentUserReq {
    statusCode: number;
    message: string;
    data: User;
    success: boolean;
}

export interface Profile {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    coverImage?: string;
    createdAt: string;
    followingCount: number;
    followersCount: number;
    isFollowed: boolean
}

export interface GetUserProfileRes {
    statusCode: number;
    message: string;
    data: Profile;
    success: boolean;
}