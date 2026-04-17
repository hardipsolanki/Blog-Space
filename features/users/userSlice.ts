import { getReq, postReq } from '@/config/axiosConfig';
import { CurrentUserReq, GetUserProfileRes, Profile, User, UserLoginReq, UserLoginRes, UserSignupRes } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the slice state
interface UserState {
    userData: User | null;
    isAuthenticated: boolean;
    profile: Profile | null
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const setToken = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
}

const clearToken = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
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
            const response = await postReq<UserLoginReq, UserLoginRes>("/api/v1/users/login", userData)
            // set accessToken
            setToken(response.data.data.AccessToken, response.data.data.RefreshToken)
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

// get profile /api/v1/users/username
export const getProfile = createAsyncThunk(
    'users/profile',
    async (username: string, { rejectWithValue }) => {
        try {
            console.log({ username })
            const response = await getReq<GetUserProfileRes>(`/api/v1/users/${username}`)
            return response.data
        } catch (error: any) {
            console.log("erro while get profile: ", error)
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
    profile: null
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

            // get profile
            .addCase(getProfile.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = 'succeeded'
                state.profile = action.payload.data
            })
            .addCase(getProfile.rejected, (state) => {
                state.loading = 'failed'
            })

    }

})

export default userSlice.reducer