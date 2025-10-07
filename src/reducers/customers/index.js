import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  toastFailedCreateCustomer,
  toastRequestCreateCustomer,
  toastSuccessCreateCustomer,
  toastInstance,
} from "../../helpers/toasts";

import { SERVICES } from "../../utils/services";

const { customers: customersService, baseUrl } = SERVICES;

const initialState = {
  customers: [],
  customersRequestStatus: "loading" | "failed" | "succeeded",
  createCustomerRequestStatus: "loading" | "failed" | "succeeded",
  customerForm: {
    nit: "",
    firstName: "",
    lastName: "",
    address: "CIUDAD",
  },
};

export const customers = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomerFormField: (state, { payload: { field, value } }) => {
      state.customerForm[field] = value;
    },
    resetStateProperty: (state, { payload: { field } }) => {
      state[field] = initialState[field];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.customersRequestStatus = "loading";
      })
      .addCase(
        getCustomers.fulfilled,
        (state, { payload: { status, customers } }) => {
          if (status === 200) {
            state.customersRequestStatus = "succeeded";
            state.customers = customers;
            return;
          }
          state.customersRequestStatus = "failed";
        }
      )
      .addCase(getCustomers.rejected, (state) => {
        state.customersRequestStatus = "failed";
      })
      .addCase(createCustomer.pending, (state) => {
        toastRequestCreateCustomer();
        state.createCustomerRequestStatus = "loading";
      })
      .addCase(createCustomer.fulfilled, (state, { payload: { status } }) => {
        toastInstance.dismiss();
        if (status === 201) {
          toastSuccessCreateCustomer();
          state.createCustomerRequestStatus = "succeeded";
          state.customerForm = initialState.customerForm;
          return;
        }
        toastFailedCreateCustomer();
        state.createCustomerRequestStatus = "failed";
      })
      .addCase(createCustomer.rejected, (state) => {
        toastFailedCreateCustomer();
        state.createCustomerRequestStatus = "failed";
      });
  },
});

export const { setCustomerFormField, resetStateProperty } = customers.actions;

export default customers.reducer;

export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async ({ token }) => {
    const response = await fetch(`${baseUrl}${customersService.list}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { customers: data, status: response.status };
  }
);

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async ({ token, payload }) => {
    const { status } = await fetch(`${baseUrl}${customersService.create}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return { status };
  }
);
