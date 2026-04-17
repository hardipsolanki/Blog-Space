

export interface Followers {
    _id: string;
    followDetails: {
        _id: string;
        name: string;
        username: string;
        avatar: string;
        isFollowed: boolean;
    };
}
export interface FollowUnfollow {
    statusCode: number;
    message: string;
    data: {
        following: boolean;
        userId: string
    };
    success: boolean;
}
export interface GetFollowersRes {
    statusCode: number;
    message: string;
    data: Followers[];
    success: boolean;
}

export interface GetFollowingsRes {
    statusCode: number;
    message: string;
    data: Followers[];
    success: boolean;
}

