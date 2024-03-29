import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { history } from "src";
import agent from "src/app/api/agent";
import { User } from "src/app/models/User";
import { setBasket } from "src/features/basket/basketSlice";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>("account/signInUser", async (data, thunkAPI) => {
  try {
    const userDto = await agent.Account.login(data);
    const { basket, ...user } = userDto;
    if (basket) thunkAPI.dispatch(setBasket(basket));
    localStorage.setItem("user", JSON.stringify(user));
    thunkAPI.dispatch(setUser(user));
    return user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));

    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      history.push("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.user = null;
      toast.error("Session expired - please login again");
      history.push("/");
    });
    builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { signOut, setUser } = accountSlice.actions;
