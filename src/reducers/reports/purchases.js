import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { buildFilterParams } from "../../utils/helpers";
import { SERVICES } from "../../utils/services";

const initialState = {
  purchases: [],
  purchasesRequestStatus: "loading" | "failed" | "succeeded",
  filterFields: {
    username: "",
    purchaseDateFrom: "",
    purchaseDateTo: "",
  },
};

export const purchasesReportSlice = createSlice({
  name: "purchasesReport",
  initialState,
  reducers: {
    setFilterField: (state, { payload: { field, value } }) => {
      state.filterFields[field] = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPurchases.pending, (state) => {
        state.purchasesRequestStatus = "loading";
      })
      .addCase(
        getPurchases.fulfilled,
        (state, { payload: { status, purchases } }) => {
          if (status === 200) {
            state.purchasesRequestStatus = "succeeded";
            state.purchases = purchases;
            return;
          }
          state.purchasesRequestStatus = "failed";
        }
      )
      .addCase(getPurchases.rejected, (state) => {
        state.purchasesRequestStatus = "failed";
      });
  },
});

export const { setFilterField } = purchasesReportSlice.actions;
export default purchasesReportSlice.reducer;

export const getPurchases = createAsyncThunk(
  "purchasesReport/getPurchases",
  async ({ filters, token }) => {
    const { inventory, baseUrl } = SERVICES;
    const response = await fetch(
      `${baseUrl}${inventory.getPurchases}?${buildFilterParams(filters)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return { purchases: data, status: response.status };
  }
);
