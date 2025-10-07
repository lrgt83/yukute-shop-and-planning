import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVICES } from "../../utils/services";
import { buildFilterParams } from "../../utils/helpers";

const initialState = {
  products: [],
  productsRequestStatus: "loading" | "failed" | "succeeded",
  providers: [],
  providersRequestStatus: "loading" | "failed" | "succeeded",
  filterFields: {
    name: "",
    description: "",
    category__name: "",
    brand__name: "",
  },
};

export const inventory = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setFilterField: (state, { payload: { field, value } }) => {
      state.filterFields[field] = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.productsRequestStatus = "loading";
        state.token = "";
      })
      .addCase(
        getProducts.fulfilled,
        (state, { payload: { status, products } }) => {
          if (status === 200) {
            state.productsRequestStatus = "succeeded";
            state.products = products;
            return;
          }
          state.productsRequestStatus = "failed";
        }
      )
      .addCase(getProducts.rejected, (state) => {
        state.productsRequestStatus = "failed";
      })
      .addCase(getProviders.pending, (state) => {
        state.providersRequestStatus = "loading";
        state.token = "";
      })
      .addCase(
        getProviders.fulfilled,
        (state, { payload: { status, providers } }) => {
          if (status === 200) {
            state.providersRequestStatus = "succeeded";
            state.providers = providers;
            return;
          }
          state.providersRequestStatus = "failed";
        }
      )
      .addCase(getProviders.rejected, (state) => {
        state.providersRequestStatus = "failed";
      });
  },
});

export const { setFilterField } = inventory.actions;
export default inventory.reducer;

export const getProducts = createAsyncThunk(
  "inventory/getProducts",
  async ({ token, filters = null }) => {
    const { inventory, baseUrl } = SERVICES;
    const response = await fetch(
      `${baseUrl}${inventory.getProducts}${
        filters ? "?" + buildFilterParams(filters) : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return { products: data, status: response.status };
  }
);

export const getProviders = createAsyncThunk(
  "inventory/getProviders",
  async ({ token }) => {
    const { inventory, baseUrl } = SERVICES;
    const response = await fetch(`${baseUrl}${inventory.getProviders}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { providers: data, status: response.status };
  }
);
