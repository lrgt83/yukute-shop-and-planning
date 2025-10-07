import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import { APP_URLS } from "./helpers/routes";
import Billing from "./components/pages/Billing";
import PurchasesReport from "./components/pages/PurchasesReport";
import SalesReport from "./components/pages/SalesReport";
import Purchase from "./components/pages/Purchase";
import SaleDetails from "./components/pages/SaleDetails";
import ProductsReport from "./components/pages/ProductsReport";
import { Toaster } from "react-hot-toast";

const routesConfig = [
  {
    path: APP_URLS.login,
    element: <Login />,
  },
  {
    path: APP_URLS.admin,
    element: <div>Pagina de administracion</div>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: APP_URLS.dashboard,
        element: <Dashboard />,
      },
      {
        path: APP_URLS.billing,
        element: <Billing />,
      },
      {
        path: APP_URLS.reports.purchases,
        element: <PurchasesReport />,
      },
      {
        path: APP_URLS.reports.sales,
        element: <SalesReport />,
      },
      {
        path: APP_URLS.reports.products,
        element: <ProductsReport />,
      },
      {
        path: APP_URLS.purchase,
        element: <Purchase />,
      },
      {
        path: APP_URLS.reports.purchases + "/:purchaseId",
        element: <Purchase />,
      },
      {
        path: APP_URLS.reports.sales + "/:saleId",
        element: <SaleDetails />,
      },
      {
        path: APP_URLS.billing + "/:saleId",
        element: <SaleDetails />,
      },
    ],
  },
];

const router = createHashRouter(routesConfig);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
