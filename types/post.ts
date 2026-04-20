import { ImageFile } from "./user";

interface owner {
    _id: string;
    username: string;
    avatar: string;
    name: string  
}
export interface Post {
    _id: string;
    title: string;
    content: string;
    owner: owner;
    image: string;
    status: string;
    likesCount: number;
    commentsCount: number;
    isLike: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PostReq {
    title: string;
    content: string;
    image: ImageFile;
}

export interface GetPostRes {
    statusCode: number;
    message: string;
    data: Post[];
    success: boolean;
}

export interface GetSinglePostRes {
    statusCode: number;
    message: string;
    data: Post;
    success: boolean;
}

