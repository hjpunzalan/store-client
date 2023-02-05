import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "src/app/api/agent";
import { Basket } from "src/app/models/basket";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<Basket | undefined, { productId: number; quantity?: number }>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      // Find index of basket item
      const itemIndex = state.basket?.items.findIndex((i) => i.productId === productId);
      if (itemIndex === -1 || itemIndex === undefined) return;

      // Reduce/remove basket item from basket
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket?.items[itemIndex].quantity === 0) {
        state.basket.items.splice(itemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
      console.log(action);
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
