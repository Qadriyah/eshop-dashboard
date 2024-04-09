"use client";

import { me } from "@/api/actions/profile";
import { ProfileType } from "@/types/entities";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  loading: "idle" | "pending" | "fulfilled" | "failed";
  error: unknown;
  user: ProfileType | null;
}

const initialState = {
  loading: "idle",
  error: null,
  user: null,
} as UserState;

const namespace = "user";

export const getUser = createAsyncThunk(
  `${namespace}/getUser`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await me();
      return response;
    } catch (err: any) {
      if (!err.response) {
        return rejectWithValue({
          err,
          message: "Network Error",
        });
      } else {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    updateUserProfile(state, action: PayloadAction<ProfileType>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user = action.payload.profile;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      });
  },
});

export const { updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
