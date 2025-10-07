import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVICES } from "../../utils/services";
import { formatDateForBackend } from "../../helpers/converters";
import {
  toastSavingNewPurchase,
  toastSavedNewPurchase,
  toastErrorNewPurchase,
  toastInstance,
  toastRequestVoidPurchase,
  toastFailedVoidPurchase,
  toastSuccessVoidPurchase,
} from "../../helpers/toasts";

const { inventory, baseUrl } = SERVICES;

const initialState = {
  purchaseForm: {
    productId: null,
    quantity: "",
    price: "",
    expirationDate: "",
    productLabel: "Selecciona un producto",
  },
  providerId: null,
  providerLabel: "Selecciona un proveedor",
  purchaseList: [],
  purchaseItemsToDelete: [],
  total: 0,
  saveNewPurchaseStatus: "loading" | "failed" | "succeeded",
  getPurchaseStatus: "loading" | "failed" | "succeeded",
  voidPurchaseStatus: "loading" | "failed" | "succeeded",
  purchaseDetail: null,
};

export const newPurchase = createSlice({
  name: "newPurchase",
  initialState,
  reducers: {
    setPurchaseFormField: (state, { payload: { field, value } }) => {
      state.purchaseForm[field] = value;
    },
    setProvider: (state, { payload: { providerId, providerLabel } }) => {
      state.providerId = providerId;
      state.providerLabel = providerLabel;
    },
    addProductToList: (state) => {
      state.purchaseList.push({
        ...state.purchaseForm,
        expirationDate: formatDateForBackend(state.purchaseForm.expirationDate),
        expirationDateFormatted: state.purchaseForm.expirationDate,
      });
      state.total +=
        Number(state.purchaseForm.price) * Number(state.purchaseForm.quantity);
      state.purchaseForm = initialState.purchaseForm;
    },
    removeProductFromList: (state, { payload: { index, purchaseItemId } }) => {
      state.total -=
        Number(state.purchaseList[index].price) *
        Number(state.purchaseList[index].quantity);
      state.purchaseList.splice(index, 1);
      if (purchaseItemId) {
        state.purchaseItemsToDelete.push(purchaseItemId);
      }
    },
    resetPurchase: (state) => {
      state.purchaseForm = initialState.purchaseForm;
      state.purchaseList = initialState.purchaseList;
      state.purchaseItemsToDelete = initialState.purchaseItemsToDelete;
      state.total = initialState.total;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(saveNewPurchase.pending, (state) => {
        state.saveNewPurchaseStatus = "loading";
        toastSavingNewPurchase();
      })
      .addCase(saveNewPurchase.fulfilled, (state, { payload: { status } }) => {
        toastInstance.dismiss();
        if (status === 200) {
          state.saveNewPurchaseStatus = "succeeded";
          state.purchaseForm = initialState.purchaseForm;
          state.purchaseList = initialState.purchaseList;
          state.total = initialState.total;
          toastSavedNewPurchase();
          return;
        }
        state.saveNewPurchaseStatus = "failed";
        toastErrorNewPurchase();
      })
      .addCase(saveNewPurchase.rejected, (state) => {
        state.saveNewPurchaseStatus = "failed";
        toastErrorNewPurchase();
      })
      .addCase(getPurchase.pending, (state) => {
        state.getPurchaseStatus = "loading";
      })
      .addCase(
        getPurchase.fulfilled,
        (state, { payload: { status, purchase } }) => {
          if (status === 200) {
            state.purchaseDetail = purchase;
            state.getPurchaseStatus = "succeeded";
            return;
          }
          state.purchaseDetail = null;
          state.getPurchaseStatus = "failed";
        }
      )
      .addCase(getPurchase.rejected, (state) => {
        state.getPurchaseStatus = "failed";
      })
      .addCase(voidPurchase.pending, (state) => {
        toastRequestVoidPurchase();
        state.voidPurchaseStatus = "loading";
      })
      .addCase(voidPurchase.fulfilled, (state, { payload: { status } }) => {
        toastInstance.dismiss();
        if (status === 200) {
          toastSuccessVoidPurchase();
          state.voidPurchaseStatus = "succeeded";
          state.purchaseDetail.voided = true;
          return;
        }
        toastFailedVoidPurchase();
        state.voidPurchaseStatus = "failed";
      })
      .addCase(voidPurchase.rejected, (state) => {
        toastInstance.dismiss();
        toastFailedVoidPurchase();
        state.voidPurchaseStatus = "failed";
      });
  },
});

export const {
  setPurchaseFormField,
  addProductToList,
  removeProductFromList,
  resetPurchase,
  setProvider,
} = newPurchase.actions;
export default newPurchase.reducer;

export const saveNewPurchase = createAsyncThunk(
  "inventory/saveNewPurchase",
  async ({ purchaseList, providerId, token }) => {
    const response = await fetch(`${baseUrl}${inventory.saveNewPurchase}`, {
      method: "POST",
      body: JSON.stringify({ purchaseList, providerId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: response.status };
  }
);

export const voidPurchase = createAsyncThunk(
  "inventory/voidPurchase",
  async ({ token, purchaseId }) => {
    const response = await fetch(`${baseUrl}${inventory.voidPurchase}`, {
      method: "POST",
      body: JSON.stringify({ purchaseId }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: response.status };
  }
);

export const getPurchase = createAsyncThunk(
  "purchasesReport/getPurchase",
  async ({ purchaseId, token }) => {
    const response = await fetch(
      `${baseUrl}${inventory.getPurchases}${purchaseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return { purchase: data, status: response.status };
  }
);
