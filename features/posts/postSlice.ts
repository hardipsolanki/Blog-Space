import { getReq, postReq } from '@/config/axiosConfig';
import { GetPostRes, GetSinglePostRes, LikeDislikePost, Post } from '@/types/post';
import { UserSignupRes } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Define a type for the slice state
interface PostState {
    posts: Post[] | null;
    signlePost: Post | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    likeDislikeLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
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



// Define the initial state using that type
const initialState: PostState = {
    posts: null,
    signlePost: null,
    loading: 'idle',
    likeDislikeLoading: 'idle'
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
                        isLiked: !state.signlePost?.isLiked,
                        likesCount: state.signlePost?.likesCount + (action.payload.like ? 1 : -1)
                    }
                }
                if (state.posts?.length) {
                    const findPostIndex = state.posts.findIndex(post => post._id === action.payload.postId)
                    if (findPostIndex !== -1) {
                        state.posts[findPostIndex] = {
                            ...state.posts[findPostIndex],
                            isLiked: action.payload.like,
                            likesCount: state.posts[findPostIndex]?.likesCount + (action.payload.like ? 1 : -1)
                        }
                    }
                }

            })
            .addCase(likeDislikePost.rejected, (state) => {
                state.likeDislikeLoading = 'failed'
            })


    }

})

export default postSlice.reducer