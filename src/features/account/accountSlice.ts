import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "src/app/api/agent";
import { User } from "src/app/models/User";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>("account/signInUser", async (data, thunkAPI) => {
  try {
    const user = await agent.Account.login(data);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const fetchCurrentUser = createAsyncThunk<User>("account/signInUser", async (_, thunkAPI) => {
  try {
    const user = await agent.Account.currentUser();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
      console.log(action.payload);
      throw action.payload;
    });
  },
});
