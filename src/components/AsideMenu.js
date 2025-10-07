import { Link } from "react-router-dom";

import MenuItems from "./MenuItems";

import { APP_URLS } from "../helpers/routes";

import Logo from "../assets/theme/media/logos/yukute-logo.jpg";

function AsideMenu() {
  return (
    <div
      className="aside aside-left aside-fixed d-flex flex-column flex-row-auto"
      id="kt_aside"
    >
      <div className="brand flex-column-auto" id="kt_brand">
        <Link to={APP_URLS.dashboard}>
          <div className="brand-logo">
            <img alt="Logo" className="w-150px" src={Logo} />
          </div>
        </Link>
      </div>
      <div
        className="aside-menu-wrapper flex-column-fluid"
        id="kt_aside_menu_wrapper"
      >
        <div
          id="kt_aside_menu"
          className="aside-menu my-4"
          data-menu-vertical="1"
          data-menu-scroll="1"
          data-menu-dropdown-timeout="500"
        >
          <MenuItems />
        </div>
      </div>
    </div>
  );
}

export default AsideMenu;