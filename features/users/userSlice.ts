import { getReq, postReq } from '@/config/axiosConfig';
import { CurrentUserReq, GetUserProfileRes, LogoutRes, Profile, User, UserLoginReq, UserLoginRes, UserSignupRes } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Followers, FollowUnfollow, GetFollowersRes } from '@/types/folow';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the slice state
interface UserState {
    userData: User | null;
    isAuthenticated: boolean;
    profile: Profile | null,
    followers: Followers[] | null,
    followings: Followers[] | null,
    folowersLoading: 'idle' | 'pending' | 'succeeded' | 'failed',
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
export const logoutUser = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await postReq<{}, LogoutRes>("/api/v1/users/logout")
            clearToken()
            return response.data
        } catch (error: any) {
            console.log("erro while logout user: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
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
export const getProfile = createAsyncThunk(
    'users/profile',
    async (username: string, { rejectWithValue }) => {
        try {
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
export const getFollowers = createAsyncThunk(
    'users/followers',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetFollowersRes>(`/api/v1/follow/list/followers/${userId}`)
            return response.data
        } catch (error: any) {
            console.log("erro while get followers: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)
export const getFollowings = createAsyncThunk(
    'users/followings',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await getReq<GetFollowersRes>(`/api/v1/follow/list/following/${userId}`)
            return response.data
        } catch (error: any) {
            console.log("erro while get followings: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })
        }
    }
)
export const followUnfollow = createAsyncThunk(
    'users/follow',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await postReq<string, FollowUnfollow>(`/api/v1/follow/${userId}`)
            return { ...response.data.data, statusCode: response.data.statusCode, message: response.data.message, userId: userId }
        } catch (error: any) {
            console.log("erro while add follow: ", error)
            return rejectWithValue({
                message: error.response.data.message,
                status: error.status,
                data: error.data.data
            })

        }
    }
)


// Define the initial state using that type
const initialState: UserState = {
    isAuthenticated: false,
    userData: null,
    profile: null,
    followers: null,
    followings: null,
    folowersLoading: 'idle',
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

            // logout user
            .addCase(logoutUser.pending, (state) => {
                state.loading = 'pending'
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = 'succeeded'
                state.isAuthenticated = false
                state.userData = null
            })
            .addCase(logoutUser.rejected, (state) => {
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

            // get followers
            .addCase(getFollowers.pending, (state) => {
                state.folowersLoading = 'pending'
            })
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.folowersLoading = 'succeeded'
                state.followers = action.payload.data
            })
            .addCase(getFollowers.rejected, (state) => {
                state.folowersLoading = 'failed'
            })

            // get followings
            .addCase(getFollowings.pending, (state) => {
                state.folowersLoading = 'pending'
            })
            .addCase(getFollowings.fulfilled, (state, action) => {
                state.folowersLoading = 'succeeded'
                state.followings = action.payload.data
            })
            .addCase(getFollowings.rejected, (state) => {
                state.folowersLoading = 'failed'
            })

            // add follow
            .addCase(followUnfollow.pending, (state) => {
                state.folowersLoading = 'pending'
            })
            .addCase(followUnfollow.fulfilled, (state, action) => {
                state.folowersLoading = 'succeeded'
                if (state.profile && state.profile._id === action.payload.userId) {
                    state.profile.followersCount = action.payload.following ? state.profile.followersCount + 1 : state.profile.followersCount - 1
                    state.profile.isFollowed = action.payload.following
                }
                if (state.userData && state.profile && state.profile._id === state.userData._id) {
                    state.profile.followingCount = action.payload.following ? state.profile.followingCount + 1 : state.profile.followingCount - 1
                    state.profile.isFollowed = action.payload.following
                }
            })
            .addCase(followUnfollow.rejected, (state) => {
                state.folowersLoading = 'failed'
            })


    }

})

export default userSlice.reducer