import { getReq, postReq } from '@/config/axiosConfig';
import { AddCommentReq, AddCommentRes, Comment, GetCommentRes } from '@/types/comment';
import { LikeDislikePost } from '@/types/like';
import { GetPostRes, GetSinglePostRes, Post } from '@/types/post';
import { UserSignupRes } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Define a type for the slice state
interface PostState {
    posts: Post[] | null;
    signlePost: Post | null,
    comments: Comment[] | null,
    // also add likes as a stat for showing like user
    userPosts: Post[] | null;
    followingPosts: Post[] | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    likeDislikeLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
    commentLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const addPost = createAsyncThunk(
    'posts/add',
    async (postData: FormData, { rejectWithValue }) => {
        try {
            const response = await postReq<FormData, UserSignupRes>("/api/v1/posts/", postData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response.data
        } catch (error: any) {
            console.log("erro while add post: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getFollowingPosts = createAsyncThunk(
    'posts/following/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetPostRes>("/api/v1/posts/follow/posts")
            return response.data
        } catch (error: any) {
            console.log("erro while get following users posts: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getPosts = createAsyncThunk(
    'posts/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<GetPostRes>("/api/v1/posts/")
            return response.data
        } catch (error: any) {
            console.log("erro while get posts: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getSinglePost = createAsyncThunk(
    'posts/single/get',
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetSinglePostRes>(`/api/v1/posts/${postId}`)
            return response.data
        } catch (error: any) {
            console.log("erro while get posts: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getUserPosts = createAsyncThunk(
    'posts/user/get',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetPostRes>(`/api/v1/posts/users/${userId}`)
            return response.data
        } catch (error: any) {
            console.log("erro while get user posts: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const likeDislikePost = createAsyncThunk(
    'posts/like',
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await postReq<string, LikeDislikePost>(`/api/v1/like/posts/${postId}`)
            return { ...response.data.data, postId: postId, statusCode: response.status, message: response.data.message }
        } catch (error: any) {
            console.log("erro while like/dislike post: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const addComment = createAsyncThunk(
    'posts/comment/add',
    async ({ content, postId }: AddCommentReq, { rejectWithValue }) => {
        try {
            const response = await postReq<Omit<AddCommentReq, 'postId'>, AddCommentRes>(`/api/v1/comments/posts/${postId}`, { content })
            return response.data
        } catch (error: any) {
            console.log("erro while add comment: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const getComments = createAsyncThunk(
    'posts/comments/get',
    async (postId: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetCommentRes>(`/api/v1/comments/posts/${postId}`)
            return response.data
        } catch (error: any) {
            console.log("erro while get comments: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)



// Define the initial state using that type
const initialState: PostState = {
    posts: null,
    followingPosts: null,
    signlePost: null,
    comments: null,
    userPosts: null,
    loading: 'idle',
    likeDislikeLoading: 'idle',
    commentLoading: 'idle',
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // register user 
            .addCase(addPost.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(addPost.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(addPost.rejected, (state) => {
                state.loading = 'failed'
            })

            // fetch all posts
            .addCase(getPosts.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.posts = action.payload.data
            })
            .addCase(getPosts.rejected, (state) => {
                state.loading = 'failed'
            })

            // fetch following posts
            .addCase(getFollowingPosts.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getFollowingPosts.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.followingPosts = action.payload.data
            })
            .addCase(getFollowingPosts.rejected, (state) => {
                state.loading = 'failed'
            })

            // fetch user posts
            .addCase(getUserPosts.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.userPosts = action.payload.data
            })
            .addCase(getUserPosts.rejected, (state) => {
                state.loading = 'failed'
            })

            // fetch single post
            .addCase(getSinglePost.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getSinglePost.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.signlePost = action.payload.data
            })
            .addCase(getSinglePost.rejected, (state) => {
                state.loading = 'failed'
            })

            // like/dislike post
            .addCase(likeDislikePost.pending, (state) => {
                state.likeDislikeLoading = 'pending'
            })
            .addCase(likeDislikePost.fulfilled, (state, action) => {
                state.likeDislikeLoading = 'succeeded'
                if (state.signlePost) {
                    state.signlePost = {
                        ...state.signlePost,
                        isLike: !state.signlePost?.isLike,
                        likesCount: state.signlePost?.likesCount + (action.payload.like ? 1 : -1)
                    }
                }
                if (state.posts?.length) {
                    const findPostIndex = state.posts.findIndex(post => post._id === action.payload.postId)
                    if (findPostIndex !== -1) {
                        state.posts[findPostIndex] = {
                            ...state.posts[findPostIndex],
                            isLike: action.payload.like,
                            likesCount: state.posts[findPostIndex]?.likesCount + (action.payload.like ? 1 : -1)
                        }
                    }
                }

            })
            .addCase(likeDislikePost.rejected, (state) => {
                state.likeDislikeLoading = 'failed'
            })
            // fetch comments
            .addCase(getComments.pending, (state) => {
                state.commentLoading = 'pending'
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.commentLoading = 'succeeded'
                state.comments = action.payload.data
            })
            .addCase(getComments.rejected, (state) => {
                state.commentLoading = 'failed'
            })
            // comment add
            .addCase(addComment.pending, (state) => {
                state.commentLoading = 'pending'
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.commentLoading = 'succeeded'
                state.comments?.length ? state.comments.push(action.payload.data) : state.comments = [action.payload.data]
                // update comments count similar to like count
                const findPostIndex = state.posts?.findIndex(post => post._id === action.payload.data.post)
                if (findPostIndex && findPostIndex !== -1 && state.posts?.length) {
                    state.posts[findPostIndex] = {
                        ...state.posts[findPostIndex],
                        commentsCount: state.posts[findPostIndex]?.commentsCount + 1
                    }
                }
                if (state.signlePost) {
                    state.signlePost = {
                        ...state.signlePost,
                        commentsCount: state.signlePost?.commentsCount + 1
                    }
                }
            })
            .addCase(addComment.rejected, (state) => {
                state.commentLoading = 'failed'
            })


    }

})

export default postSlice.reducer