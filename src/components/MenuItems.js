import React from "react";
import MenuItem from "./MenuItem";
import { APP_URLS } from "../helpers/routes";

const MenuItems = () => {
  return (
    <ul className="menu-nav">
      <MenuItem
        {...{
          title: "Inicio",
          icon: "fas fa-home",
          targetPath: APP_URLS.dashboard,
        }}
      />
      <MenuItem
        {...{
          title: "Facturar",
          icon: "fas fa-cash-register",
          targetPath: APP_URLS.billing,
        }}
      />
      <MenuItem
        {...{
          title: "Nueva Compra",
          icon: "fas fa-truck-loading",
          targetPath: APP_URLS.purchase,
        }}
      />
      <MenuItem
        {...{
          title: "Reportes",
          icon: "fas fa-chart-line",
          children: [
            {
              title: "Ventas",
              targetPath: APP_URLS.reports.sales,
            },
            {
              title: "Compras",
              targetPath: APP_URLS.reports.purchases,
            },
            {
              title: "Productos",
              targetPath: APP_URLS.reports.products,
            },
          ],
        }}
      />
      <li className="menu-item">
        <a
          target={"_blank"}
          rel="noreferrer"
          className="menu-link"
          href={APP_URLS.admin}
        >
          <i className="menu-icon flaticon2-settings"></i>
          <span className="menu-text">Administración</span>
        </a>
      </li>
    </ul>
  );
};

export default MenuItems;
