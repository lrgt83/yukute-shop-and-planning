import { combineReducers } from "redux";
import authReducer from "./auth";
import purchasesReportReducer from "./reports/purchases";
import inventoryReducer from "./inventory";
import newPurchaseReducer from "./inventory/newPurchase";
import newSaleReducer from "./inventory/newSale";
import customersReducer from "./customers";
import salesReportReducer from "./reports/sales";
import dashboardReducer from "./dashboard";

const rootReducer = combineReducers({
  auth: authReducer,
  purchasesReports: purchasesReportReducer,
  salesReport: salesReportReducer,
  inventory: inventoryReducer,
  newPurchase: newPurchaseReducer,
  newSale: newSaleReducer,
  customers: customersReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
