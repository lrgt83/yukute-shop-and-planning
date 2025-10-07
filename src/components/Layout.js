import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyToken } from "../reducers/auth";
import HeaderMobile from "./HeaderMobile";
import AsideMenu from "./AsideMenu";
import Subheader from "./Subheader";
import Header from "./Header";
import UserPanel from "./UserPanel";
import QuickKart from "./QuickKart";
import Footer from "./Footer";
import OffcanvasOverlay from "./OffcanvasOverlay";
import { APP_URLS } from "../helpers/routes";
import Spinner from "./Spinner";

function Layout() {
  const { token, verifyingToken, sessionExpired, refreshToken } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken({ token, refreshToken }));
    if (sessionExpired) {
      return navigate(APP_URLS.login);
    }
    setShowMobileMenu(false);
  }, [navigate, sessionExpired, dispatch, token, refreshToken]);

  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showQuickKart, setShowQuickKart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (verifyingToken) {
    return <Spinner />;
  }

  return (
    <>
      <HeaderMobile
        handleOpenUserPanel={setShowUserPanel}
        handleOpenMobileMenu={setShowMobileMenu}
      />
      <div className="d-flex flex-column flex-root">
        <div className="d-flex flex-row flex-column-fluid page">
          <AsideMenu />
          <div
            className="d-flex flex-column flex-row-fluid wrapper"
            id="kt_wrapper"
          >
            <Header
              handleOpenUserPanel={setShowUserPanel}
              handleOpenQuickKart={setShowQuickKart}
              handleOpenMobileMenu={setShowMobileMenu}
              showMobileMenu={showMobileMenu}
            />
            <div
              className="content d-flex flex-column flex-column-fluid"
              id="kt_content"
            >
              <Subheader />
              <div className="d-flex flex-column-fluid">
                <div className="container">
                  <Outlet />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <QuickKart
        isActive={showQuickKart}
        handleClose={() => setShowQuickKart(false)}
      />
      <UserPanel
        isActive={showUserPanel}
        handleClose={() => setShowUserPanel(false)}
      />
      {(showUserPanel || showQuickKart) && (
        <OffcanvasOverlay
          handleDismiss={() => {
            setShowUserPanel(false);
            setShowQuickKart(false);
          }}
        />
      )}
    </>
  );
}

export default Layout;
