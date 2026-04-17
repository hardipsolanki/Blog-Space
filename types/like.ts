export interface LikeDislikePost {
    statusCode: number;
    message: string;
    data: {
        like: boolean;
        postId: string
    };
    success: boolean;
}