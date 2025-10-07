import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVICES } from "../../utils/services";
import {
  toastSavingNewSale,
  toastSavedNewSale,
  toastErrorNewSale,
  toastInstance,
} from "../../helpers/toasts";

const { inventory, baseUrl } = SERVICES;

const initialState = {
  saleForm: {
    productId: null,
    quantity: "",
    customerId: null,
    productLabel: "Selecciona un producto",
    customerLabel: "Selecciona un cliente",
  },
  saleList: [],
  total: 0,
  saveNewSaleStatus: "loading" | "failed" | "succeeded",
  typeOfSale: "SALE",
};

export const newSale = createSlice({
  name: "newSale",
  initialState,
  reducers: {
    setSaleFormField: (state, { payload: { field, value } }) => {
      state.saleForm[field] = value;
    },
    addProductToList: (state, { payload: { product, quantity } }) => {
      const subTotal = Number(product.sale_price) * Number(quantity);
      state.saleList.push({
        productId: product.id,
        quantity: Number(quantity),
        productLabel: `${product.name} - ${product.description}- ${product.brand.name}`,
        salePrice: product.sale_price,
        subTotal: subTotal,
      });
      state.total += subTotal;
      state.saleForm = {
        ...initialState.saleForm,
        customerId: state.saleForm.customerId,
        customerLabel: state.saleForm.customerLabel,
      };
    },
    removeProductFromList: (state, { payload: { index, productToSell } }) => {
      state.total -= productToSell.subTotal;
      state.saleList.splice(index, 1);
    },
    resetSaleList: (state) => {
      state.saleList = initialState.saleList;
      state.total = initialState.total;
    },
    setTypeOfSale: (state, { payload }) => {
      state.saleForm = initialState.saleForm;
      state.saleList = initialState.saleList;
      state.total = initialState.total;
      state.typeOfSale = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveNewSale.pending, (state) => {
        state.saveNewSaleStatus = "loading";
        toastSavingNewSale();
      })
      .addCase(saveNewSale.fulfilled, (state, { payload: { status } }) => {
        toastInstance.dismiss();
        if (status === 200) {
          state.saveNewSaleStatus = "succeeded";
          state.saleForm = initialState.saleForm;
          state.saleList = initialState.saleList;
          state.total = initialState.total;
          toastSavedNewSale();
          return;
        }
        state.saveNewSaleStatus = "failed";
        toastErrorNewSale();
      })
      .addCase(saveNewSale.rejected, (state) => {
        state.saveNewSaleStatus = "failed";
        toastErrorNewSale();
      });
  },
});

export const {
  setSaleFormField,
  addProductToList,
  removeProductFromList,
  resetSaleList,
  setTypeOfSale,
} = newSale.actions;
export default newSale.reducer;

export const saveNewSale = createAsyncThunk(
  "inventory/saveNewSale",
  async ({ saleList, customerId, token, saleType }) => {
    const response = await fetch(`${baseUrl}${inventory.saveNewSale}`, {
      method: "POST",
      body: JSON.stringify({ saleList, customerId, saleType }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("saveNewSale", response, data);
    window.open(window.location.href + "/" + data.saleId, "_blank");
    return { status: response.status };
  }
);
