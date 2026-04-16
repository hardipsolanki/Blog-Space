import { getReq, postReq } from '@/config/axiosConfig';
import { GetPostRes, GetSinglePostRes, Post } from '@/types/post';
import { UserSignupRes } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Define a type for the slice state
interface PostState {
    posts: Post[] | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    signlePost: Post | null
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



// Define the initial state using that type
const initialState: PostState = {
    posts: null,
    signlePost: null,
    loading: 'idle',
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


    }

})

export default postSlice.reducer