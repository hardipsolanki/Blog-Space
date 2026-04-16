import { getReq, postReq } from '@/config/axiosConfig';
import { CurrentUserReq, User, UserLoginReq, UserLoginRes, UserSignupRes } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Define a type for the slice state
interface UserState {
    userData: User | null;
    isAuthenticated: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

// create the thunk
export const registerUser = createAsyncThunk(
    'users/register',
    async (userData: FormData, { rejectWithValue }) => {
        try {
            const response = await postReq<FormData, UserSignupRes>(
                "/api/v1/users/register",
                userData,
                {
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            return response.data
        } catch (error: any) {
            console.log("erro while signup user: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

export const loginUser = createAsyncThunk(
    'users/login',
    async (userData: UserLoginReq, { rejectWithValue }) => {
        try {
            const response = await postReq<UserLoginReq, UserLoginRes>(
                "/api/v1/users/login",
                userData)
            return response.data
        } catch (error: any) {
            console.log("erro while login user: ", error)
            return rejectWithValue({
                message: error.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)
export const crrentUser = createAsyncThunk(
    'users/current',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getReq<CurrentUserReq>("/api/v1/users/get-user")
            return response.data
        } catch (error: any) {
            console.log("erro while get get-user: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    },
)

// Define the initial state using that type
const initialState: UserState = {
    isAuthenticated: false,
    userData: null,
    loading: 'idle',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // register user 
            .addCase(registerUser.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = 'succeeded'
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = 'failed'
            })
            // login user
            .addCase(loginUser.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = 'failed'

            })

            // current user
            .addCase(crrentUser.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(crrentUser.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.isAuthenticated = true
                state.userData = action.payload.data
            })
            .addCase(crrentUser.rejected, (state) => {
                state.loading = 'failed'
            })

    }

})

export default userSlice.reducer