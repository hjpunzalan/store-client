import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "src/app/api/agent";
import { Product } from "src/app/layout/models/product";
import { RootState } from "./../../app/store/configureStore";

const productsAadapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>("catalog/fetchProductsAsync", async () => {
  try {
    return await agent.Catalog.list();
  } catch (err) {
    console.error(err);
  }
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAadapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAadapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const productSelectors = productsAadapter.getSelectors((state: RootState) => state.catalog);
