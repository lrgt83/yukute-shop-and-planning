import { Link } from "react-router-dom";
import { useState } from "react";

function MenuItem({ title, icon, targetPath, children }) {
  const hasSubMenu = children?.length > 0;
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      {!hasSubMenu && (
        <li className="menu-item">
          <Link className="menu-link" to={targetPath}>
            <i className={`menu-icon ${icon}`}></i>
            <span className="menu-text">{title}</span>
          </Link>
        </li>
      )}
      {hasSubMenu && (
        <li
          className={`menu-item menu-item-submenu ${
            openMenu ? "menu-item-open" : ""
          }`}
        >
          <div className="menu-link" onClick={() => setOpenMenu(!openMenu)}>
            <i className={`menu-icon ${icon}`}></i>
            <span className="menu-text">{title}</span>
            <i className="menu-arrow"></i>
          </div>
          <div className="menu-submenu">
            <i className="menu-arrow"></i>
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent">
                <span className="menu-link">
                  <span className="menu-text">{title}</span>
                </span>
              </li>
              {children.map((subMenu, index) => (
                <li className="menu-item" key={index}>
                  <Link className="menu-link" to={subMenu.targetPath}>
                    <i className="menu-bullet menu-bullet-dot">
                      <span></span>
                    </i>
                    <span className="menu-text">{subMenu.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      )}
    </>
  );
}

export default MenuItem;
