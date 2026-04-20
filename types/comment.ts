
interface User {
    _id: string;
    username: string;
    avatar: string;
}
export interface Comment {
    _id: string;
    content: string;
    owner: User;
    createdAt: string;
}
export interface AddCommentReq {
    content: string;
    postId: string;
}
export interface AddCommentRes {
    statusCode: number;
    message: string;
    data: Comment & { post: string };
    success: boolean;
}
export interface GetCommentRes {
    statusCode: number;
    message: string;
    data: Comment[];
    success: boolean;
}
