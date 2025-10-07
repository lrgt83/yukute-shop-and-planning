import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { buildFilterParams } from "../../utils/helpers";
import { SERVICES } from "../../utils/services";

import {
  toastInstance,
  toastFailedVoidSale,
  toastSuccessVoidSale,
  toastRequestVoidSale,
} from "../../helpers/toasts";

const { inventory, baseUrl } = SERVICES;

const initialState = {
  sales: [],
  salesRequestStatus: "loading" | "failed" | "succeeded",
  sale: null,
  saleRequestStatus: "loading" | "failed" | "succeeded",
  voidRequestStatus: "loading" | "failed" | "succeeded",
  filterFields: {
    username: "",
    saleDateFrom: "",
    saleDateTo: "",
    nit: "",
    name: "",
    lastname: "",
  },
};

export const salesReportSlice = createSlice({
  name: "salesReport",
  initialState,
  reducers: {
    setFilterField: (state, { payload: { field, value } }) => {
      state.filterFields[field] = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSales.pending, (state) => {
        state.salesRequestStatus = "loading";
      })
      .addCase(getSales.fulfilled, (state, { payload: { status, sales } }) => {
        if (status === 200) {
          state.salesRequestStatus = "succeeded";
          state.sales = sales;
          return;
        }
        state.salesRequestStatus = "failed";
      })
      .addCase(getSales.rejected, (state) => {
        state.salesRequestStatus = "failed";
      })
      .addCase(getSale.pending, (state) => {
        state.saleRequestStatus = "loading";
      })
      .addCase(getSale.fulfilled, (state, { payload: { status, sale } }) => {
        if (status === 200) {
          state.sale = sale;
          state.saleRequestStatus = "succeeded";
          return;
        }
        state.saleRequestStatus = "failed";
      })
      .addCase(getSale.rejected, (state) => {
        state.saleRequestStatus = "failed";
      })
      .addCase(voidSale.pending, (state) => {
        toastRequestVoidSale();
        state.voidRequestStatus = "loading";
      })
      .addCase(voidSale.fulfilled, (state, { payload: { status } }) => {
        toastInstance.dismiss();
        if (status === 200) {
          toastSuccessVoidSale();
          state.sale.voided = true;
          state.voidRequestStatus = "succeeded";
          return;
        }
        toastFailedVoidSale();
        state.voidRequestStatus = "failed";
      })
      .addCase(voidSale.rejected, (state) => {
        toastInstance.dismiss();
        toastFailedVoidSale();
        state.voidRequestStatus = "failed";
      });
  },
});

export const { setFilterField } = salesReportSlice.actions;
export default salesReportSlice.reducer;

export const getSales = createAsyncThunk(
  "salesReport/getSales",
  async ({ filters, token }) => {
    const response = await fetch(
      `${baseUrl}${inventory.getSales}?${buildFilterParams(filters)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return { sales: data, status: response.status };
  }
);

export const getSale = createAsyncThunk(
  "salesReport/getSale",
  async ({ saleId, token }) => {
    const response = await fetch(`${baseUrl}${inventory.getSales}${saleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { sale: data, status: response.status };
  }
);

export const voidSale = createAsyncThunk(
  "inventory/voidSale",
  async ({ token, saleId }) => {
    const response = await fetch(`${baseUrl}${inventory.voidSale}`, {
      method: "POST",
      body: JSON.stringify({ saleId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bea rer ${token}`,
      },
    });
    return { status: response.status };
  }
);
