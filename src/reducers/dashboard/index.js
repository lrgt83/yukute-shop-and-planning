import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVICES } from "../../utils/services";

const { inventory, baseUrl } = SERVICES;

const initialState = {
  data: null,
  dashboardRequestStatus: "loading" | "failed" | "succeeded",
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // setFilterField: (state, { payload: { field, value } }) => {
    //   state.filterFields[field] = value;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.dashboardRequestStatus = "loading";
        state.token = "";
      })
      .addCase(
        getDashboardData.fulfilled,
        (state, { payload: { status, data } }) => {
          if (status === 200) {
            state.dashboardRequestStatus = "succeeded";
            state.data = data;
            return;
          }
          state.dashboardRequestStatus = "failed";
        }
      )
      .addCase(getDashboardData.rejected, (state) => {
        state.dashboardRequestStatus = "failed";
      });
  },
});

// export const { setFilterField } = inventory.actions;
export default dashboard.reducer;

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async ({ token, start_date, end_date }) => {
    const response = await fetch(`${baseUrl}${inventory.dashboard}`, {
      method: "POST",
      body: JSON.stringify({ start_date, end_date }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    return { data, status: response.status };
  }
);
